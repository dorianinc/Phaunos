from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

follows = db.Table(
    "follows",
    db.Model.metadata,
    db.Column("follower", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
    db.Column("followed", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
)

if environment == "production":
    playlist_videos.schema = SCHEMA

class User(db.Model, UserMixin):
    __tablename__ = "users"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    default_pic = db.Column(db.String(255), nullable=True)
    profile_pic = db.Column(db.String(255), nullable=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    bookmarks_list_rel = db.relationship("Bookmarks_List", back_populates="user_rel")
    review_rel = db.relationship("Review", back_populates="user_rel")
    followers = db.relationship(
        "User",
        secondary="follows",
        primaryjoin=follows.columns.followed == id,
        secondaryjoin=follows.columns.follower == id,
        back_populates="following",
    )
    following = db.relationship(
        "User",
        secondary="follows",
        primaryjoin=follows.columns.follower == id,
        secondaryjoin=follows.columns.followed == id,
        back_populates="followers",
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "default_pic": self.default_pic,
            "profile_pic": self.profile_pic,
            "username": self.username,
            "email": self.email,
            "followers": [follower.to_dict_follows() for follower in self.followers],
            "following": [follows.to_dict_follows() for follows in self.following]
        }

    def to_dict_follows(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "default_pic": self.default_pic,
            "profile_pic": self.profile_pic,
            "username": self.username,
            "email": self.email,   
        }
