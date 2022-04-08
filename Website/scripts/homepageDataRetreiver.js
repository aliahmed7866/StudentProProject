window.onload=getStudentData;
var stuList=[];
let studentId;

let studentEndUrl;
let timetableEndUrl;
let remindersEndUrl;
let emailsEndUrl;
function getStudentData(){
  let studentsListUrl= 'https://studentpro-api.herokuapp.com/students';

  fetch("https://studentpro-api.herokuapp.com/students", {
  headers: {
    Accept: "application/json"
  }
})
.then(response => response.json())
.then(response => {
  console.log(response);
  stuList=response.ids;
  studentId=stuList[Math.floor(Math.random() * stuList.length)];
  studentEndUrl='https://studentpro-api.herokuapp.com/student?stu_id='+studentId;
  return fetch(studentEndUrl);
})
.then(response => response.json())
.then(response => {
  console.log(response);
  timetableEndUrl='https://studentpro-api.herokuapp.com/timetable?stu_id='+studentId+'&limit=10';
  return fetch(timetableEndUrl);
})
.then(response => response.json())
.then(response => {
  console.log(response);
  remindersEndUrl='https://studentpro-api.herokuapp.com/reminders?stu_id='+studentId+'&limit=10';
  return fetch(remindersEndUrl);
})
.then(response => response.json())
.then(response => {
  console.log(response);
  emailsEndUrl='https://studentpro-api.herokuapp.com/emails?stu_id='+studentId+'&limit=10';
  return fetch(emailsEndUrl);
})
.then(response => response.json())
.then(response => {
  console.log(response);
})

}
 