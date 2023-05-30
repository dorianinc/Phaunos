from app.models import db, Trail_Image, environment, SCHEMA
from sqlalchemy.sql import text

seed_data = [
    {
        "img_src": "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1685419574/Phaunos/trail-images/vernal.jpg",
        "trail_id": 1,
    },
    {
        "img_src": "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1685419571/Phaunos/trail-images/half-dome.jpg",
        "trail_id": 2,
    },
    {
        "img_src": "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1685419571/Phaunos/trail-images/glacier-point.jpg",
        "trail_id": 3,
    },
    {
        "img_src": "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1685419572/Phaunos/trail-images/four-mile.jpg",
        "trail_id": 4,
    },
    {
        "img_src": "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1685419570/Phaunos/trail-images/upper-yosemite.jpg",
        "trail_id": 5,
    },
    {
        "img_src": "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1685419571/Phaunos/trail-images/taft.jpg",
        "trail_id": 6,
    },
    {
        "img_src": "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1685419573/Phaunos/trail-images/mirror-lake.jpg",
        "trail_id": 7,
    },
    {
        "img_src": "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1685419573/Phaunos/trail-images/valley-loop.jpg",
        "trail_id": 8,
    },
    {
        "img_src": "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1685419573/Phaunos/trail-images/sentinel-dome.jpg",
        "trail_id": 9,
    },
    {
        "img_src": "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1685419570/Phaunos/trail-images/pohono.jpg",
        "trail_id": 10,
    },
    {
        "img_src": "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1685419575/Phaunos/trail-images/lady-bird-johnson.jpg",
        "trail_id": 11,
    },
    {
        "img_src": "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1685419575/Phaunos/trail-images/tall-trees.jpg",
        "trail_id": 12,
    },
    {
        "img_src": "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1685419572/Phaunos/trail-images/coastal-yurok.jpg",
        "trail_id": 13,
    },
    {
        "img_src": "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1685419571/Phaunos/trail-images/trillium.jpg",
        "trail_id": 14,
    },
    {
        "img_src": "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1685419571/Phaunos/trail-images/enderts-beach.jpg",
        "trail_id": 15,
    },
    {
        "img_src": "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1685419572/Phaunos/trail-images/redwood-creek.jpg",
        "trail_id": 16,
    },
    {
        "img_src": "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1685419575/Phaunos/trail-images/berry-glen.jpg",
        "trail_id": 17,
    },
    {
        "img_src": "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1685419574/Phaunos/trail-images/skunk-cabbage.jpg",
        "trail_id": 18,
    },
    {
        "img_src": "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1685419576/Phaunos/trail-images/dolason.jpg",
        "trail_id": 19,
    },
    {
        "img_src": "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1685419575/Phaunos/trail-images/flint-ridge.jpg",
        "trail_id": 20,
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
