from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    jane = User(
        first_name='Jane',
        last_name='Doe',
        username='user1',
        email='user1@aa.io',
        password='password'
        )
    john = User(
        first_name='John',
        last_name='Smith',
        username='user2',
        email='user2@aa.io',
        password='password'
        )
    juan = User(
        first_name='Juan',
        last_name='Smith-o',
        username='user3',
        email='user3@aa.io',
        password='password'
        )

    db.session.add(jane)
    db.session.add(john)
    db.session.add(juan)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()