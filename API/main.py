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
async def get_students():
    return
    # TODO: Add student logic


@app.get("/student",
         description="Get a student's details via their ID.",
         response_model=models.Student
         )
async def get_student(stu_id: int):
    return
    # TODO: Add student logic


@app.get("/timetable",
         description="Get a student's timetable via their ID.",
         response_model=models.Timetable
         )
async def get_timetable(stu_id: int, limit: int = 10):
    return
    # TODO: Add timetable logic


@app.get("/emails",
         description="Get a student's emails via their ID.",
         response_model=models.Emails
         )
async def get_emails(stu_id: int, limit: int = 10):
    return
    # TODO: Add emails logic


@app.get("/reminders",
         description="Get a student's reminders via their ID.",
         response_model=models.Reminders
         )
async def get_reminders(stu_id: int, limit: int = 10):
    return
    # TODO: Add reminders logic


@app.post("/reminder",
          description="Add a reminder to a student's reminders"
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
