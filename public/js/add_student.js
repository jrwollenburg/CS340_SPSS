// Get the objects we need to modify
let addStudentForm = document.getElementById('add-student-form-ajax');

// Modify the objects we need
addStudentForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputProficiency = document.getElementById("input-proficiency");
    let inputFirstName = document.getElementById("input-fname");
    let inputLastName = document.getElementById("input-lname");
    let inputPhone = document.getElementById("input-phone");
    let inputEmergencyFirst = document.getElementById("input-em_fname");
    let inputEmergencyLast = document.getElementById("input-em_lname");
    let inputEmergencyPhone = document.getElementById("input-em_phone");
    let inputWaiver = document.getElementById("input-waiver");

    // Get the values from the form fields
    let proficiencyValue = inputProficiency.value;
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let phoneValue = inputPhone.value;
    let emerFirstValue = inputEmergencyFirst.value;
    let emerLastValue = inputEmergencyLast.value;
    let emerPhoneValue = inputEmergencyPhone.value;
    let waiverValue = inputWaiver.value;

    // Put our data we want to send in a javascript object
    let data = {
        'Proficiency ID': proficiencyValue,
        'First Name': firstNameValue,
        'Last Name': lastNameValue,
        'Phone Number': phoneValue,
        'Emergency Contact First Name': emerFirstValue,
        'Emergency Contact Last Name': emerLastValue,
        'Emergency Contact Number': emerPhoneValue,
        'Waiver Signed': waiverValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-student-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    
    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);
            location.reload();
            // Clear the input fields for another transaction
            inputProficiency.value = '';
            inputFirstName.value = '';
            inputLastName.value = '';
            inputPhone.value = '';
            inputEmergencyFirst.value = '';
            inputEmergencyLast.value = '';
            inputEmergencyPhone.value = '';
            inputWaiver.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("students-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and cells for data
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let profCell = document.createElement("TD");
    let firstNameCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");
    let phoneCell = document.createElement("TD");
    let emerFirstCell = document.createElement("TD");
    let emerLastCell = document.createElement("TD");
    let emerPhoneCell = document.createElement("TD");
    let waiverCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");
    // Fill the cells with correct data
    idCell.innerText = newRow.Student_ID;
    profCell.innerText = newRow.Proficiency_ID;
    firstNameCell.innerText = newRow.First_Name;
    lastNameCell.innerText = newRow.Last_Name;
    phoneCell.innerText = newRow.Phone_Number;
    emerFirstCell.innerText = newRow.Emergency_Contact_First_Name;
    emerLastCell.innerText = newRow.Emergency_Contact_Last_Name;
    emerPhoneCell.innerText = newRow.Emergency_Contact_Number;
    waiverCell.innerText = newRow.waiver_signed;
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteStudent(newRow.Student_ID); // Won't refresh old data added before opening app
    };
    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(profCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(phoneCell);
    row.appendChild(emerFirstCell);
    row.appendChild(emerLastCell);
    row.appendChild(emerPhoneCell);
    row.appendChild(waiverCell);
    row.appendChild(deleteCell);
    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.Student_ID);
    // Add the row to the table
    currentTable.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.First_Name + ' ' +  newRow.Last_Name;
    option.value = newRow.Student_ID;
    selectMenu.add(option);
    // End of new step 8 code.
}