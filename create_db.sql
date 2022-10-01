USE frappe;

CREATE TABLE books (
    bookid INTEGER PRIMARY KEY,
    authors VARCHAR(255),
    average_rating INTEGER,
    isbn CHAR(10),
    isbn13 CHAR(13),
    language_code VARCHAR(10),
    num_pages INTEGER,
    ratings_count INTEGER,
    text_reviews_count INTEGER,
    publication_date DATE,
    publisher VARCHAR(255)
);

CREATE TABLE members (
    memberid INTEGER PRIMARY KEY,
    name_full VARCHAR(255),
    debt INTEGER
);

CREATE TABLE transactions (
    transactionid SERIAL,
    FOREIGN KEY(bookid) REFERENCES books(bookid),
    FOREIGN KEY(memberid) REFERENCES members(memberid),
    rent INTEGER
);
