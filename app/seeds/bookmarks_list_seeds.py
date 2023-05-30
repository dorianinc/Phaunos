from app.models import db, Bookmarks_List, environment, SCHEMA
from sqlalchemy.sql import text

seed_data = [
    {
        "title": "My Favorites",
        "cover": "https://static.vecteezy.com/system/resources/previews/000/596/318/original/deer-vector-icon-illustration-design.jpg",
        "user_id": 1,
    },
    {
        "title": "My Favorites",
        "cover": "https://static.vecteezy.com/system/resources/previews/000/596/318/original/deer-vector-icon-illustration-design.jpg",
        "user_id": 2,
    },
    {
        "title": "My Favorites",
        "cover": "https://static.vecteezy.com/system/resources/previews/000/596/318/original/deer-vector-icon-illustration-design.jpg",
        "user_id": 3,
    },
    {
        "title": "My Favorites",
        "cover": "https://static.vecteezy.com/system/resources/previews/000/596/318/original/deer-vector-icon-illustration-design.jpg",
        "user_id": 4,
    },
    {
        "title": "My Favorites",
        "cover": "https://static.vecteezy.com/system/resources/previews/000/596/318/original/deer-vector-icon-illustration-design.jpg",
        "user_id": 5,
    },
    {
        "title": "My Favorites",
        "cover": "https://static.vecteezy.com/system/resources/previews/000/596/318/original/deer-vector-icon-illustration-design.jpg",
        "user_id": 6,
    },
    {
        "title": "My Favorites",
        "cover": "https://static.vecteezy.com/system/resources/previews/000/596/318/original/deer-vector-icon-illustration-design.jpg",
        "user_id": 7,
    },
    {
        "title": "My Favorites",
        "cover": "https://static.vecteezy.com/system/resources/previews/000/596/318/original/deer-vector-icon-illustration-design.jpg",
        "user_id": 8,
    },
    {
        "title": "My Favorites",
        "cover": "https://static.vecteezy.com/system/resources/previews/000/596/318/original/deer-vector-icon-illustration-design.jpg",
        "user_id": 9,
    },
    {
        "title": "My Favorites",
        "cover": "https://static.vecteezy.com/system/resources/previews/000/596/318/original/deer-vector-icon-illustration-design.jpg",
        "user_id": 10,
    },
    {
        "title": "My Favorites",
        "cover": "https://static.vecteezy.com/system/resources/previews/000/596/318/original/deer-vector-icon-illustration-design.jpg",
        "user_id": 11,
    },
    {
        "title": "My Favorites",
        "cover": "https://static.vecteezy.com/system/resources/previews/000/596/318/original/deer-vector-icon-illustration-design.jpg",
        "user_id": 12,
    },
    {
        "title": "My Favorites",
        "cover": "https://static.vecteezy.com/system/resources/previews/000/596/318/original/deer-vector-icon-illustration-design.jpg",
        "user_id": 13,
    },
    {
        "title": "My Favorites",
        "cover": "https://static.vecteezy.com/system/resources/previews/000/596/318/original/deer-vector-icon-illustration-design.jpg",
        "user_id": 14,
    },
    {
        "title": "My Favorites",
        "cover": "https://static.vecteezy.com/system/resources/previews/000/596/318/original/deer-vector-icon-illustration-design.jpg",
        "user_id": 15,
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
