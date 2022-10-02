"""Handle database connections"""

from os import environ
from mysql.connector import pooling

DB = environ.get("APP_DB")
DB_USERNAME = environ.get("APP_DB_USERNAME")
DB_PASSWORD = environ.get("APP_DB_PASSWORD")
DB_HOST = environ.get("APP_DB_HOST")

pool = pooling.MySQLConnectionPool(
    pool_name="dbpool",
    pool_size=2,
    pool_reset_session=True,
    host=DB_HOST,
    database=DB,
    user=DB_USERNAME,
    password=DB_PASSWORD,
)

# TODO: Add sql hook to delete from members table
# conn = pool.get_connection()
# cursor = conn.cursor()
# # cursor.execute(f"USE {DB}")
# cursor.execute("SELECT * FROM books")
# result = cursor.fetchall()
# print(result)
