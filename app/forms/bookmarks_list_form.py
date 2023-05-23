from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired

class BookmarksListForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    submit = SubmitField("Create Bookmarks List")