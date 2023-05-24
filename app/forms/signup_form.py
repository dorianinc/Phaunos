from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, Length, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("Email address is already in use.")


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError("Username is already in use.")


class SignUpForm(FlaskForm):
    firstName = StringField(
        "first name",
        validators=[
            DataRequired()
        ],
    )
    lastName = StringField(
        "last name",
        validators=[
            DataRequired(),
        ],
    )
    username = StringField(
        "username",
        validators=[
            DataRequired(),
            Length(
                min=5, max=5, message="Username must between 5 and 10 characters long"
            ),
            username_exists,
        ],
    )
    email = StringField(
        "email",
        validators=[
            DataRequired(),
            Email(message="Please provide a valid email."),
            user_exists,
        ],
    )
    password = StringField(
        "password",
        validators=[
            DataRequired(),
            Length(
                min=8,
                max=16,
                message="Password must be between 8 and 16 characters long.",
            ),
        ],
    )
