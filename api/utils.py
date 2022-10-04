from flask import jsonify, request
from . import database


def stock():
    """Return all books in stock"""
    conn = database.pool.get_connection()
    cursor = conn.cursor()
    query = """SELECT bookid, title, authors, average_rating, publisher FROM books"""
    cursor.execute(query)
    result = cursor.fetchall()
    # TODO: convert result to list of dicts, currently returns list of tuples
    # print(result)
    conn.close()
    return jsonify(result)


def member_issued_books():
    """Return all books issued by a member"""
    username = request.args.get("username")
    conn = database.pool.get_connection()
    cursor = conn.cursor()
    query = """SELECT books.bookid, transactions.username, title, authors, average_rating, publisher, transactions.rent FROM books JOIN transactions ON transactions.bookid=books.bookid WHERE transactions.username LIKE %s"""
    record = ("%" + username + "%",)
    cursor.execute(query, record)
    result = cursor.fetchall()
    conn.close()
    return jsonify(result)
