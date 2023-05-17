from app.models import db, Bookmarks_List, environment, SCHEMA
from sqlalchemy.sql import text

seed_data = [
   ## user 1
    {
        "name": "User 1's List",
        "cover": "no cover available",
        "user_id": 1
    },
   ## user 2
    {
        "name": "User 2's List",
        "cover": "no cover available",
        "user_id": 2
    },
   ## user 3
    {
        "name": "User 3's List",
        "cover": "no cover available",
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



