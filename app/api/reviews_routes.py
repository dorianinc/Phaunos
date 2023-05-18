from flask import Blueprint, request, make_response
from app.models import Review

reviews_routes = Blueprint("reviewss", __name__)

@reviews_routes.route("/<int:trail_id>")
def get_reviews_by_trail_id(trail_id):
    reviews = Review.query
    return "trail_id"