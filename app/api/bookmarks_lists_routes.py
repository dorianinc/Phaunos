from flask import Blueprint, request, make_response
from flask_login import login_required, current_user
from app.models import db, Bookmarks_List
from app.forms import BookmarksListForm

bookmarks_lists_routes = Blueprint("bookmarks_lists", __name__)

@bookmarks_lists_routes.route("")
def get_users_bookmarks_lists():
    """ Get all of users bookmarks lists """
    user = current_user.to_dict()
    lists = Bookmarks_List.query.filter(Bookmarks_List.user_id == user["id"]).all()
    return [list.to_dict() for list in lists]

@bookmarks_lists_routes.route("/<int:list_id>")
def get_bookmarks_list_by_id(list_id):
    """ Get single bookmarks lists by id """
    user = current_user.to_dict()
    
        #------------ validation -------------#
    list = Bookmarks_List.query.get(list_id)
    if not list:
        error = make_response("Bookmarks list does not exist")
        error.status_code = 404
        return error
    
    list_dict = list.to_dict(includeBookmarks=True)
    if int(list_dict["user_id"]) != user["id"]:
        error = make_response("Only the creator of a Bookmarks list can view a list")
        error.status_code = 401
        return error 
    #--------------------------------------#  
   
    return list_dict

@bookmarks_lists_routes.route("", methods=["POST"])
@login_required
def create_bookmarks_list():
    """ Create a bookmarks list """
    user = current_user.to_dict()
    
    form = BookmarksListForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        print("🥳🥳🥳🥳 BOOKMARKS LIST FORM IS VALID")
        
        data = form.data
        new_list = Bookmarks_List(
            name=data["name"],
            user_id=user["id"]
        )
        db.session.add(new_list)
        db.session.commit()
        return new_list.to_dict()
    else:
        form_errors = {key: val[0] for (key, val) in form.errors.items()}
        error = make_response(form_errors)
        error.status_code = 400
        return error

@bookmarks_lists_routes.route("/<int:list_id>", methods=["PUT"])
def edit_bookmarks_list(list_id):
    """ Edit a single bookmarks list """
    user = current_user.to_dict()

    #------------ validation -------------#    
    list = Bookmarks_List.query.get(list_id)
    if not list:
        error = make_response("Bookmarks list does not exist")
        error.status_code = 404
        return error
    
    list_dict = list.to_dict(includeBookmarks=True)
    if int(list_dict["user_id"]) != user["id"]:
        error = make_response("Only the creator of a booksmark list can edit a list")
        error.status_code = 401
        return error
    #--------------------------------------#  
    form = BookmarksListForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        print("🥳🥳🥳🥳 BOOKMARKS LIST IS VALID")
        
        data = form.data
        list.name = data["name"]
        db.session.commit()
        
        return list.to_dict()
    
    else:
        form_errors = {key: val[0] for (key, val) in form.errors.items()}
        error = make_response(form_errors)
        error.status_code = 400
        return error
    
@bookmarks_lists_routes.route("/<int:list_id>", methods=["DELETE"])
def delete_review(list_id):
    """ Delete a single bookmarks list """
    user = current_user.to_dict()

    #------------ validation -------------#    
    list = Bookmarks_List.query.get(list_id)
    if not list:
        error = make_response("Bookmarks list does not exist")
        error.status_code = 404
        return error
    
    list_dict = list.to_dict()
    if int(list_dict["user_id"]) != user["id"]:
        error = make_response("Only the creator of a booksmark list can edit a list")
        error.status_code = 401
        return error
    #--------------------------------------#  
    
    db.session.delete(list)    
    db.session.commit()
    return (f"Successfully deleted bookmarks list #: {list_dict['id']}")
    