from flask import Blueprint, request, make_response
from flask_login import login_required, current_user
from app.models import db, Bookmark, Bookmarks_List

bookmarks_routes = Blueprint("bookmarks", __name__)

@bookmarks_routes.route("/<int:bookmark_id>", methods=["DELETE"])
def delete_bookmark(bookmark_id):
    """ Delete a single bookmark """
    user = current_user.to_dict()
    print(f"user 👉 {user}")

    #------------ validation -------------#    
    bookmark = Bookmark.query.get(bookmark_id)
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
    return (f"Successfully deleted bookmark #: {bookmark.id}")