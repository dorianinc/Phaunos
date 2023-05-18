from flask import Blueprint, request, make_response
from flask_login import login_required, current_user
from app.models import db, Trail, Review
from app.forms import ReviewForm

trails_routes = Blueprint("trails", __name__)

@trails_routes.route("")
def get_all_trails():
    """"Get all trails"""
    trails = Trail.query.all()
    return [trail.to_dict() for trail in trails]

@trails_routes.route("/<int:trail_id>")
def get_trail_by_id(trail_id):
    """"Get one trail by id"""
    trail = Trail.query.get(trail_id)
    return trail.to_dict(includeReviews=True)

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
    
    trail_dict = trail.to_dict(includeReviews=True)
    for review in trail_dict["reviews"]:
        if review["user_id"] == user["id"]:
            error = make_response("User has already reviewed this trail")
            error.status_code = 404
            return error    
    #--------------------------------------#  
           
    form = ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        print("🥳🥳🥳🥳 FORM IS VALIDATED")
        
        data = form.data
        new_review = Review(
            description=data["description"],
            rating=data["rating"],
            trail_id=trail_dict["id"],
            user_id=user["id"]
        )
        db.session.add(new_review)
        db.session.commit()
        return f"Review Successfully Created"
    
    else:
        form_errors = {key: val[0] for (key, val) in form.errors.items()}
        error = make_response(form_errors)
        error.status_code = 400
        return error