-- API SQLite3 Database Setup Script


-- Drop tables if they already exist (to reset DB)
DROP TABLE IF EXISTS event;
DROP TABLE IF EXISTS email;
DROP TABLE IF EXISTS reminder;
DROP TABLE IF EXISTS person_event;
DROP TABLE IF EXISTS person_email;
DROP TABLE IF EXISTS person_reminder;
DROP TABLE IF EXISTS person;


-- Create tables
CREATE TABLE person (
    id INT PRIMARY KEY NOT NULL,
    first_name VARCHAR,
    last_name VARCHAR,
    institute VARCHAR,
    image_url VARCHAR,
    is_staff BOOLEAN
);

CREATE TABLE event (
    id INT PRIMARY KEY,
    title VARCHAR,
    type VARCHAR,
    location VARCHAR,
    description VARCHAR,
    staff_id INT,
    start_time DATETIME,
    end_time DATETIME,
    FOREIGN KEY (staff_id) REFERENCES person(id)
);

CREATE TABLE email (
    id INT PRIMARY KEY,
    subject VARCHAR,
    content VARCHAR,
    sender_name VARCHAR,
    sender_email VARCHAR,
    sender_image_url INT,
    time DATETIME
);

CREATE TABLE reminder (
    id INT PRIMARY KEY,
    title VARCHAR,
    time DATETIME
);

CREATE TABLE person_event (
    person_id INT NOT NULL,
    event_id INT NOT NULL,
    present BOOLEAN DEFAULT false,
    mins_late TINYINT UNSIGNED DEFAULT 0,
    PRIMARY KEY (person_id, event_id),
    FOREIGN KEY (person_id) REFERENCES person(id),
    FOREIGN KEY (event_id) REFERENCES event(id)
);

CREATE TABLE person_email (
    person_id INT NOT NULL,
    email_id INT NOT NULL,
    read BOOLEAN DEFAULT false,
    PRIMARY KEY (person_id, email_id),
    FOREIGN KEY (person_id) REFERENCES person(id),
    FOREIGN KEY (email_id) REFERENCES email(id)
);

CREATE TABLE person_reminder (
    person_id INT NOT NULL,
    reminder_id INT NOT NULL,
    user_added BOOLEAN DEFAULT false,
    PRIMARY KEY (person_id, reminder_id),
    FOREIGN KEY (person_id) REFERENCES person(id),
    FOREIGN KEY (reminder_id) REFERENCES reminder(id)
);


-- Insert dummy data to the entity tables
INSERT INTO person (
                   id, first_name, last_name, institute, is_staff, image_url
) VALUES
         (21364083, "Sam", "Nuttall", "MMU", false, "https://www.kindpng.com/picc/m/22-223941_transparent-avatar-png-male-avatar-icon-transparent-png.png"),
         (55135751, "Ash", "Williams", "MMU", true, "https://avatars.githubusercontent.com/u/5176774"),
         (55095173, "Tariq", "Jarad", "MMU", true, "https://webcdn.mmu.ac.uk/profiles/img/profile-images/1Tariq-Jarad-0144-crop-145x145-580a301ba85c8.png");
        (55134954, "Elysia", "Barker", "MMU", true, "");
        (55138727, "Rob", "Aspin", "MMU", true, "");


         -- TODO: Add dummy data for the people. (team members (students) and staff (from timetable))

INSERT INTO event (
                   id, title, type, location,staff_id, start_time, end_time
) VALUES
         (1, "Maths",  "Lecture", "JD C0.14", 55095173, "2022-03-14 11:00:00", "2022-03-14 13:00:00");
        (2, "Maths For Computing", "Tutorial", "JD E143", 55134954, "2022-03-15 09:00:00", "2022-03-15 11:00:00");
        (3, "Project Team", "Lecture", "JD C0.14", 55138727, "2022-03-16 12:00:00", "2022-03-16 13:00:00");
        (4, "Project Team", "Tutorial", "JD C1.03", 55135751, "2022-03-17 09:00:00", "2022-03-17 12:00:00");
        (5, "Maths",  "Lecture", "JD C0.14", 55095173, "2022-03-21 11:00:00", "2022-03-21 13:00:00");
        (6, "Maths For Computing", "Tutorial", "JD E143", 55134954, "2022-03-22 09:00:00", "2022-03-22 11:00:00");
        (7, "Project Team", "Lecture", "JD C0.14", 55138727, "2022-03-23 12:00:00", "2022-03-23 13:00:00");
        (8, "Project Team", "Tutorial", "JD C1.03", 55135751, "2022-03-24 09:00:00", "2022-03-24 12:00:00");
        (9, "Maths",  "Lecture", "JD C0.14", 55095173, "2022-03-28 11:00:00", "2022-03-28 13:00:00");
        (10, "Maths For Computing", "Tutorial", "JD E143", 55134954, "2022-03-29 09:00:00", "2022-03-29 11:00:00");
        (11, "Project Team", "Lecture", "JD C0.14", 55138727, "2022-03-30 12:00:00", "2022-03-30 13:00:00");
        (12, "Project Team", "Tutorial", "JD C1.03", 55135751, "2022-03-31 09:00:00", "2022-03-31 12:00:00");
        (13, "Maths",  "Lecture", "JD C0.14", 55095173, "2022-04-04 11:00:00", "2022-04-04 13:00:00");
        (14, "Maths For Computing", "Tutorial", "JD E143", 55134954, "2022-04-05 09:00:00", "2022-04-05 11:00:00");
        (15, "Project Team", "Lecture", "JD C0.14", 55138727, "2022-04-06 12:00:00", "2022-04-06 13:00:00");
        (16, "Project Team", "Tutorial", "JD C1.03", 55135751, "2022-04-07 09:00:00", "2022-04-07 12:00:00");
        (13, "Maths",  "Lecture", "JD C0.14", 55095173, "2022-04-25 11:00:00", "2022-04-25 13:00:00");
        (14, "Maths For Computing", "Tutorial", "JD E143", 55134954, "2022-04-26 09:00:00", "2022-04-26 11:00:00");
        (15, "Project Team", "Lecture", "JD C0.14", 55138727, "2022-04-27 12:00:00", "2022-04-27 13:00:00");
        (16, "Project Team", "Tutorial", "JD C1.03", 55135751, "2022-04-28 09:00:00", "2022-04-28 12:00:00");
        (13, "Maths For Computing",  "Tutorial", "JD E143", 55134954, "2022-05-03 09:00:00", "2022-05-03 11:00:00");
        (14, "Project Team",  "Lecture", "JD C1.04", 55138727, "2022-05-04 12:00:00", "2022-05-04 13:00:00");
        (15, "Project Team", "Tutorial", "JD C1.03", 55135751, "2022-05-05 09:00:00", "2022-05-05 12:00:00");
        (6, "Maths",  "Lecture", "SB G.01", 55095173, "2022-05-05 14:00:00", "2022-05-05 16:00:00");





         -- TODO: Add dummy data for the events. (team members (students) and staff (from timetable))
         -- Include all timetabled lessons and duplicate them further (until end of May)

INSERT INTO email (
                   id, subject, content, sender_name, sender_email, sender_image_url, time
) VALUES
        (1,
             "Internal Student Survey now open!",
             "Dear Student, your feedback is always very important to us. Please take a few minutes to complete the survey via your personalised email link...",
             "Manchester Metropolitan University",
             "students@info.mmu.ac.uk",
            "https://www.mmu.ac.uk/brand/logo/2.2-Secondary-Logo_2.jpg",
            "2022-03-28 09:03:00");
         (2,
            "Access to deadlines and exam timetable",
            "Please can all students access their timetables to pre-view their deadline and exam timetables, please make sure you are completing 5 hours of work a week at minimum.",
            "students@info.mmu.ac.uk",
            "https://www.mmu.ac.uk/student-life/"
            "2022-04-05 12:30:00");
         -- TODO: Add dummy data for the emails. Take a few real generic emails to use.

INSERT INTO reminder (
                      id, title, time
) VALUES
         (1, "Maths Exam (Online)", "2022-05-16 10:00:00");
         (2, "Team Project Practical (Group Work)", "2022-05-11");
         -- TODO: Add dummy data for the reminders. (E.g. Assignment deadlines, meetings)


-- Insert dummy data into the linking tables
INSERT INTO person_event (
                          person_id,
                          event_id
) VALUES
         (21364083, 1);
         (21362210, 2);
         (21370311, 3);
         (21370787, 4);
         (21365213, 5);
         (21358752, 6);
         (55135751, 7);

         -- TODO: Add dummy data to link events to people.

INSERT INTO person_email (
                          person_id,
                          email_id
) VALUES
        (21364083, 1);
        (21362210, 2);
        (21370311, 3);
        (21370787, 4);
        (21365213, 5);
        (21358752, 6);
        (55135751, 7);

        -- TODO: Add dummy data to link emails to people.

INSERT INTO person_reminder (
                          person_id,
                          reminder_id
) VALUES
        (21364083, 1);
        (21362210, 2);
        (21370311, 3);
        (21370787, 4);
        (21365213, 5);
        (21358752, 6);
        (55135751, 7);

         -- TODO: Add dummy data to link reminders to people.