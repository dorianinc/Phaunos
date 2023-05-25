from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Length

class BookmarksListForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired(), Length(min=5, max=15, message="Title must be between 5 to 15 characters long")])
    submit = SubmitField("Create Bookmarks List")