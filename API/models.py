from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from enum import Enum


class Person(BaseModel):
    """A class representing a person (student, staff member)."""
    id: int
    first_name: str
    last_name: str
    institute: str
    image_url: str


class StudentIDs(BaseModel):
    """A class representing a list of student IDs"""
    ids: List[int]


class EventType(Enum):
    """A class containing all the event types."""
    LECTURE = "Lecture"
    LAB = "Lab"
    TUTORIAL = "Tutorial"


class Event(BaseModel):
    """A class respresenting an event which appears in a user's timetable."""
    id: int
    title: str
    type: EventType
    location: str
    description: Optional[str] = None
    staff_member: Person
    start_time: datetime
    end_time: datetime
    present: Optional[bool] = False
    mins_late: Optional[int] = 0


class Email(BaseModel):
    """A class representing an email which appears in a user's email list."""
    id: int
    subject: str
    content: str
    sender_name: str
    sender_email: str
    sender_image_url: str
    time: datetime
    read: Optional[bool] = False


class Reminder(BaseModel):
    """A class representing a reminder which appears in the user's reminders."""
    id: int
    title: str
    time: datetime
    added_by_user: Optional[bool] = True


class Timetable(BaseModel):
    """A class representing a timetable with 0 or more events."""
    events: List[Event]


class Emails(BaseModel):
    """A class representing a list with 0 or more emails."""
    emails: List[Email]


class Reminders(BaseModel):
    """A class representing a list with 0 or more reminders."""
    reminders: List[Reminder]


class ReminderIn(BaseModel):
    """A class representing a reminder which is passed to the API when adding them"""
    title: str
    time: datetime


class Message(BaseModel):
    detail: str

class Password(BaseModel):
    password: str
