
// Get the objects we need to modify
let updateRegistrationForm = document.getElementById('update-registration-form-ajax');

// Modify the objects we need
updateRegistrationForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputStudent = document.getElementById("input-update-registration-student-from");
    let inputLesson = document.getElementById("input-update-registration-lesson-from");
    let outputStudent = document.getElementById("input-update-registration-student-to");
    let outputLesson = document.getElementById("input-update-registration-lesson-to");
    // Get the values from the form fields
    let inputStudentValue = inputStudent.value;
    let inputLessonValue = inputLesson.value;
    let outputStudentValue = outputStudent.value;
    let outputLessonValue = outputLesson.value;

    // Put our data we want to send in a javascript object
    let data = {
        iStudent: inputStudentValue,
        iLesson: inputLessonValue,
        oStudent: outputStudentValue,
        oLesson: outputLessonValue
    }
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-registration-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            //console.log(data);
            location.reload()
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

});
