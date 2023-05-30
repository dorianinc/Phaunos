from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    user1 = User(
        first_name="Dorian",
        last_name="Macias",
        profile_pic="https://res.cloudinary.com/dkuhmdf7w/image/upload/v1684768954/Phaunos/animal-icons/wolf.png",
        username="user1",
        email="user1@aa.io",
        password="password",
    )
    user2 = User(
        first_name="John",
        last_name="Smith",
        profile_pic="https://res.cloudinary.com/dkuhmdf7w/image/upload/v1684768954/Phaunos/animal-icons/bee.png",
        username="user2",
        email="user2@aa.io",
        password="password",
    )
    user3 = User(
        first_name="Juan",
        last_name="Smith-o",
        username="user3",
        profile_pic="https://res.cloudinary.com/dkuhmdf7w/image/upload/v1684768954/Phaunos/animal-icons/turtle.png",
        email="user3@aa.io",
        password="password",
    )
    user4 = User(
        first_name="John",
        last_name="Doe",
        profile_pic="https://res.cloudinary.com/dkuhmdf7w/image/upload/v1684768954/Phaunos/animal-icons/fox.png",
        username="user4",
        email="user4@aa.io",
        password="password",
    )
    user5 = User(
        first_name="Alice",
        last_name="Johnson",
        profile_pic="https://res.cloudinary.com/dkuhmdf7w/image/upload/v1684768954/Phaunos/animal-icons/bear.png",
        username="user5",
        email="user5@aa.io",
        password="password",
    )
    user6 = User(
        first_name="Michael",
        last_name="Smith",
        profile_pic="https://res.cloudinary.com/dkuhmdf7w/image/upload/v1684768954/Phaunos/animal-icons/fox.png",
        username="user6",
        email="user6@aa.io",
        password="password",
    )
    user7 = User(
        first_name="Emma",
        last_name="Williams",
        profile_pic="https://res.cloudinary.com/dkuhmdf7w/image/upload/v1684768954/Phaunos/animal-icons/bear.png",
        username="user7",
        email="user7@aa.io",
        password="password",
    )
    user8 = User(
        first_name="Sophia",
        last_name="Brown",
        profile_pic="https://res.cloudinary.com/dkuhmdf7w/image/upload/v1684768954/Phaunos/animal-icons/bee.png",
        username="user8",
        email="user8@aa.io",
        password="password",
    )
    user9 = User(
        first_name="Matthew",
        last_name="Jones",
        profile_pic="https://res.cloudinary.com/dkuhmdf7w/image/upload/v1684768954/Phaunos/animal-icons/turtle.png",
        username="user9",
        email="user9@aa.io",
        password="password",
    )
    user10 = User(
        first_name="Olivia",
        last_name="Miller",
        profile_pic="https://res.cloudinary.com/dkuhmdf7w/image/upload/v1684768954/Phaunos/animal-icons/butterfly.png",
        username="user10",
        email="user10@aa.io",
        password="password",
    )
    user11 = User(
        first_name="Daniel",
        last_name="Wilson",
        profile_pic="https://res.cloudinary.com/dkuhmdf7w/image/upload/v1684768954/Phaunos/animal-icons/wolf.png",
        username="user11",
        email="user11@aa.io",
        password="password",
    )
    user12 = User(
        first_name="Emily",
        last_name="Anderson",
        profile_pic="https://res.cloudinary.com/dkuhmdf7w/image/upload/v1684768954/Phaunos/animal-icons/bee.png",
        username="user12",
        email="user12@aa.io",
        password="password",
    )
    user13 = User(
        first_name="James",
        last_name="Taylor",
        profile_pic="https://res.cloudinary.com/dkuhmdf7w/image/upload/v1684768954/Phaunos/animal-icons/bear.png",
        username="user13",
        email="user13@aa.io",
        password="password",
    )
    user14 = User(
        first_name="Maria",
        last_name="Garcia",
        profile_pic="https://res.cloudinary.com/dkuhmdf7w/image/upload/v1684768954/Phaunos/animal-icons/fox.png",
        username="user14",
        email="user14@aa.io",
        password="password",
    )
    demo = User(
        first_name="Demo",
        last_name="User",
        profile_pic="https://res.cloudinary.com/dkuhmdf7w/image/upload/v1684768954/Phaunos/animal-icons/turtle.png",
        username="demoUser",
        email="demo@aa.io",
        password="password",
    )

    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    db.session.add(user4)
    db.session.add(user5)
    db.session.add(user6)
    db.session.add(user7)
    db.session.add(user8)
    db.session.add(user9)
    db.session.add(user10)
    db.session.add(user11)
    db.session.add(user12)
    db.session.add(user13)
    db.session.add(user14)
    db.session.add(demo)
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
