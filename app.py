"""Create Flask app instance"""

import flask
from api import books
from api import transactions

app = flask.Flask(__name__)

app.add_url_rule("/api/books", methods=["GET", "POST"], view_func=books.books)
app.add_url_rule(
    "/api/transactions/issue", methods=["POST"], view_func=transactions.issue_book
)
app.add_url_rule(
    "/api/transactions/return", methods=["POST"], view_func=transactions.return_book
)


@app.route("/")
def index():
    """Index page"""
    return flask.render_template("index.html")
