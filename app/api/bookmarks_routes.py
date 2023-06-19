from flask import Blueprint, request, make_response
from flask_login import login_required, current_user
from app.models import db, Bookmark, Bookmarks_List

bookmarks_routes = Blueprint("bookmarks", __name__)

@bookmarks_routes.route("")
def get_users_bookmarks():
    """ Get all of users bookmarks """
    user = current_user.to_dict()
    lists = Bookmarks_List.query.filter(Bookmarks_List.user_id == user["id"]).all()
    bookmarks = []
    for list in lists:
       for bookmark in list.to_dict_bookmark_tabs()["bookmarks"]:
           bookmarks.append(bookmark)
    return bookmarks
    

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


@bookmarks_routes.route("", methods=["PUT"])
def update_bookmark_status():
    """ update a bookmark's completion status """
    user = current_user.to_dict()

    bookmark_id = request.get_json()
    bookmark = Bookmark.query.get(bookmark_id)
    
    #------------ validation -------------#    
    if not bookmark:
        error = make_response("Bookmark does not exist")
        error.status_code = 404
        return error
    #--------------------------------------#   
    bookmark.completed = not bookmark.completed
    db.session.commit()     
    return bookmark.to_dict()


@bookmarks_routes.route("", methods=["DELETE"])
def delete_bookmark():
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