import sqlite3
import asyncio
from contextlib import closing


class Queries:
    pass


class DB:
    def __init__(self, db_path: str):
        self.lock = asyncio.Lock()  # A lock ensures that the database is only being edited once at a time.
        self.path = db_path

    async def select_query(self, query: str, params: tuple = tuple()):
        """Execute a SELECT query and return all matching rows with data."""
        async with self.lock:
            with closing(sqlite3.connect(self.path)) as con:
                with closing(con.cursor()) as cur:
                    cur.execute(query, params)
                    return cur.fetchall()

    async def execute_script(self, script: str):
        """Execute a script (multiple statements, seperated with ;) and commit it to the database."""
        async with self.lock:
            with closing(sqlite3.connect(self.path)) as con:
                with closing(con.cursor()) as cur:
                    cur.executescript(script)
                    cur.commit()
