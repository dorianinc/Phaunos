from .db import db, environment, SCHEMA, add_prefix_for_prod


class Review_Image(db.Model):
    __tablename__ = "review_images"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    img_src = db.Column(db.String(255), nullable=False)
    review_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("reviews.id")), nullable=False
    )

    review_rel = db.relationship("Review", back_populates="review_images_rel")
    
    def to_dict(self):
        return {
            "img_src": self.img_src,
            "review_id": self.review_id
        }

    def to_dict_no_item(self):
        return {
            "img_src": self.img_src,
            "review_id": self.review_id
        }
