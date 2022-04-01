import sqlite3
import asyncio
from contextlib import closing


class Queries:
    get_student_ids = """
                    SELECT id 
                    FROM person 
                    WHERE is_staff = false;
                    """
    get_student = """
                    SELECT * 
                    FROM person 
                    WHERE is_staff = false AND id = ?;
                    """
    get_timetable = """
                    SELECT 
                        e.id,
                        e.title,
                        e.type,
                        e.location,
                        e.description,
                        e.start_time,
                        e.end_time,
                        s.id,
                        s.first_name,
                        s.last_name,
                        s.institute,
                        s.image_url,
                        pe.present,
                        pe.mins_late
                    FROM person AS p
                    INNER JOIN person_event AS pe
                        ON p.id = pe.person_id
                    INNER JOIN event AS e
                        ON pe.event_id = e.id
                    INNER JOIN person AS s
                        ON e.staff_id = s.id
                    WHERE p.id = ?;
                    """
    get_emails = """
                    SELECT 
                        e.id,
                        e.subject,
                        e.content,
                        e.sender_name,
                        e.sender_email,
                        e.sender_image_url,
                        e.time,
                        pe.read
                    FROM person AS p
                    INNER JOIN person_email AS pe
                        ON p.id = pe.person_id
                    INNER JOIN email AS e
                        ON pe.email_id = e.id
                    WHERE p.id = ?;
                    """
    get_reminders = """
                    SELECT 
                        r.id,
                        r.title,
                        r.time,
                        re.user_added
                    FROM person AS p
                    INNER JOIN person_reminder AS re
                        ON p.id = re.person_id
                    INNER JOIN reminder AS r
                        ON re.reminder_id = r.id
                    WHERE p.id = ?;
                    """
    get_next_reminder_id = """
                    SELECT id 
                    FROM reminder 
                    ORDER BY id DESC 
                    LIMIT 1
                    """
    get_latest_reminder = """
                    SELECT *
                    FROM reminder
                    ORDER BY id DESC 
                    LIMIT 1
                    """
    add_reminder = f"""
                    INSERT INTO reminder (
                        id, 
                        title, 
                        time
                    ) VALUES (
                        ({get_next_reminder_id}) + 1,
                        ?,
                        ?
                    );
                    """
    add_reminder_link = f"""
                    INSERT INTO person_reminder (
                        person_id, 
                        reminder_id, 
                        user_added
                    ) VALUES (
                        ?, 
                        ({get_next_reminder_id}), 
                        true
                    );
                    """
    delete_reminder = """
                    DELETE FROM person_reminder
                    WHERE person_id = ? AND reminder_id = ?
                    """


class DB:
    def __init__(self, db_path: str):
        self.lock = asyncio.Lock()  # A lock ensures that the database is only being edited once at a time.
        self.path = db_path

    async def select_query(self, query: str, params: tuple = tuple()):
        """Execute a SELECT query and return all matching rows with data."""
        async with self.lock:
            with closing(sqlite3.connect(self.path)) as con:
                with closing(con.cursor()) as cur:
                    return cur.execute(query, params).fetchall()

    async def execute_query(self, query: str, params: tuple = tuple()):
        """Execute a single SQL query that isn't SELECT."""
        async with self.lock:
            with closing(sqlite3.connect(self.path)) as con:
                with closing(con.cursor()) as cur:
                    cur.execute(query, params)
                    con.commit()

    async def execute_script(self, script: str):
        """Execute a script (multiple statements, seperated with ;) and commit it to the database."""
        async with self.lock:
            with closing(sqlite3.connect(self.path)) as con:
                with closing(con.cursor()) as cur:
                    cur.executescript(script)
                    con.commit()
