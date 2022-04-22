window.onload = getStudentData;
var stuList = [];
let studentId;
let studentEndUrl;
let timetableEndUrl;
let remindersEndUrl;
let emailsEndUrl;

function getStudentData() {

    let upcomingLessonContainer = document.getElementById("upcomingLessonContainer");
    let emailsContainer = document.getElementById("emailsContainer");
    let studentsListUrl = 'https://studentpro-api.herokuapp.com/students';
    let deadlinesContainer = document.getElementById("deadlinesContainer");
    fetch(studentsListUrl, {
            headers: {
                Accept: "application/json"
            }
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            stuList = response.ids;
            studentId = stuList[Math.floor(Math.random() * stuList.length)];
            studentEndUrl = 'https://studentpro-api.herokuapp.com/student?stu_id=' + studentId;
            return fetch(studentEndUrl);
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            timetableEndUrl = 'https://studentpro-api.herokuapp.com/timetable?stu_id=' + studentId + '&limit=10';
            return fetch(timetableEndUrl);
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            let el = document.createElement("p");
            let latestLesson = getLatestDate(response.events);
            el.innerHTML = "<b>Title: </b> " + response.events[latestLesson].title + "<br>" +
                "<b>Session Type: </b>" + response.events[latestLesson].type + "<br>" +
                "<b>Date: </b>" + new Date(response.events[latestLesson].start_time).toLocaleDateString() + "<br>" +
                "<b>Time: </b>" + new Date(response.events[latestLesson].start_time).toLocaleTimeString() + " - " + new Date(response.events[0].end_time).toLocaleTimeString() + "<br>" +
                "<b>Location: </b>" + response.events[latestLesson].location + "<br>" +
                "<b>Tutor: </b>" + response.events[latestLesson].staff_member.first_name + " " + response.events[latestLesson].staff_member.last_name + "<br>" +
                "<b> Tutor Email: </b>" + response.events[latestLesson].staff_member.id + "@mmu.ac.uk";
            upcomingLessonContainer.append(el);
            remindersEndUrl = 'https://studentpro-api.herokuapp.com/reminders?stu_id=' + studentId + '&limit=10';
            return fetch(remindersEndUrl);
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            for (i = 0; i < response.reminders.length; i++) {
                let el = document.createElement("p");

                let time = new Date(response.reminders[i].time);
                let today = new Date();
                let remDays = time.getDate() - today.getDate();
                el.innerHTML = "<b>Title:</b> " + response.reminders[i].title + "<br>" + "<b>Due Date: </b>" + time.getDate() + "/" + time.getMonth() + "/" + time.getFullYear() + "<br>" + "<b> Days Remaining:</b> " + remDays + "<hr>";
                deadlinesContainer.append(el);

            }
            emailsEndUrl = 'https://studentpro-api.herokuapp.com/emails?stu_id=' + studentId + '&limit=10';
            return fetch(emailsEndUrl);
        })
        .then(response => response.json())
        .then(response => {

            let el = document.createElement("p");
            el.innerHTML = "<b>Subject:</b> " + response.emails[0].subject + "<br>" + "<b>Sender:</b> " + response.emails[0].sender_name;
            emailsContainer.append(el);
            console.log(response);
        })

}

function getLatestDate(response) {
    var dateArray = [];

    for (var i = 0; i < response.length; i++) {
        dateArray[i] = response[i].start_time;
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