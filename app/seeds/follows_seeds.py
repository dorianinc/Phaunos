from app.models import db, follows, environment, SCHEMA
from sqlalchemy.sql import text

seed_data = [
    ## user 1
    {
        "follower": 1,
        "followed": 2
    },
        {
        "follower": 1,
        "followed": 3
    },
    {
        "follower": 1,
        "followed": 4
    },
    {
        "follower": 1,
        "followed": 5
    },
        {
        "follower": 1,
        "followed": 6
    },
    {
        "follower": 1,
        "followed": 7
    },
    {
        "follower": 1,
        "followed": 8
    },
    {
        "follower": 1,
        "followed": 9
    },
        {
        "follower": 1,
        "followed": 10
    },
    {
        "follower": 1,
        "followed": 11
    },
        {
        "follower": 1,
        "followed": 12
    },
    {
        "follower": 1,
        "followed": 13
    },
        {
        "follower": 1,
        "followed": 14
    },
    {
        "follower": 1,
        "followed": 15
    },
]

# @with_appcontext
def seed_follows(app):
    with app.app_context():
        for data in seed_data:
            follow = follows(**data)
            db.session.add(follow)

        db.session.commit()


# @with_appcontext
def undo_follows(app):
    with app.app_context():
        if environment == "production":
            db.session.execute(
                f"TRUNCATE table {SCHEMA}.follows RESTART IDENTITY CASCADE;"
            )
        else:
            db.session.execute(text("DELETE FROM follows"))

        db.session.commit()
