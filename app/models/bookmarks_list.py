from .db import db, environment, SCHEMA, add_prefix_for_prod

class Bookmarks_List(db.Model):
    __tablename__ = 'bookmarks_lists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    cover = db.Column(db.String(255), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
        
    user_rel = db.relationship("User", back_populates=("bookmarks_list_rel"))
    bookmark_rel = db.relationship("Bookmark", back_populates="bookmarks_list_rel", cascade="all, delete-orphan")
    
    def to_dict(self, includeBookmarks=False):
        return {
            "id": self.id,
            "title": self.title,
            "cover": self.cover,
            "bookmarks": [bookmark.to_dict() for bookmark in self.bookmark_rel] if includeBookmarks else "",
            "length": len(self.bookmark_rel),
            "user_id": self.user_id
        }
    
    def to_dict_no_item(self):
        return {
            "id": self.id,
            "title": self.title,
            "cover": self.cover,
            "bookmarks": [bookmark.to_dict() for bookmark in self.bookmark_rel],
            "user_id": self.user_id
        }