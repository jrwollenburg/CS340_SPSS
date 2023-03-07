// App.js
/*  CODE CITATION:
    Date: 03/02/2023
    This code was developed from the NodeJS Starter App Walkthrough. 
    Several functions throughout the app are adapted from:
    Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/


/*
    SETUP
*/
// Express

var express = require("express"); // We are using the express library for the web server
var app = express(); // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT = 22998; // Set a port number at the top so it's easy to change in the future
// Database
var db = require('./database/db-connector')
// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.
/*
    ROUTES
*/
app.get('/index', (req, res) => {
    res.render('index');
  });

app.get('/instructors', (req, res) => {
    res.render('instructors');
  });

app.get('/student-registrations', (req, res) => {
    res.render('studentregistrations');
  });

app.get('/lessons', (req, res) => {
    res.render('lessons');
  });

app.get('/proficiencies', (req, res) => {
    let query1 = "SELECT id_proficiency AS 'Proficiency ID', proficiency_name AS 'Proficiency Name' FROM Proficiencies ORDER BY id_proficiency ASC;";
    db.pool.query(query1, function(error, rows, fields){
        let proficiencies = rows;
        return res.render('proficiencies', {proficiencies: proficiencies});})
    
  });

app.get('/students', function(req, res)
    {
      let query1 = "SELECT id_student as 'Student ID', id_proficiency as 'Proficiency ID', student_fname as 'First Name', student_lname as 'Last Name', student_phone_number as 'Phone Number', emergency_fname as 'Emergency Contact First Name', emergency_lname as 'Emergency Contact Last Name', emergency_phone as 'Emergency Contact Number', waiver_signed as 'Waiver Signed' FROM Students;";
      let query2 = "SELECT * FROM Proficiencies;";
      db.pool.query(query1, function(error, rows, fields){
        
        // Save the people
        let students = rows;
        
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            let proficiencies = rows;
            return res.render('students', {data: students, proficiencies: proficiencies});
        })
      })
  });

app.post('/add-student-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // converting to nulls where needed to prevent the empty string bug
    const values = [
        data["Proficiency ID"] || null,
        data["First Name"] || null,
        data["Last Name"] || null,
        data["Phone Number"] || null,
        data["Emergency Contact First Name"] || null,
        data["Emergency Contact Last Name"] || null,
        data["Emergency Contact Number"] || null,
        data["Waiver Signed"] || null
    ];
    // waiver signed is sent as yes/no so conver that to the appropriate format of 1/0.
    let waiver_signed = data[`Waiver Signed`];
    if (waiver_signed === "Yes"){
        waiver_signed = 1;
    } else {
        waiver_signed = 0;
    }
    const query1 = `INSERT INTO Students (id_proficiency, student_fname, student_lname, student_phone_number, emergency_fname, emergency_lname, emergency_phone, waiver_signed) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
    // Create the query and run it on the database
    
    db.pool.query(query1, values, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Students
            query2 = `SELECT * FROM Students;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});  

app.post('/add-proficiency-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let id = data['input-id'];

    let name = data['input-name'];
    // If either is null its a bad request, so just null both and send that so the error occurs.
    if (id === '' || name === ''){
        id = null
        name = null
        query1 = `INSERT INTO Proficiencies (id_proficiency, proficiency_name) VALUES (${id}, ${name})`;
    } else {
        query1 = `INSERT INTO Proficiencies (id_proficiency, proficiency_name) VALUES ('${data['input-id']}', '${data['input-name']}')`;
    }
    // Create the query and run it on the database
    
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/proficiencies');
        }
    })
})

app.delete('/delete-student-ajax/', function(req,res,next){
    let data = req.body;
    let studentID = parseInt(data.Student_ID);
    let deleteStudents= `DELETE FROM Students WHERE id_student = ?`;
  
    // Delete of student will cascade
    db.pool.query(deleteStudents, [studentID], function(error, rows, fields) {

        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
  });

  app.put('/put-student-ajax', function(req,res,next){
    let data = req.body;
  
    let proficiency = data.proficiency;
    let student = parseInt(data.fullname);
    if (proficiency === 'null'){
        proficiency = null}
    let queryUpdateProficiency = `UPDATE Students SET id_proficiency = ? WHERE Students.id_student = ?`;
    let selectProficiency = `SELECT * FROM Proficiencies WHERE id_proficiency = ?`
    
          // Run the 1st query
          db.pool.query(queryUpdateProficiency, [proficiency, student], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              // If there was no error, we run our second query and return that data so we can use it to update the people's
              // table on the front-end
              else
              {
                  // Run the second query
                  db.pool.query(selectProficiency, [proficiency], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.send(rows);
                      }
                  })
              }
  })});
/*
    LISTENER
*/
app.listen(PORT, function () {
  // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
  console.log(
    "Express started on http://localhost:" +
      PORT +
      "; press Ctrl-C to terminate."
  );
});
