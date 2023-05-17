from .db import db, environment, SCHEMA, add_prefix_for_prod

class Bookmark(db.Model):
    __tablename__ = "bookmarks"
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    trail_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("trails.id")), nullable=False)
    bookmarks_list_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("bookmarks_lists.id")), nullable=False)
    
    trail_rel = db.relationship("Trail", back_populates="")
    bookmarks_list_rel = db.relationship("Bookmarks_List", back_populates="bookmark_rel")
    