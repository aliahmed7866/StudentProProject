# Main script for the API

import logic
import models
import config
from db import DB
from fastapi import FastAPI, status, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from os import remove

db = DB(config.sqlite_db_file)

app = FastAPI(
    title=config.title,
    description=config.description,
    version=config.version
)
origins = [
    # this is currently empty, however, if we host our website then that can be added here
]
app.add_middleware(
    CORSMiddleware,
    # the app will currently allow requests from everywhere, this can be changed if we decide to host the website
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['GET', 'POST', 'DELETE'],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    await logic.setup(db)


@app.get("/", tags=["General"])
async def root():
    raise HTTPException(status_code=status.HTTP_200_OK, detail="It's working! Try the /docs endpoint. ")


@app.get("/students",
         tags=["General"],
         response_model=models.StudentIDs,
         description="Get a list of all student IDs."
         )
async def get_student_ids():
    return {'ids': await logic.get_student_ids(db)}


@app.get("/student",
         tags=["Specific Student"],
         description="Get a student's details via their ID.",
         response_model=models.Person,
         responses={404: {"model": models.Message}}
         )
async def get_student(stu_id: int):
    return await logic.get_student(db, stu_id)


@app.get("/timetable",
         tags=["Specific Student"],
         description="Get a student's timetable via their ID.",
         response_model=models.Timetable,
         responses={404: {"model": models.Message}}
         )
async def get_timetable(stu_id: int, limit: Optional[int] = 10):
    return {'events': await logic.get_timetable(db, stu_id, limit)}


@app.get("/emails",
         tags=["Specific Student"],
         description="Get a student's emails via their ID.",
         response_model=models.Emails,
         responses={404: {"model": models.Message}}
         )
async def get_emails(stu_id: int, limit: Optional[int] = 10):
    return {'emails': await logic.get_emails(db, stu_id, limit)}


@app.get("/reminders",
         tags=["Specific Student"],
         description="Get a student's reminders via their ID.",
         response_model=models.Reminders,
         responses={404: {"model": models.Message}}
         )
async def get_reminders(stu_id: int, limit: Optional[int] = 10):
    return {'reminders': await logic.get_reminders(db, stu_id, limit)}


@app.post("/reminder",
          tags=["Specific Student"],
          description="Add a reminder to a student's reminders",
          response_model=models.Reminder,
          responses={404: {"model": models.Message}},
          status_code=status.HTTP_201_CREATED
          )
async def add_reminder(stu_id: int, reminder: models.ReminderIn):
    return await logic.add_reminder(db, stu_id, reminder)


@app.delete("/reminder",
            tags=["Specific Student"],
            description="Remove a reminder",
            responses={404: {"model": models.Message}}
            )
async def delete_reminder(stu_id: int, reminder_id: int):
    await logic.delete_reminder(db, stu_id, reminder_id)


@app.post("/reset",
          tags=["System"],
          description="Force run the database script which will reset the data back to default",
          responses={401: {"model": models.Message}}
          )
async def reset(password: models.Password):
    if password.password != config.reset_pass:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect password")
    remove(config.sqlite_db_file)  # This is a bit hacky; remove the file so and run setup so it will be re-created.
    await logic.setup(db)
    raise HTTPException(status_code=status.HTTP_200_OK, detail="Backend data has been reset")
