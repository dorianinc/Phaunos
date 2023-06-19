from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Email, Length, ValidationError
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.models import User
from ..api.aws_helpers import ALLOWED_EXTENSIONS

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("Email address is already in use.")

class UserForm(FlaskForm):
    firstName = StringField("first name")
    lastName = StringField("last name")
    profile_pic = FileField(
        "Image File", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))]
    )
    # email = StringField(
    #     "email",
    #     validators=[
    #         Email(message="Please provide a valid email."),
    #         user_exists,
    #     ],
    # )
    # password = StringField(
    #     "password",
    #     validators=[
    #         Length(
    #             min=8,
    #             max=16,
    #             message="Password must be between 8 and 16 characters long.",
    #         ),
    #     ],
    # )
