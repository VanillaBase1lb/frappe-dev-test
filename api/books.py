"""APIs for book related operations"""

import requests
from flask import request
from . import database


def books():
    """Get books from Frappe API(GET) and add books to database(POST)"""
    url = "https://frappe.io/api/method/frappe-library"
    if request.method == "GET":
        title = request.args.get("title")
        authors = request.args.get("authors")
        isbn = request.args.get("isbn")
        page = request.args.get("page")
        params = {"title": title, "authors": authors, "isbn": isbn, "page": page}
        raw_response = requests.get(url=url, params=params, timeout=10)
        response = raw_response.json()

    elif request.method == "POST":
        body = request.get_json()
        isbn = body["isbn"]
        raw_response = requests.get(url=url, params={"isbn": isbn}, timeout=10)
        response = raw_response.json()
        response = response["message"][0]  # assuming isbn is unique

        print(response)
        bookid = response["bookID"]
        title = response["title"]
        authors = response["authors"]
        average_rating = response["average_rating"]
        isbn = response["isbn"]
        isbn13 = response["isbn13"]
        language_code = response["language_code"]
        num_pages = response["  num_pages"]
        ratings_count = response["ratings_count"]
        text_reviews_count = response["text_reviews_count"]
        publication_date = response["publication_date"]
        publisher = response["publisher"]
        # convert date from MM/DD/YYYY to YYYY-MM-DD
        publication_date = publication_date.split("/")
        publication_date = "-".join(
            [publication_date[2], publication_date[0], publication_date[1]]
        )

        # add book to database
        conn = database.pool.get_connection()
        cursor = conn.cursor()
        query = """INSERT INTO books (bookid, title, authors, average_rating, isbn, isbn13, language_code, num_pages, ratings_count, text_reviews_count, publication_date, publisher) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
        record = (
            bookid,
            title,
            authors,
            average_rating,
            isbn,
            isbn13,
            language_code,
            num_pages,
            ratings_count,
            text_reviews_count,
            publication_date,
            publisher,
        )
        cursor.execute(query, record)
        conn.commit()
        conn.close()

    return response
