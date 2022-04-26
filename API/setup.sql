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
        (21364083, "Sam", "Nuttall", "MMU", false, "https://webcdn.mmu.ac.uk/profiles/img/no-avatar.gif"),
        (21370311, "Ali", "Ahmed", "MMU", false, "https://webcdn.mmu.ac.uk/profiles/img/no-avatar.gif"),
        (20000003, "Ange", "Tientcheu", "MMU", false, "https://webcdn.mmu.ac.uk/profiles/img/no-avatar.gif"),
        (20000004, "Hassen", "Amod", "MMU", false, "https://webcdn.mmu.ac.uk/profiles/img/no-avatar.gif"),
        (20000005, "Muhammad", "Ibrahim", "MMU", false, "https://webcdn.mmu.ac.uk/profiles/img/no-avatar.gif"),
        (20000006, "Maryam", "Al-Gburi", "MMU", false, "https://webcdn.mmu.ac.uk/profiles/img/no-avatar.gif"),
        (55135751, "Ash", "Williams", "MMU", true, "https://avatars.githubusercontent.com/u/5176774"),
        (55095173, "Tariq", "Jarad", "MMU", true, "https://webcdn.mmu.ac.uk/profiles/img/profile-images/1Tariq-Jarad-0144-crop-145x145-580a301ba85c8.png"),
        (55134954, "Elysia", "Barker", "MMU", true, "https://www.mmu.ac.uk/computing-and-maths/courses/undergraduate-courses/student-profiles/elysia/33580066---Elysia-Barker---Maths.jpg"),
        (55138727, "Rob", "Aspin", "MMU", true, "https://webcdn.mmu.ac.uk/profiles/img/no-avatar.gif");


INSERT INTO event (
                   id, title, type, location,staff_id, start_time, end_time
) VALUES
        (1, "Maths",  "Lecture", "JD C0.14", 55095173, "2022-03-14 11:00:00", "2022-03-14 13:00:00"),
        (2, "Maths", "Tutorial", "JD E143", 55134954, "2022-03-15 09:00:00", "2022-03-15 11:00:00"),
        (3, "Team Project", "Lecture", "JD C0.14", 55138727, "2022-03-16 12:00:00", "2022-03-16 13:00:00"),
        (4, "Team Project", "Tutorial", "JD C1.03", 55135751, "2022-03-17 09:00:00", "2022-03-17 12:00:00"),
        (5, "Maths",  "Lecture", "JD C0.14", 55095173, "2022-03-21 11:00:00", "2022-03-21 13:00:00"),
        (6, "Maths", "Tutorial", "JD E143", 55134954, "2022-03-22 09:00:00", "2022-03-22 11:00:00"),
        (7, "Team Project", "Lecture", "JD C0.14", 55138727, "2022-03-23 12:00:00", "2022-03-23 13:00:00"),
        (8, "Team Project", "Tutorial", "JD C1.03", 55135751, "2022-03-24 09:00:00", "2022-03-24 12:00:00"),
        (9, "Maths",  "Lecture", "JD C0.14", 55095173, "2022-03-28 11:00:00", "2022-03-28 13:00:00"),
        (10, "Maths", "Tutorial", "JD E143", 55134954, "2022-03-29 09:00:00", "2022-03-29 11:00:00"),
        (11, "Team Project", "Lecture", "JD C0.14", 55138727, "2022-03-30 12:00:00", "2022-03-30 13:00:00"),
        (12, "Team Project", "Tutorial", "JD C1.03", 55135751, "2022-03-31 09:00:00", "2022-03-31 12:00:00"),
        (13, "Maths",  "Lecture", "JD C0.14", 55095173, "2022-04-04 11:00:00", "2022-04-04 13:00:00"),
        (14, "Maths", "Tutorial", "JD E143", 55134954, "2022-04-05 09:00:00", "2022-04-05 11:00:00"),
        (15, "Team Project", "Lecture", "JD C0.14", 55138727, "2022-04-06 12:00:00", "2022-04-06 13:00:00"),
        (16, "Team Project", "Tutorial", "JD C1.03", 55135751, "2022-04-07 09:00:00", "2022-04-07 12:00:00"),
        (17, "Maths",  "Lecture", "JD C0.14", 55095173, "2022-04-25 11:00:00", "2022-04-25 13:00:00"),
        (18, "Maths", "Tutorial", "JD E143", 55134954, "2022-04-26 09:00:00", "2022-04-26 11:00:00"),
        (19, "Team Project", "Lecture", "JD C0.14", 55138727, "2022-04-27 12:00:00", "2022-04-27 13:00:00"),
        (20, "Team Project", "Tutorial", "JD C1.03", 55135751, "2022-04-28 09:00:00", "2022-04-28 12:00:00"),
        (21, "Maths",  "Tutorial", "JD E143", 55134954, "2022-05-03 09:00:00", "2022-05-03 11:00:00"),
        (22, "Team Project",  "Lecture", "JD C1.04", 55138727, "2022-05-04 12:00:00", "2022-05-04 13:00:00"),
        (23, "Team Project", "Tutorial", "JD C1.03", 55135751, "2022-05-05 09:00:00", "2022-05-05 12:00:00"),
        (24, "Maths",  "Lecture", "SB G.01", 55095173, "2022-05-05 14:00:00", "2022-05-05 16:00:00");


INSERT INTO email (
                   id, subject, content, sender_name, sender_email, sender_image_url, time
) VALUES
        (1,
        "Internal Student Survey now open!",
        "Dear Student, your feedback is always very important to us. Please take a few minutes to complete the survey via your personalised email link...",
        "Manchester Metropolitan University",
        "students@info.mmu.ac.uk",
        "https://www.mmu.ac.uk/brand/logo/2.2-Secondary-Logo_2.jpg",
        "2022-03-28 09:03:00"),
         (2,
        "Access to deadlines and exam timetable",
        "Please can all students access their timetables to pre-view their deadline and exam timetables, please make sure you are completing 5 hours of work a week at minimum.",
        "Manchester Metropolitan University",
        "students@info.mmu.ac.uk",
        "https://www.mmu.ac.uk/student-life/",
        "2022-04-05 12:30:00");


INSERT INTO reminder (
                      id, title, time
) VALUES
         (4, "Option System Deadline", "2022-05-06 16:00:00"),
         (1, "Maths Exam (Online)", "2022-05-16 10:00:00"),
         (2, "Team Project Practical (Group Work)", "2022-05-12 09:00:00"),
         (3, "Team Project Assignment Deadline", "2022-05-20 21:00:00");


-- Insert dummy data into the linking tables
INSERT INTO person_event (
                          person_id,
                          event_id
) VALUES
         (21364083, 1),
         (21364083, 2),
         (21364083, 3),
         (21364083, 4),
         (21364083, 5),
         (21364083, 6),
         (21364083, 7),
         (21364083, 8),
         (21364083, 9),
         (21364083, 10),
         (21364083, 11),
         (21364083, 12),
         (21364083, 13),
         (21364083, 14),
         (21364083, 15),
         (21364083, 16),
         (21364083, 17),
         (21364083, 18),
         (21364083, 19),
         (21364083, 20),
         (21364083, 21),
         (21364083, 22),
         (21364083, 23),
         (21364083, 24),
         (21370311, 1),
         (21370311, 2),
         (21370311, 3),
         (21370311, 4),
         (21370311, 5),
         (21370311, 6),
         (21370311, 7),
         (21370311, 8),
         (21370311, 9),
         (21370311, 10),
         (21370311, 11),
         (21370311, 12),
         (21370311, 13),
         (21370311, 14),
         (21370311, 15),
         (21370311, 16),
         (21370311, 17),
         (21370311, 18),
         (21370311, 19),
         (21370311, 20),
         (21370311, 21),
         (21370311, 22),
         (21370311, 23),
         (21370311, 24),
         (20000003, 1),
         (20000003, 2),
         (20000003, 3),
         (20000003, 4),
         (20000003, 5),
         (20000003, 6),
         (20000003, 7),
         (20000003, 8),
         (20000003, 9),
         (20000003, 10),
         (20000003, 11),
         (20000003, 12),
         (20000003, 13),
         (20000003, 14),
         (20000003, 15),
         (20000003, 16),
         (20000003, 17),
         (20000003, 18),
         (20000003, 19),
         (20000003, 20),
         (20000003, 21),
         (20000003, 22),
         (20000003, 23),
         (20000003, 24),
         (20000004, 1),
         (20000004, 2),
         (20000004, 3),
         (20000004, 4),
         (20000004, 5),
         (20000004, 6),
         (20000004, 7),
         (20000004, 8),
         (20000004, 9),
         (20000004, 10),
         (20000004, 11),
         (20000004, 12),
         (20000004, 13),
         (20000004, 14),
         (20000004, 15),
         (20000004, 16),
         (20000004, 17),
         (20000004, 18),
         (20000004, 19),
         (20000004, 20),
         (20000004, 21),
         (20000004, 22),
         (20000004, 23),
         (20000004, 24),
         (20000005, 1),
         (20000005, 2),
         (20000005, 3),
         (20000005, 4),
         (20000005, 5),
         (20000005, 6),
         (20000005, 7),
         (20000005, 8),
         (20000005, 9),
         (20000005, 10),
         (20000005, 11),
         (20000005, 12),
         (20000005, 13),
         (20000005, 14),
         (20000005, 15),
         (20000005, 16),
         (20000005, 17),
         (20000005, 18),
         (20000005, 19),
         (20000005, 20),
         (20000005, 21),
         (20000005, 22),
         (20000005, 23),
         (20000005, 24),
         (20000006, 1),
         (20000006, 2),
         (20000006, 3),
         (20000006, 4),
         (20000006, 5),
         (20000006, 6),
         (20000006, 7),
         (20000006, 8),
         (20000006, 9),
         (20000006, 10),
         (20000006, 11),
         (20000006, 12),
         (20000006, 13),
         (20000006, 14),
         (20000006, 15),
         (20000006, 16),
         (20000006, 17),
         (20000006, 18),
         (20000006, 19),
         (20000006, 20),
         (20000006, 21),
         (20000006, 22),
         (20000006, 23),
         (20000006, 24);


INSERT INTO person_email (
                          person_id,
                          email_id
) VALUES
        (21364083, 1),
        (21364083, 2),
        (21370311, 1),
        (21370311, 2),
        (20000003, 1),
        (20000003, 2),
        (20000004, 1),
        (20000004, 2),
        (20000005, 1),
        (20000005, 2),
        (20000006, 1),
        (20000006, 2);

INSERT INTO person_reminder (
                          person_id,
                          reminder_id
) VALUES
        (21364083, 1),
        (21364083, 2),
        (21364083, 3),
        (21364083, 4),
        (21370311, 1),
        (21370311, 2),
        (21370311, 3),
        (21370311, 4),
        (20000003, 1),
        (20000003, 2),
        (20000003, 3),
        (20000003, 4),
        (20000004, 1),
        (20000004, 2),
        (20000004, 3),
        (20000004, 4),
        (20000005, 1),
        (20000005, 2),
        (20000005, 3),
        (20000005, 4),
        (20000006, 1),
        (20000006, 2),
        (20000006, 3),
        (20000006, 4);
