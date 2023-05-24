from flask import Blueprint, request, make_response
from flask_login import login_required, current_user
from app.models import db, Bookmark, Bookmarks_List

bookmarks_routes = Blueprint("bookmarks", __name__)

@bookmarks_routes.route("/<int:bookmark_id>")
def get_bookmark_by_id(bookmark_id):
    """" Get single bookmark by id """
    user = current_user.to_dict()
    
    bookmark = Bookmark.query.get(bookmark_id)
    #------------ validation -------------#    
    if not bookmark:
        error = make_response("Bookmark does not exist")
        error.status_code = 404
        return error
    
    list = Bookmarks_List.query.get(bookmark.bookmarks_list_id)
    if list.user_id != user["id"]:
        error = make_response("Only the creator can view their Bookmark")
        error.status_code = 401
        return error
    #--------------------------------------#   
    return bookmark.to_dict()


@bookmarks_routes.route("/<int:bookmark_id>", methods=["PUT"])
def edit_review(bookmark_id):
    """ Edit a bookmark's completion status """
    user = current_user.to_dict()
    data = request.get_json()

    bookmark = Bookmark.query.get(bookmark_id)
    #------------ validation -------------#    
    if not bookmark:
        error = make_response("Bookmark does not exist")
        error.status_code = 404
        return error
    
    list = Bookmarks_List.query.get(bookmark.bookmarks_list_id)
    if list.user_id != user["id"]:
        error = make_response("Only the creator of a Bookmark can delete a bookmark")
        error.status_code = 401
        return error 
    #--------------------------------------#   
    bookmark.completed = data["completed"]
    db.session.commit()     
    return bookmark.to_dict()


@bookmarks_routes.route("", methods=["DELETE"])
def delete_bookmark():
    print("👉👉👉👉👉 in delete bookmark")
    """ Delete a single bookmark """
    user = current_user.to_dict()
    data = request.get_json()

    #------------ validation -------------#    
    bookmark = Bookmark.query.get(data["bookmarkId"])
    if not bookmark:
        error = make_response("Bookmark does not exist")
        error.status_code = 404
        return error
    
    list = Bookmarks_List.query.get(bookmark.bookmarks_list_id)
    if list.user_id != user["id"]:
        error = make_response("Only the creator of a Bookmark can delete a bookmark")
        error.status_code = 401
        return error 
    # #--------------------------------------#
          
    db.session.delete(bookmark)    
    db.session.commit()
    res = make_response({"message": "Successfully deleted"})
    res.status_code = 200
    return res