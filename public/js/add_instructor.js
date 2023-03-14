// Get the objects we need to modify
let addInstructorForm = document.getElementById("add-instructor-form-ajax");

// Modify the objects we need
addInstructorForm.addEventListener("submit", function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  // Get form fields we need to get data from
  let inputFirstName = document.getElementById("input-fname");
  let inputLastName = document.getElementById("input-lname");
  let inputPhone = document.getElementById("input-phone");
  let inputYearsofExperience = document.getElementById("input-years");
  let inputFirstAidCertified = document.getElementById("input-first-aid");

  // Get the values from the form fields
  let firstNameValue = inputFirstName.value;
  let lastNameValue = inputLastName.value;
  let phoneValue = inputPhone.value;
  let YearsofExpValue = inputYearsofExperience.value;
  let FirstAidValue = inputFirstAidCertified.value;

  // Put our data we want to send in a javascript object
  let data = {
    "First Name": firstNameValue,
    "Last Name": lastNameValue,
    "Phone Number": phoneValue,
    "Years of Experience": YearsofExpValue,
    "First Aid Certified": FirstAidValue,
  };

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/add-instructor-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // Add the new data to the table
      addRowToTable(xhttp.response);
      location.reload();
      // Clear the input fields for another transaction
      inputFirstName.value = "";
      inputLastName.value = "";
      inputPhone.value = "";
      inputYearsofExperience.value = "";
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  };

  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));
});

// Creates a single row from an Object representing a single record from
// bsg_people
addRowToTable = (data) => {
  // Get a reference to the current table on the page and clear it out.
  let currentTable = document.getElementById("instructors-table");

  // Get the location where we should insert the new row (end of table)
  let newRowIndex = currentTable.rows.length;

  // Get a reference to the new row from the database query (last object)
  let parsedData = JSON.parse(data);
  let newRow = parsedData[parsedData.length - 1];

  // Create a row and cells for data
  let row = document.createElement("TR");
  let idCell = document.createElement("TD");
  let firstNameCell = document.createElement("TD");
  let lastNameCell = document.createElement("TD");
  let phoneCell = document.createElement("TD");
  let yearsOfExpCell = document.createElement("TD");
  let firstAidCell = document.createElement("TD");
  let deleteCell = document.createElement("TD");
  // Fill the cells with correct data
  idCell.innerText = newRow.id_instructor;
  firstNameCell.innerText = newRow.instructor_fname;
  lastNameCell.innerText = newRow.instructor_lname;
  phoneCell.innerText = newRow.instructor_phone_number;
  yearsOfExpCell.innerText = newRow.years_of_experience;
  firstAidCell.innerText = newRow.first_aid_certified;
  deleteCell = document.createElement("button");
  deleteCell.innerHTML = "Delete";
  deleteCell.onclick = function () {
    deleteInstructor(newRow.id_instructor); // Won't refresh old data added before opening app
  };
  // Add the cells to the row
  row.appendChild(idCell);
  row.appendChild(firstNameCell);
  row.appendChild(lastNameCell);
  row.appendChild(phoneCell);
  row.appendChild(yearsOfExpCell);
  row.appendChild(firstAidCell);
  row.appendChild(deleteCell);
  // Add a row attribute so the deleteRow function can find a newly added row
  row.setAttribute("data-value", newRow.id_instructor);
  // Add the row to the table
  currentTable.appendChild(row);
};
