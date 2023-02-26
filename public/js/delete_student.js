function deleteStudent(id_student) {
    let link = '/delete-student-ajax/';
    let data = {
      id_student: id_student
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(id_student);
      }
    });
  }
  
function deleteRow(id_student){
    let table = document.getElementById("students-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == id_student) {
            table.deleteRow(i);
            break;
        }
    }
}