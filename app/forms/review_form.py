from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    description = StringField("Description", validators=[DataRequired()])
    rating = IntegerField("Rating", validators=[DataRequired()])
    submit = SubmitField("Submit Review")