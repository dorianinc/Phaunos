from app.models import db, Bookmarks_List, environment, SCHEMA
from sqlalchemy.sql import text

seed_data = [
   ## user 1
    {
        "title": "User 1's List",
        "cover": "https://static.vecteezy.com/system/resources/previews/000/596/318/original/deer-vector-icon-illustration-design.jpg",
        "user_id": 1
    },
   ## user 2
    {
        "title": "User 2's List",
        "cover": "https://static.vecteezy.com/system/resources/previews/000/596/318/original/deer-vector-icon-illustration-design.jpg",
        "user_id": 2
    },
   ## user 3
    {
        "title": "User 3's List",
        "cover": "https://static.vecteezy.com/system/resources/previews/000/596/318/original/deer-vector-icon-illustration-design.jpg",
        "user_id": 3
    },
    ]


# @with_appcontext
def seed_bookmarks_list(app):
    with app.app_context():
        for data in seed_data:
            bookmarks_list = Bookmarks_List(**data)
            db.session.add(bookmarks_list)

        db.session.commit()


# @with_appcontext
def undo_bookmarks_list(app):
    with app.app_context():
        if environment == "production":
            db.session.execute(
                f"TRUNCATE table {SCHEMA}.bookmarks_lists RESTART IDENTITY CASCADE;"
            )
        else:
            db.session.execute(text("DELETE FROM bookmarks_lists"))

        db.session.commit()



