from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

seed_data = [
    ## user 1
    # {
    #     "description": "Beautiful trail with scenic views of mountains and lakes.",
    #     "rating": 4,
    #     "trail_id": 1,
    #     "user_id": 1
    # },
    # {
    #     "description": "Challenging trail with steep climbs and breathtaking waterfalls.",
    #     "rating": 5,
    #     "trail_id": 2,
    #     "user_id": 1
    # },
    # {
    #     "description": "Easy trail suitable for beginners, offering a peaceful forest experience.",
    #     "rating": 3,
    #     "trail_id": 3,
    #     "user_id": 1
    # },
    # {
    #     "description": "Moderate trail with diverse landscapes and abundant wildlife.",
    #     "rating": 4,
    #     "trail_id": 4,
    #     "user_id": 1
    # },
    # {
    #     "description": "Scenic trail along the coastline, providing stunning sunset views.",
    #     "rating": 5,
    #     "trail_id": 5,
    #     "user_id": 1
    # },
    # {
    #     "description": "Trail with historical landmarks and educational signage throughout.",
    #     "rating": 4,
    #     "trail_id": 6,
    #     "user_id": 1
    # },
    # {
    #     "description": "Demanding trail with rugged terrain, suitable for experienced hikers.",
    #     "rating": 5,
    #     "trail_id": 7,
    #     "user_id": 1
    # },
    # {
    #     "description": "Family-friendly trail with picnic areas and playgrounds along the way.",
    #     "rating": 3,
    #     "trail_id": 8,
    #     "user_id": 1
    # },
    # {
    #     "description": "Spectacular trail with panoramic views from the mountain's summit.",
    #     "rating": 4,
    #     "trail_id": 9,
    #     "user_id": 1
    # },
    # {
    #     "description": "Tranquil trail through a serene forest, perfect for nature enthusiasts.",
    #     "rating": 5,
    #     "trail_id": 10,
    #     "user_id": 1
    # },
    ## user 2
    {
        "description": "A challenging trail with rocky terrain and breathtaking summit views.",
        "rating": 5,
        "trail_id": 1,
        "user_id": 2
    },
    {
        "description": "An adventurous trail with river crossings and dense forests.",
        "rating": 4,
        "trail_id": 2,
        "user_id": 2
    },
    {
        "description": "A peaceful trail with gentle slopes and wildflower meadows.",
        "rating": 3,
        "trail_id": 3,
        "user_id": 2
    },
    {
        "description": "A trail with ancient ruins and archaeological points of interest.",
        "rating": 4,
        "trail_id": 4,
        "user_id": 2
    },
    {
        "description": "A picturesque trail along a river, ideal for birdwatching.",
        "rating": 5,
        "trail_id": 5,
        "user_id": 2
    },
    {
        "description": "A scenic trail with panoramic views of valleys and distant peaks.",
        "rating": 4,
        "trail_id": 6,
        "user_id": 2
    },
    {
        "description": "A family-friendly trail with interpretive signs and educational activities.",
        "rating": 3,
        "trail_id": 7,
        "user_id": 2
    },
    {
        "description": "A challenging trail leading to a hidden waterfall in a lush forest.",
        "rating": 5,
        "trail_id": 8,
        "user_id": 2
    },
    {
        "description": "A serene trail with a serene lake and opportunities for fishing.",
        "rating": 4,
        "trail_id": 9,
        "user_id": 2
    },
    {
        "description": "A tranquil trail through a colorful autumn forest, perfect for relaxation.",
        "rating": 5,
        "trail_id": 10,
        "user_id": 2
    },
    ## user 3
    {
        "description": "A challenging trail with steep ascents and breathtaking ridge views.",
        "rating": 4,
        "trail_id": 1,
        "user_id": 3
    },
    {
        "description": "A scenic trail with cascading waterfalls and lush greenery.",
        "rating": 5,
        "trail_id": 2,
        "user_id": 3
    },
    {
        "description": "A peaceful trail along a tranquil river, ideal for meditation.",
        "rating": 3,
        "trail_id": 3,
        "user_id": 3
    },
    {
        "description": "A trail with historical landmarks and significant cultural sites.",
        "rating": 4,
        "trail_id": 4,
        "user_id": 3
    },
    {
        "description": "A picturesque trail with panoramic mountain views and alpine meadows.",
        "rating": 5,
        "trail_id": 5,
        "user_id": 3
    },
    {
        "description": "A moderate trail with scenic overlooks and diverse wildlife sightings.",
        "rating": 4,
        "trail_id": 6,
        "user_id": 3
    },
    {
        "description": "A family-friendly trail with picnic spots and interactive nature exhibits.",
        "rating": 3,
        "trail_id": 7,
        "user_id": 3
    },
    {
        "description": "A challenging trail with boulder fields and breathtaking summit vistas.",
        "rating": 5,
        "trail_id": 8,
        "user_id": 3
    },
    {
        "description": "A serene trail around a serene lake, perfect for birdwatching.",
        "rating": 4,
        "trail_id": 9,
        "user_id": 3
    },
    {
        "description": "A tranquil trail through a vibrant spring forest, perfect for photography.",
        "rating": 5,
        "trail_id": 10,
        "user_id": 3
    }   
    ]


# @with_appcontext
def seed_reviews(app):
    with app.app_context():
        for data in seed_data:
            review = Review(**data)
            db.session.add(review)

        db.session.commit()


# @with_appcontext
def undo_reviews(app):
    with app.app_context():
        if environment == "production":
            db.session.execute(
                f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;"
            )
        else:
            db.session.execute(text("DELETE FROM reviews"))

        db.session.commit()



