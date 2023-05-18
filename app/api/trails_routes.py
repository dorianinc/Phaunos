from flask import Blueprint, request, make_response
from flask_login import login_required, current_user
from app.models import Trail

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

@trails_routes.route("/<int:trail_id>", methods=[POST])
def create_a_review(trail_id):
    """"Create a review for a trail"""
