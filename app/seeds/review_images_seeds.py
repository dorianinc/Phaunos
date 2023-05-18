from app.models import db, Review_Image, environment, SCHEMA
from sqlalchemy.sql import text

seed_data = [
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Milpitas_view2.JPG/1024px-Milpitas_view2.JPG",
       "review_id": 1
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Milpitas_view2.JPG/1024px-Milpitas_view2.JPG",
       "review_id": 2
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Milpitas_view2.JPG/1024px-Milpitas_view2.JPG",
       "review_id": 3
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Milpitas_view2.JPG/1024px-Milpitas_view2.JPG",
       "review_id": 4
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Milpitas_view2.JPG/1024px-Milpitas_view2.JPG",
       "review_id": 5
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Milpitas_view2.JPG/1024px-Milpitas_view2.JPG",
       "review_id": 6
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Milpitas_view2.JPG/1024px-Milpitas_view2.JPG",
       "review_id": 7
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Milpitas_view2.JPG/1024px-Milpitas_view2.JPG",
       "review_id": 8
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Milpitas_view2.JPG/1024px-Milpitas_view2.JPG",
       "review_id": 9
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Milpitas_view2.JPG/1024px-Milpitas_view2.JPG",
       "review_id": 10
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Milpitas_view2.JPG/1024px-Milpitas_view2.JPG",
       "review_id": 11
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Milpitas_view2.JPG/1024px-Milpitas_view2.JPG",
       "review_id": 12
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Milpitas_view2.JPG/1024px-Milpitas_view2.JPG",
       "review_id": 13
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Milpitas_view2.JPG/1024px-Milpitas_view2.JPG",
       "review_id": 14
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Milpitas_view2.JPG/1024px-Milpitas_view2.JPG",
       "review_id": 15
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Milpitas_view2.JPG/1024px-Milpitas_view2.JPG",
       "review_id": 16
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Milpitas_view2.JPG/1024px-Milpitas_view2.JPG",
       "review_id": 17
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Milpitas_view2.JPG/1024px-Milpitas_view2.JPG",
       "review_id": 18
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Milpitas_view2.JPG/1024px-Milpitas_view2.JPG",
       "review_id": 19
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Milpitas_view2.JPG/1024px-Milpitas_view2.JPG",
       "review_id": 20
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Milpitas_view2.JPG/1024px-Milpitas_view2.JPG",
       "review_id": 21
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Milpitas_view2.JPG/1024px-Milpitas_view2.JPG",
       "review_id": 22
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Milpitas_view2.JPG/1024px-Milpitas_view2.JPG",
       "review_id": 23
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Milpitas_view2.JPG/1024px-Milpitas_view2.JPG",
       "review_id": 24
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Milpitas_view2.JPG/1024px-Milpitas_view2.JPG",
       "review_id": 25
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Milpitas_view2.JPG/1024px-Milpitas_view2.JPG",
       "review_id": 26
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Milpitas_view2.JPG/1024px-Milpitas_view2.JPG",
       "review_id": 27
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Milpitas_view2.JPG/1024px-Milpitas_view2.JPG",
       "review_id": 28
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Milpitas_view2.JPG/1024px-Milpitas_view2.JPG",
       "review_id": 29
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Milpitas_view2.JPG/1024px-Milpitas_view2.JPG",
       "review_id": 30
    }
    ]


# @with_appcontext
def seed_review_images(app):
    with app.app_context():
        for data in seed_data:
            image = Review_Image(**data)
            db.session.add(image)

        db.session.commit()


# @with_appcontext
def undo_review_images(app):
    with app.app_context():
        if environment == "production":
            db.session.execute(
                f"TRUNCATE table {SCHEMA}.review_images RESTART IDENTITY CASCADE;"
            )
        else:
            db.session.execute(text("DELETE FROM review_images"))

        db.session.commit()



