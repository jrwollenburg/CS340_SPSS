// App.js

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
app.get('/', function(req, res)
    {
      let query1 = "SELECT * FROM Students;";
      db.pool.query(query1, function(error, rows, fields){
        res.render('index',{data: rows});                    // Note the call to render() and not send(). Using render() ensures the templating engine
    })                                         // will process this file, before sending the finished HTML to the client.
  });

app.post('/add-student-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values and use the right query -- only way I could get it working  
    let proficiency_value = data.id_proficiency;
    if (proficiency_value === ""){
        proficiency_value = null
        query1 = `INSERT INTO Students (id_proficiency, student_fname, student_lname, student_phone_number, emergency_fname, emergency_lname, emergency_phone, waiver_signed) VALUES (${proficiency_value}, '${data.student_fname}', '${data.student_lname}', '${data.student_phone_number}', '${data.emergency_fname}', '${data.emergency_lname}', '${data.emergency_phone}', '${data.waiver_signed}')`;
    }
    else{
        query1 = `INSERT INTO Students (id_proficiency, student_fname, student_lname, student_phone_number, emergency_fname, emergency_lname, emergency_phone, waiver_signed) VALUES ('${proficiency_value}', '${data.student_fname}', '${data.student_lname}', '${data.student_phone_number}', '${data.emergency_fname}', '${data.emergency_lname}', '${data.emergency_phone}', '${data.waiver_signed}')`;
    }

    // Create the query and run it on the database
    
    db.pool.query(query1, function(error, rows, fields){

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
