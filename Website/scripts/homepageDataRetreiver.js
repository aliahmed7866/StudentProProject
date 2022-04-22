window.onload = getStudentData;
var stuList = [];
let studentId;
let studentEndUrl;
let timetableEndUrl;
let remindersEndUrl;
let reminderUrl;
let emailsEndUrl;
let deadlinesContainer;
let remindersList = [];

function setReminder() {
    let remTitle = document.querySelector("#reminderTitle").value;
    let reminderDate = document.querySelector("#reminderDate").value;
    let data = {
        title: remTitle,
        time: reminderDate
    }
    fetch(reminderUrl, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => {
            response.json();
            refreshReminders();
        })
    return false;
}

function refreshReminders() {
    fetch(remindersEndUrl, {
            headers: {
                Accept: "application/json"
            }
        })
        .then(response => response.json())
        .then(response => {
            while (deadlinesContainer.firstChild) {
                deadlinesContainer.removeChild(deadlinesContainer.firstChild);
            }
            reminderSetup(response);
        })
}

function getStudentData() {

    document.querySelector("#deadlinesContainer").addEventListener('click', function(event) {
        for (i = 0; i < remindersList.length; i++) {
            if (event.target.id == 'removeBtn' + remindersList[i]) {
                removeReminder(remindersList[i])
            };
        }
    });
    let upcomingLessonContainer = document.getElementById("upcomingLessonContainer");
    let emailsContainer = document.getElementById("emailsContainer");
    let studentsListUrl = 'https://studentpro-api.herokuapp.com/students';
    deadlinesContainer = document.getElementById("deadlinesContainer");
    fetch(studentsListUrl, {
            headers: {
                Accept: "application/json"
            }
        })
        .then(response => response.json())
        .then(response => {
            stuList = response.ids;
            studentId = stuList[Math.floor(Math.random() * stuList.length)];
            studentEndUrl = 'https://studentpro-api.herokuapp.com/student?stu_id=' + studentId;
            reminderUrl = 'https://studentpro-api.herokuapp.com/reminder?stu_id=' + studentId;
            return fetch(studentEndUrl);
        })
        .then(response => response.json())
        .then(response => {
            timetableEndUrl = 'https://studentpro-api.herokuapp.com/timetable?stu_id=' + studentId + '&limit=10';
            return fetch(timetableEndUrl);
        })
        .then(response => response.json())
        .then(response => {
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
            reminderSetup(response);
            emailsEndUrl = 'https://studentpro-api.herokuapp.com/emails?stu_id=' + studentId + '&limit=10';
            return fetch(emailsEndUrl);
        })
        .then(response => response.json())
        .then(response => {

            let el = document.createElement("p");
            el.innerHTML = "<b>Subject:</b> " + response.emails[0].subject + "<br>" + "<b>Sender:</b> " + response.emails[0].sender_name;
            emailsContainer.append(el);
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

function reminderSetup(response) {
    for (i = 0; i < response.reminders.length; i++) {
        if (response.reminders[i].added_by_user = "true") {
            let el = document.createElement("p");
            let removeBtn = document.createElement("button");
            let sepLine = document.createElement("hr");
            removeBtn.innerHTML = "Remove";
            removeBtn.classList.add("bg-warning");
            removeBtn.classList.add("btn");
            removeBtn.classList.add("text-danger");
            let time = new Date(response.reminders[i].time);
            let today = new Date();
            let remDays = time.getDate() - today.getDate();
            el.innerHTML = "<b>Title:</b> " + response.reminders[i].title + "<br>" + "<b>Due Date: </b>" + time.getDate() + "/" + time.getMonth() + "/" + time.getFullYear() + " (" + time.getHours() + ":" + time.getMinutes() + ") " + "<br>" + "<b> Days Remaining:</b> " + remDays;
            reminderId = response.reminders[i].id;
            removeBtn.id = "removeBtn" + reminderId;
            el.id = "reminderText" + reminderId;
            sepLine.id = "sepLine" + reminderId;
            remindersList.push(reminderId);
            deadlinesContainer.append(el);
            deadlinesContainer.append(removeBtn);
            deadlinesContainer.append(sepLine);
        } else {
            let el = document.createElement("p");
            let sepLine = document.createElement("hr");
            let time = new Date(response.reminders[i].time);
            let today = new Date();
            let remDays = time.getDate() - today.getDate();
            el.innerHTML = "<b>Title:</b> " + response.reminders[i].title + "<br>" + "<b>Due Date: </b>" + time.getDate() + "/" + time.getMonth() + "/" + time.getFullYear() + "(" + time.getTime + ")" + "<br>" + "<b> Days Remaining:</b> " + remDays;
            deadlinesContainer.append(el);
            deadlinesContainer.append(sepLine);


        }
    }
}

function removeReminder(remId) {
    fetch("https://studentpro-api.herokuapp.com/reminder?stu_id=" + studentId + "&reminder_id=" + remId, {
        headers: {
            Accept: "application/json"
        },
        method: "DELETE"
    })
    document.getElementById("removeBtn" + remId).remove();
    document.getElementById("reminderText" + remId).remove();
    document.getElementById("sepLine" + remId).remove();
}