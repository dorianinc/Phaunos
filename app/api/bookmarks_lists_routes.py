from flask import Blueprint, request, make_response
from flask_login import login_required, current_user
from app.models import db, Bookmarks_List, Bookmark
from app.forms import BookmarksListForm

bookmarks_lists_routes = Blueprint("bookmarks_lists", __name__)


# -----------------------------helper function---------------------------------------#
def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[f"{field}"] = f"{error}"
    return errorMessages


# ------------------------------------------------------------------------------------#


@bookmarks_lists_routes.route("")
def get_users_bookmarks_lists():
    """Get all of users bookmarks lists"""
    user = current_user.to_dict()
    lists = Bookmarks_List.query.filter(Bookmarks_List.user_id == user["id"]).all()
    return [list.to_dict(includeBookmarks=True) for list in lists]


@bookmarks_lists_routes.route("/<int:list_id>")
def get_bookmarks_list_by_id(list_id):
    """Get single bookmarks lists by id"""
    user = current_user.to_dict()

    # ------------ validation -------------#
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
    # --------------------------------------#

    return list_dict


@bookmarks_lists_routes.route("", methods=["POST"])
@login_required
def create_bookmarks_list():
    """Create a bookmarks list"""
    user = current_user.to_dict()

    form = BookmarksListForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():

        data = form.data
        new_list = Bookmarks_List(title=data["title"], user_id=user["id"])
        print(f"new_list 👉 {new_list.to_dict()}")
        db.session.add(new_list)
        db.session.commit()
        return new_list.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400


@bookmarks_lists_routes.route("", methods=["PUT"])
def edit_bookmarks_list():
    """Edit a single bookmarks list"""
    user = current_user.to_dict()
    data = request.get_json()

    # ------------ validation -------------#
    list = Bookmarks_List.query.get(data["listId"])
    if not list:
        error = make_response("Bookmarks list does not exist")
        error.status_code = 404
        return error

    list_dict = list.to_dict(includeBookmarks=True)
    if int(list_dict["user_id"]) != user["id"]:
        error = make_response("Only the creator of a booksmark list can edit a list")
        error.status_code = 401
        return error
    # --------------------------------------#
    form = BookmarksListForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():

        data = form.data
        list.title = data["title"]
        db.session.commit()
        return list.to_dict()

    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@bookmarks_lists_routes.route("", methods=["DELETE"])
def delete_review():
    """Delete a single bookmarks list"""
    user = current_user.to_dict()
    data = request.get_json()
    # ------------ validation -------------#
    list = Bookmarks_List.query.get(data["listId"])
    if not list:
        error = make_response("Bookmarks list does not exist")
        error.status_code = 404
        return error

    list_dict = list.to_dict()
    if int(list_dict["user_id"]) != user["id"]:
        error = make_response("Only the creator of a booksmark list can edit a list")
        error.status_code = 401
        return error
    # --------------------------------------#

    db.session.delete(list)
    db.session.commit()
    res = make_response({"message": "Successfully deleted"})
    res.status_code = 200
    return res


@bookmarks_lists_routes.route("/bookmark", methods=["POST"])
@login_required
def create_a_bookmark():
    """ Add a bookmark  to a list """
    user = current_user.to_dict()
    data = request.get_json()
    list = Bookmarks_List.query.get(data["listId"])
    bookmarks = list.to_dict(includeBookmarks=True)["bookmarks"]
    for bookmark in bookmarks:
        if int(bookmark["trail_id"]) == int(data["trailId"]):
            error = make_response("Trail is already bookmarked in this list")
            error.status_code = 400
            return error

    new_bookmark = Bookmark(trail_id=data["trailId"], bookmarks_list_id=data["listId"])
    db.session.add(new_bookmark)
    db.session.commit()

    return new_bookmark.to_dict()
