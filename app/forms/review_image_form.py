from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.aws_helpers import ALLOWED_EXTENSIONS


class ReviewImageForm(FlaskForm):
    # img_src = FileField('Image', validators=[DataRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    img_src = Stringield('Image', validators=[DataRequired()])
    review_id = IntegerField("review_id", validators=[DataRequired()])
    submit = SubmitField("Submit Image")