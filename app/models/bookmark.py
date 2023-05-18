from .db import db, environment, SCHEMA, add_prefix_for_prod

class Bookmark(db.Model):
    __tablename__ = "bookmarks"
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    trail_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("trails.id")), nullable=False)
    bookmarks_list_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("bookmarks_lists.id")), nullable=False)
    
    trail_rel = db.relationship("Trail", back_populates="bookmark_rel")
    bookmarks_list_rel = db.relationship("Bookmarks_List", back_populates="bookmark_rel")
    
    
    def to_dict(self):
        return {
            "id": self.id,
            "trail": self.trail_rel.to_dict(includeImages=True),
            "bookmarks_list_id": self.bookmarks_list_id,
            "trail": self.trail_id
        }
        
    def to_dict_no_item(self):
        return {
            "id": self.id,
            "trail": self.trail_rel.to_dict(includeImages=True),
            "bookmarks_list_id": self.bookmarks_list_id,
            "trail": self.trail_id
        }