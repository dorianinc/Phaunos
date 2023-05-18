from flask import Blueprint, request, make_response
from flask_login import login_required, current_user
from app.models import db, Review
from app.forms import ReviewForm

reviews_routes = Blueprint("reviewss", __name__)

@reviews_routes.route("/<int:review_id>")
def get_review_by_id(review_id):
    """ Get single review by id """
    review = Review.query.get(review_id)
    if not review:
        error = make_response("Review does not exist")
        error.status_code = 404
        return error
    return review.to_dict(includeImages=True)

@reviews_routes.route("/<int:review_id>", methods=["PUT"])
def edit_review(review_id):
    """ Edit a single review """
    user = current_user.to_dict()

    #------------ validation -------------#    
    review = Review.query.get(review_id)
    if not review:
        error = make_response("Review does not exist")
        error.status_code = 404
        return error
    
    review_dict = review.to_dict(includeImages=True)
    if int(review_dict["user_id"]) != user["id"]:
        error = make_response("Only the creator of a review can edit a review")
        error.status_code = 401
        return error
    #--------------------------------------#  
    form = ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        print("🥳🥳🥳🥳 FORM IS VALID")
        
        data = form.data
        review.description = data["description"]
        review.rating = data["rating"]
        db.session.commit()
        
        return review.to_dict(includeImages=True)
    
    else:
        form_errors = {key: val[0] for (key, val) in form.errors.items()}
        error = make_response(form_errors)
        error.status_code = 400
        return error

@reviews_routes.route("/<int:review_id>", methods=["DELETE"])
def delete_review(review_id):
    """ Delete a single review """
    user = current_user.to_dict()

    #------------ validation -------------#    
    review = Review.query.get(review_id)
    if not review:
        error = make_response("Review does not exist")
        error.status_code = 404
        return error
    
    review_dict = review.to_dict()
    if int(review_dict["user_id"]) != user["id"]:
        error = make_response("Only the creator of a review can delete a review")
        error.status_code = 401
        return error
    #--------------------------------------#  
    
    db.session.delete(review)    
    db.session.commit()
    return (f"Successfully deleted review #: {review_dict['id']}")
    