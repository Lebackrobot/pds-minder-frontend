from flask import Blueprint, render_template

index_bp = Blueprint('index', __name__)

# Redirect (React)
@index_bp.route('')
def hello_world():
    return render_template('index.html')

# Redirect (React)
@index_bp.route('/login')
def login():
    return render_template('index.html')
