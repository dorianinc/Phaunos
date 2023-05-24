from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Length

class BookmarksListForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired(), Length(min=5, message="Title must be a least 5 characters long")])
    submit = SubmitField("Create Bookmarks List")