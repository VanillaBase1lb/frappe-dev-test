-- CREATE DATABASE IF NOT EXISTS `frappe`;
-- CREATE USER 'frappeuser'@'localhost' IDENTIFIED BY 'password';
-- GRANT ALL PRIVILEGES ON `frappe`.* TO 'frappeuser'@'localhost';

USE frappe;

CREATE TABLE books (
    bookid INTEGER PRIMARY KEY,
    title VARCHAR(255),
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
    username VARCHAR(16) PRIMARY KEY,
    fullname VARCHAR(255),
    debt INTEGER
);

CREATE TABLE transactions (
    bookid INTEGER,
    username VARCHAR(16),
    rent INTEGER,

    FOREIGN KEY(bookid) REFERENCES books(bookid),
    FOREIGN KEY(username) REFERENCES members(username),
    UNIQUE(bookid, username)
);
