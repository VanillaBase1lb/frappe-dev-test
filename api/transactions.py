"""APIs for member-book interactions"""

from flask import jsonify, request
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
    query = """SELECT COUNT(*) FROM members WHERE username=%s"""
    record = (username,)
    cursor.execute(query, record)
    result = cursor.fetchone()
    # print(result[0])
    if result[0] == 0:
        query = """INSERT INTO members (username, fullname) VALUES (%s, %s)"""
        record = (username, fullname)
        cursor.execute(query, record)
    else:
        # check for outstanding dues
        query = """SELECT SUM(rent) FROM transactions WHERE username=%s"""
        record = (username,)
        cursor.execute(query, record)
        result = cursor.fetchone()
        if result[0] > 500:
            conn.commit()
            conn.close()
            return "Outstanding dues more than 500!"

    query = """INSERT INTO transactions (username, bookid, rent) VALUES (%s, %s, %s)"""
    record = (username, bookid, rent)
    try:
        cursor.execute(query, record)
    except Exception as ex:
        print(ex)
        conn.rollback()
        conn.close()
        return "Book already issued!"
    conn.commit()
    conn.close()
    return "Success"


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
    return "Success"
