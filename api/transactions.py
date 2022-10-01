"""APIs for member-book interactions"""

from flask import request
from . import database


def issue_book():
    """Add book issued transaction"""
    body = request.get_json()
    # print(body)
    username = body["username"]
    fullname = body["fullname"]
    bookid = body["bookid"]
    rent = body["rent"]

    conn = database.pool.get_connection()
    cursor = conn.cursor()
    # check if username exists
    # TODO: check for bookid
    query = """SELECT COUNT(*) FROM members WHERE username=%s"""
    record = (username,)
    cursor.execute(query, record)
    result = cursor.fetchone()
    # print(result[0])
    if result[0] == 0:
        query = """INSERT INTO members (username, fullname) VALUES (%s, %s)"""
        record = (username, fullname)
        cursor.execute(query, record)
        conn.commit()

    query = """INSERT INTO transactions (username, bookid, rent) VALUES (%s, %s, %s)"""
    record = (username, bookid, rent)
    cursor.execute(query, record)
    conn.commit()
    conn.close()
    print("done")

    return "done"


def return_book():
    """Delete book issued transaction"""
    body = request.get_json()
    # print(body)
    username = body["username"]
    bookid = body["bookid"]

    conn = database.pool.get_connection()
    cursor = conn.cursor()
    query = """DELETE FROM transactions WHERE username=%s AND bookid=%s"""
    record = (username, bookid)
    cursor.execute(query, record)
    # delete member if no corresponding transactions
    cursor.execute(
        """DELETE FROM members WHERE username NOT IN (SELECT UNIQUE(username) FROM transactions)"""
    )
    conn.commit()
    conn.close()
    print("deleted")

    return "deleted"
