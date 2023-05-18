from app.models import db, Trail_Image, environment, SCHEMA
from sqlalchemy.sql import text

seed_data = [
    ## trail 1
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 1
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 1
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 1
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 1
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 1
    },
    ## trail 2
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 2
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 2
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 2
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 2
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 2
    },
    ## trail 3
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 3
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 3
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 3
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 3
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 3
    },
    ## trail 4
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 4
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 4
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 4
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 4
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 4
    },
    ## trail 5
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 5
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 5
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 5
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 5
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 5
    },
    ## trail 6
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 6
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 6
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 6
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 6
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 6
    },
    ## trail 7
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 7
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 7
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 7
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 7
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 7
    },
    ## trail 8
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 8
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 8
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 8
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 8
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 8
    },
    ## trail 9
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 9
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 9
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 9
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 9
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 9
    },
    ## trail 10
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 10
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 10
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 10
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 10
    },
    {
       "img_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Atlas_forrest.jpg/1200px-Atlas_forrest.jpg",
       "trail_id": 10
    },
    ]


# @with_appcontext
def seed_trail_images(app):
    with app.app_context():
        for data in seed_data:
            image = Trail_Image(**data)
            db.session.add(image)

        db.session.commit()


# @with_appcontext
def undo_trail_images(app):
    with app.app_context():
        if environment == "production":
            db.session.execute(
                f"TRUNCATE table {SCHEMA}.trail_images RESTART IDENTITY CASCADE;"
            )
        else:
            db.session.execute(text("DELETE FROM trail_images"))

        db.session.commit()



