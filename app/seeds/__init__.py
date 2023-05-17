from flask.cli import AppGroup
from .users_seeds import seed_users, undo_users
from .trails_seeds import seed_trails, undo_trails
from .bookmarks_list_seeds import seed_bookmarks_list, undo_bookmarks_list
from .bookmarks_seeds import seed_bookmarks, undo_bookmarks
from .reviews_seeds import seed_reviews, undo_reviews

from app.models.db import db, environment, SCHEMA

def create_seed_commands(app):
    # Creates a seed group to hold our commands
    # So we can type `flask seed --help`
    seed_commands = AppGroup('seed')


    # Creates the `flask seed all` command
    @seed_commands.command('all')
    def seed():
        if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
            undo_reviews(app)
            undo_bookmarks(app)
            undo_bookmarks_list(app)
            undo_trails(app)
            undo_users()
        seed_users()
        seed_trails(app)
        seed_bookmarks_list(app)
        seed_reviews(app)
        seed_bookmarks(app)
    # Add other seed functions here


    # Creates the `flask seed undo` command
    @seed_commands.command('undo')
    def undo():
        undo_reviews(app)
        undo_bookmarks(app)
        undo_bookmarks_list(app)
        undo_trails(app)
        undo_users()
    # Add other undo functions here
    return seed_commands
# pipenv run flask db init
# pipenv run flask db migrate
# pipenv run flask db upgrade
# pipenv run flask seed all

# pipenv run flask seed undo