from .db import db, environment, SCHEMA, add_prefix_for_prod


class Trail(db.Model):
    __tablename__ = "trails"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    park = db.Column(db.String(50), nullable=True)
    city = db.Column(db.String(50), nullable=True)
    state = db.Column(db.String(50), nullable=True)
    lat = db.Column(db.Float, nullable=False)
    lng = db.Column(db.Float, nullable=False)
    difficulty = db.Column(db.String(50), nullable=False)
    length = db.Column(db.String(50), nullable=False)
    elevation = db.Column(db.String(50), nullable=True)
    route_type = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    attractions = db.Column(db.String(255), nullable=False)
    activities = db.Column(db.String(255), nullable=False)
    suitability = db.Column(db.String(255), nullable=False)

    trail_images_rel = db.relationship(
        "Trail_Image", back_populates="trail_rel", cascade="all, delete-orphan"
    )
    review_rel = db.relationship("Review", back_populates="trail_rel")
    bookmark_rel = db.relationship("Bookmark", back_populates="trail_rel")

    def to_dict(self, includeImages=False, includeReviews=False):
        return {
            "id": self.id,
            "name": self.name,
            "park": self.park,
            "city": self.city,
            "state": self.state,
            "lat": self.lat,
            "lng": self.lng,
            "difficulty": self.difficulty,
            "len": self.length,
            "elevation": self.elevation,
            "route_type": self.route_type,
            "description": self.description,
            "attractions": self.attractions.split(","),
            "activities": self.activities.split(","),
            "suitability": self.suitability.split(","),
            "cover": (self.trail_images_rel[0]).to_dict(),
            "images": [image.to_dict() for image in self.trail_images_rel]
            if includeImages
            else "",
            "avg_rating": sum(
                [review.to_dict()["rating"] for review in self.review_rel]
            )
            / len([review.to_dict()["rating"] for review in self.review_rel]),
            "reviews": [review.to_dict() for review in self.review_rel]
            if includeReviews
            else "",
            "num_reviews": len(self.review_rel),
        }

    def to_dict_no_item(self):
        return {
            "id": self.id,
            "name": self.name,
            "park": self.park,
            "city": self.city,
            "state": self.state,
            "lat": self.lat,
            "lng": self.lng,
            "difficulty": self.difficulty,
            "length": self.length,
            "elevation": self.elevation,
            "route_type": self.route_type,
            "description": self.description,
            "attractions": self.attractions.split(","),
            "activities": self.activities.split(","),
            "suitability": self.suitability.split(","),
        }
