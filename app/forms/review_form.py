from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Length, NumberRange 

class ReviewForm(FlaskForm):
    description = StringField("Description", validators=[DataRequired(), Length(min=8, message="Description must be a least 80 characters long")])
    rating = IntegerField("Rating", validators=[DataRequired(), NumberRange(min=1, max=5, message="Rating must be a value between 1 and 5") ])
    submit = SubmitField("Submit Review")
