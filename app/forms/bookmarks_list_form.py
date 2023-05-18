from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired

class BookmarksListForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    submit = SubmitField("Create Bookmarks List")