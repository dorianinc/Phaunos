from flask import Blueprint, jsonify, session, request
from app.models import db, User, Bookmarks_List
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
import random

auth_routes = Blueprint("auth", __name__)


# -----------------------------helper function---------------------------------------#
def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[f"{field}"] = f"{error}"
    return errorMessages
# ------------------------------------------------------------------------------------#

@auth_routes.route("/")
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {"errors": ["Unauthorized"]}, 401

@auth_routes.route("/login", methods=["POST"])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data["email"]).first()
        test = login_user(user)
        return user.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

@auth_routes.route("/logout")
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {"message": "User logged out"}

@auth_routes.route("/signup", methods=["POST"])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        if "profile_pic" not in form.data:
            animals = ["wolf", "bird", "bear", "butterfly", "fox", "turtle", "bee"]
            image_url = f"https://res.cloudinary.com/dkuhmdf7w/image/upload/v1684768954/Phaunos/animal-icons/{animals[random.randint(0,6)]}.png"
            user = User(
                first_name=form.data["firstName"],
                last_name=form.data["lastName"],
                default_pic=image_url,
                username=form.data["username"],
                email=form.data["email"],
                password=form.data["password"],
            )
        else:
            user = User(
                first_name=form.data["firstName"],
                last_name=form.data["lastName"],
                profile_pic=form.data["profile_pic"],
                username=form.data["username"],
                email=form.data["email"],
                password=form.data["password"],
            )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        new_list = Bookmarks_List(title="My Favorites", user_id=user.to_dict()["id"])
        db.session.add(new_list)
        db.session.commit()
        return user.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

@auth_routes.route("/unauthorized")
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {"errors": ["Unauthorized"]}, 401
