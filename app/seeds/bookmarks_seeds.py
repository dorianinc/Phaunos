from app.models import db, Bookmark, environment, SCHEMA
from sqlalchemy.sql import text

seed_data = [
   ## list 1
     {
        "bookmarks_list_id": 1,
        "trail_id": 1
    },
    {
        "bookmarks_list_id": 1,
        "trail_id": 2
    },
    {
        "bookmarks_list_id": 1,
        "trail_id": 3
    },
    {
        "bookmarks_list_id": 1,
        "trail_id": 4
    },
    {
        "bookmarks_list_id": 1,
        "trail_id": 5
    },
    {
        "bookmarks_list_id": 1,
        "trail_id": 6
    },
    {
        "bookmarks_list_id": 1,
        "trail_id": 7
    },
    {
        "bookmarks_list_id": 1,
        "trail_id": 8
    },
    {
        "bookmarks_list_id": 1,
        "trail_id": 9
    },
    {
        "bookmarks_list_id": 1,
        "trail_id": 10
    },
    ## list 2
    {
        "bookmarks_list_id": 2,
        "trail_id": 1
    },
    {
        "bookmarks_list_id": 2,
        "trail_id": 2
    },
    {
        "bookmarks_list_id": 2,
        "trail_id": 3
    },
    {
        "bookmarks_list_id": 2,
        "trail_id": 4
    },
    {
        "bookmarks_list_id": 2,
        "trail_id": 5
    },
    {
        "bookmarks_list_id": 2,
        "trail_id": 6
    },
    {
        "bookmarks_list_id": 2,
        "trail_id": 7
    },
    {
        "bookmarks_list_id": 2,
        "trail_id": 8
    },
    {
        "bookmarks_list_id": 2,
        "trail_id": 9
    },
    {
        "bookmarks_list_id": 2,
        "trail_id": 10
    },
    ## list 3
    {
        "bookmarks_list_id": 3,
        "trail_id": 1
    },
    {
        "bookmarks_list_id": 3,
        "trail_id": 2
    },
    {
        "bookmarks_list_id": 3,
        "trail_id": 3
    },
    {
        "bookmarks_list_id": 3,
        "trail_id": 4
    },
    {
        "bookmarks_list_id": 3,
        "trail_id": 5
    },
    {
        "bookmarks_list_id": 3,
        "trail_id": 6
    },
    {
        "bookmarks_list_id": 3,
        "trail_id": 7
    },
    {
        "bookmarks_list_id": 3,
        "trail_id": 8
    },
    {
        "bookmarks_list_id": 3,
        "trail_id": 9
    },
    {
        "bookmarks_list_id": 3,
        "trail_id": 10
    }   
    ]


# @with_appcontext
def seed_bookmarks(app):
    with app.app_context():
        for data in seed_data:
            bookmark = Bookmark(**data)
            db.session.add(bookmark)

        db.session.commit()


# @with_appcontext
def undo_bookmarks(app):
    with app.app_context():
        if environment == "production":
            db.session.execute(
                f"TRUNCATE table {SCHEMA}.bookmarks RESTART IDENTITY CASCADE;"
            )
        else:
            db.session.execute(text("DELETE FROM bookmarks"))

        db.session.commit()



