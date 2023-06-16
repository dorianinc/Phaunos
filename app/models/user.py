from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


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


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {"id": self.id,
                "first_name": self.first_name,
                "last_name": self.last_name,
                "default_pic": self.default_pic,
                "profile_pic": self.profile_pic,
                "username": self.username,
                "email": self.email}
    
    # followers = db.relationship(
    #     "User",
    #     secondary="follows",
    #     primaryjoin=follows.columns.followed == id,
    #     secondaryjoin=follows.columns.followers == id,
    #     back_populates="following",
    # )
    
    # following = db.relationship(
    #     "User",
    #     secondary="followers",
    #     primaryjoin=followers.column
    # )