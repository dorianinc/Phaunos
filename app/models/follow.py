# from .db import db, environment, SCHEMA, add_prefix_for_prod

# class Follow(db.Model):
#     __tablename__ = "follows"
    
#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}
    
#     id = db.Column(db.Integer, primary_key=True)
#     follower_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
#     followed_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
#     follower_rel = db.relationship("User", back_populates="followers")
#     followed_rel = db.relationship("User", back_populates="following")
    
#     def to_dict(self):
#         return {
#             "id": self.id,
#             "follower_id": self.follower_id,
#             "followed_id": self.followed_id
#         }
        
#     def to_dict_no_item(self):
#         return {
#             "id": self.id,
#             "follower_id": self.follower_id,
#             "followed_id": self.followed_id
#         }