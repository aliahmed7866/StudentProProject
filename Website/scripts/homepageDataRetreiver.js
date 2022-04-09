window.onload=getStudentData;
var stuList=[];
let studentId;
let studentEndUrl;
let timetableEndUrl;
let remindersEndUrl;
let emailsEndUrl;

function getStudentData(){
  let lessonDate=document.getElementById("lessonDate");
let lessonTime= document.getElementById("lessonTime");
let lessonLocation= document.getElementById("lessonLocation");
let lessonTutor= document.getElementById("lessonTutor");
let lessonTitle= document.getElementById("lessonTitle");
  let studentsListUrl= 'https://studentpro-api.herokuapp.com/students';

  fetch(studentsListUrl, {
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
  let latestLesson= getLatestLessonDate(response);
  lessonTitle.innerHTML= "Title: "+response.events[latestLesson].title;
  lessonDate.innerHTML="Date: "+ new Date(response.events[latestLesson].start_time).toLocaleDateString();
  lessonTime.innerHTML= "Time: "+ new Date(response.events[latestLesson].start_time).toLocaleTimeString() + " - "+ new Date(response.events[0].end_time).toLocaleTimeString();
  lessonLocation.innerHTML="Location: "+ response.events[latestLesson].location;
  lessonTutor.innerHTML="Tutor: "+response.events[latestLesson].staff_member.first_name +" "+ response.events[latestLesson].staff_member.last_name
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
 function getLatestLessonDate(response){
var dateArray=[];

for(var i=0; i< response.events.length; i++){
dateArray[i]=response.events[i].start_time;
}
const now = new Date();

let closest = Infinity;

dateArray.forEach(function(d) {
   const date = new Date(d);

   if (date >= now && (date < new Date(closest) || date < closest)) {
      closest = d;
   }
});

return dateArray.indexOf(closest);
 }