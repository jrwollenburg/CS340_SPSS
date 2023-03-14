// get the registration form
let addRegistrationForm = document.getElementById("add-registration-form-ajax");

// Modify the objects we need
addRegistrationForm.addEventListener("submit", function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  // Get form fields we need to get data from
  let inputStudent = document.getElementById("input-registration-student");
  let inputLesson = document.getElementById("input-registration-lesson");
  let studentName = inputStudent.options[inputStudent.selectedIndex].getAttribute("data-student");
  let lessonName = inputLesson.options[inputLesson.selectedIndex].getAttribute("data-lesson");
  // Get the values from the form fields
  let studentValue = inputStudent.value;
  let lessonValue = inputLesson.value;
  let studentNameValue = studentName;
  let lessonNameValue = lessonName;
  // Put our data we want to send in a javascript object
  let data = {
    "Student ID": studentValue,
    "Lesson ID": lessonValue,
    "Lesson Name": lessonNameValue,
    "Student Name": studentNameValue,
  };

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/add-registration-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // Add the new data to the table
      addRowToTable(xhttp.response);
      location.reload(); // due to a lack of proper ordering of the SQL, the page needs to be reloaded to show the new data correctly

      //drop downs here shouldn't be cleared
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  };

  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));
});

addRowToTable = (data) => {
  // Get a reference to the current table on the page and clear it out.
  let currentTable = document.getElementById("registrations-table");
  console.log(data);
  // Get the location where we should insert the new row (end of table)
  let newRowIndex = currentTable.rows.length;

  // Get a reference to the new row from the database query (last object)
  let parsedData = JSON.parse(data);
  let newRow = parsedData[parsedData.length - 1];

  // Create a row and cells for data
  let row = document.createElement("TR");
  let sidCell = document.createElement("TD");
  let lidCell = document.createElement("TD");
  let snameCell = document.createElement("TD");
  let lnameCell = document.createElement("TD");
  let deleteCell = document.createElement("TD");
  // Fill the cells with correct data
  sidCell.innerText = newRow.id_lesson;
  lidCell.innerText = newRow.lesson_name;
  snameCell.innerText = newRow.student_name;
  lnameCell.innerText = newRow.lesson_name;
  deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = function () {
    deleteRegistration(newRow.id_student, newRow.id_lesson);
  };
  deleteCell.appendChild(deleteButton);
  // Add the cells to the row
    row.appendChild(sidCell);
    row.appendChild(lidCell);
    row.appendChild(snameCell);
    row.appendChild(lnameCell);
    row.appendChild(deleteCell);
  // Add a row attribute so the deleteRow function can find a newly added row
  //row.setAttribute("data-value", newRow.id_lesson);
  // Add the row to the table
  currentTable.appendChild(row);
};
