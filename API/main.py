# Main script for the API

import logic
import models
import config
from db import DB
from fastapi import FastAPI, status, HTTPException


db = DB(config.sqlite_db_file)

app = FastAPI(
    title="StudentPro API",
    description="Allows team members to access data required for the front-end.",
    version="0.0.1"
)


@app.on_event("startup")
async def startup_event():
    await logic.setup(db)


@app.get("/")
async def root():
    raise HTTPException(status_code=status.HTTP_200_OK, detail="It's working!")


@app.get("/students",
         response_model=models.StudentIDs,
         description="Get a list of all student IDs."
         )
async def get_student_ids():
    return {'ids': await logic.get_student_ids(db)}


@app.get("/student",
         description="Get a student's details via their ID.",
         response_model=models.Person
         )
async def get_student(stu_id: int):
    return await logic.get_student(db, stu_id)


@app.get("/timetable",
         description="Get a student's timetable via their ID.",
         response_model=models.Timetable
         )
async def get_timetable(stu_id: int, limit: Optional[int] = 10):
    return {'events': await logic.get_timetable(db, stu_id, limit)}


@app.get("/emails",
         description="Get a student's emails via their ID.",
         response_model=models.Emails
         )
async def get_emails(stu_id: int, limit: Optional[int] = 10):
    return {'emails': await logic.get_emails(db, stu_id, limit)}


@app.get("/reminders",
         description="Get a student's reminders via their ID.",
         response_model=models.Reminders
         )
async def get_reminders(stu_id: int, limit: Optional[int] = 10):
    return {'reminders': await logic.get_reminders(db, stu_id, limit)}


@app.post("/reminder",
          description="Add a reminder to a student's reminders",
          response_model=models.Reminder,
          status_code=status.HTTP_201_CREATED
          )
async def add_reminder(stu_id: int, reminder: models.ReminderIn):
    return
    # TODO: Add reminder logic


@app.delete("/reminder",
            description="Remove a reminder"
            )
async def delete_reminder(reminder_id: int):
    return
    # TODO: Add reminder logic
