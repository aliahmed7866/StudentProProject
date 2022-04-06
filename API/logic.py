import sqlite3

import config
from os import mkdir, path, remove
from db import Queries
from fastapi import HTTPException, status
from typing import List


def _print(message):
    """Prints a message to the console with the start characters from the config added"""
    print(config.console_msg_startwith + message)


async def setup(db):
    """Performs all the checks and setup requirements as the API starts."""
    passed = True

    # Create data folder if not exists
    if not path.isdir(config.data_folder):
        _print("Data folder not found. Creating. ")
        mkdir(config.data_folder)

    # Create db file and run the setup script if not exists
    if not path.exists(config.sqlite_db_file):
        try:
            with open(config.sql_setup_file, 'r') as file:
                script = file.read()
        except FileNotFoundError:
            _print("ERROR: Setup script not found. The API will not work as intended.")
            remove(config.sqlite_db_file)  # Remove the file so the program will try to create it again next time
            passed = False
        else:
            try:
                await db.execute_script(script)
            except sqlite3.Error:
                _print("ERROR: SQL setup file failed to execute. The API will not work as intended.")
                remove(config.sqlite_db_file)
                passed = False
            else:
                _print("Created DB file and executed setup script.")

    if passed:
        _print("All checks have been passed.")
    return passed


async def validate_student_id(db, stu_id) -> list:
    try:
        return (await db.select_query(Queries.get_student, (stu_id,)))[0]
    except IndexError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Student with that ID not found")


async def get_student_ids(db) -> List[int]:
    ids = []
    for row in await db.select_query(Queries.get_student_ids):
        ids.append(row[0])
    return ids


async def get_student(db, stu_id: int) -> dict:
    stu = await validate_student_id(db, stu_id)
    return {
        'id': stu[0],
        'first_name': stu[1],
        'last_name': stu[2],
        'institute': stu[3],
        'image_url': stu[4]
    }


async def get_timetable(db, stu_id: int, limit: int) -> List[dict]:
    await validate_student_id(db, stu_id)
    events = await db.select_query(Queries.get_timetable, (stu_id, limit))
    timetable = []
    for event in events:
        timetable.append(
            {
                'id': event[0],
                'title': event[1],
                'type': event[2],
                'location': event[3],
                'description': event[4],
                'staff_member': {
                    'id': event[7],
                    'first_name': event[8],
                    'last_name': event[9],
                    'institute': event[10],
                    'image_url': event[11]
                },
                'start_time': event[5],
                'end_time': event[6],
                'present': event[12],
                'mins_late': event[13]
            }
        )
    return timetable


async def get_emails(db, stu_id: int, limit: int) -> List[dict]:
    await validate_student_id(db, stu_id)
    emails = await db.select_query(Queries.get_emails, (stu_id, limit))
    emails_list = []
    for email in emails:
        emails_list.append(
            {
                'id': email[0],
                'subject': email[1],
                'content': email[2],
                'sender_name': email[3],
                'sender_email': email[4],
                'sender_image_url': email[5],
                'time': email[6],
                'read': email[7]
            }
        )
    return emails_list


async def get_reminders(db, stu_id: int, limit: int) -> List[dict]:
    await validate_student_id(db, stu_id)
    reminders = await db.select_query(Queries.get_reminders, (stu_id, limit))
    reminders_list = []
    for reminder in reminders:
        reminders_list.append(
            {
                'id': reminder[0],
                'title': reminder[1],
                'time': reminder[2],
                'added_by_user': reminder[3]
            }
        )
    return reminders_list


async def add_reminder(db, stu_id: int, reminder):
    await validate_student_id(db, stu_id)
    await db.execute_query(Queries.add_reminder, (reminder.title, reminder.time))
    await db.execute_query(Queries.add_reminder_link, (stu_id,))
    reminder = (await db.select_query(Queries.get_latest_reminder))[0]
    return {
        'id': reminder[0],
        'title': reminder[1],
        'time': reminder[2]
    }


async def delete_reminder(db, stu_id: int, reminder_id: int):
    await validate_student_id(db, stu_id)
    await db.execute_query(Queries.delete_reminder, (stu_id, reminder_id))
