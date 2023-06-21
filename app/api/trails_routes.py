from flask import Blueprint, request, make_response, jsonify
from flask_login import login_required, current_user
from app.models import db, Trail, Review, Bookmark
from app.forms import ReviewForm

trails_routes = Blueprint("trails", __name__)

#-----------------------------helper function---------------------------------------#
def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[f"{field}"] = f"{error}"
    return errorMessages
#------------------------------------------------------------------------------------#

@trails_routes.route("")
def get_all_trails():
    """"Get all trails"""
    trails = Trail.query.all()
    return [trail.to_dict(includeImages=True) for trail in trails]

@trails_routes.route("/<int:trail_id>")
def get_trail_by_id(trail_id):
    """"Get single trail by id"""
    trail = Trail.query.get(trail_id)
    if not trail:
        error = make_response("Trail does not exist")
        error.status_code = 404
        return error
    return trail.to_dict(includeImages=True, includeReviews=True)

@trails_routes.route("/<int:trail_id>/reviews")
def get_reviews_by_trail_id(trail_id):
    """ Get all reviews of specific trail """
    reviews = Review.query.filter(Review.trail_id == trail_id).all()
    return [review.to_dict(includeImages=True) for review in reviews]

@trails_routes.route("/<int:trail_id>/reviews", methods=["POST"])
@login_required
def create_a_review(trail_id):
    """"Create a review for a trail"""
    user = current_user.to_dict()
    
    #------------ validation -------------#
    trail = Trail.query.get(trail_id)
    if not trail:
        error = make_response("Trail does not exist")
        error.status_code = 404
        return error
    
    trail_dict = trail.to_dict(includeImages=True, includeReviews=True)
    for review in trail_dict["reviews"]:
        if int(review["user_id"]) == user["id"]:
            return {"errors": {"review":"You already have a review for this trail"}}, 400
    #--------------------------------------#  
           
    form = ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        
        data = form.data
        new_review = Review(
            description=data["description"],
            rating=data["rating"],
            trail_id=trail_dict["id"],
            user_id=user["id"]
        )
        
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400