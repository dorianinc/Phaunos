from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(50), nullable=False)
    rating = db.Column(db.Float, nullable=False)
    trail_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("trails.id")), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
        
    user_rel = db.relationship("User", back_populates="review_rel")
    trail_rel = db.relationship("Trail", back_populates="review_rel")
    review_images_rel = db.relationship("Review_Image", back_populates="review_rel")
    
    
    def to_dict(self):
        return {
            "id": self.id,
            "description": self.description,
            "rating": self.rating,
            "trail_id": self.trail_id,
            "user_id": self.trail_id
        }
        
    def to_dict_no_item(self):
        return {
            "id": self.id,
            "description": self.description,
            "rating": self.rating,
            "trail_id": self.trail_id,
            "user_id": self.trail_id
        }