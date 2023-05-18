from .db import db, environment, SCHEMA, add_prefix_for_prod

class Trail_Image(db.Model):
    __tablename__ = 'trail_images'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    src = db.Column(db.String(255), nullable=False)
    trail_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("trails.id")), nullable=False)
    
    trail_rel = db.relationship('Trail', back_populates="trail_images_rel")
    
    def to_dict(self):
        return {
            "id": self.id,
            "img_src": self.src,
            "trail_id": self.trail_id
        }
        
    def to_dict_no_dict(self):
        return {
            "id": self.id,
            "img_src": self.src,
            "trail_id": self.trail_id
        }