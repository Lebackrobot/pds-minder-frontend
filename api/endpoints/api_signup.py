import hashlib
from flask import Blueprint, request
from api.crud.crud_usuario import crud_usuario


signup_usuario_bp = Blueprint('signup_usuario', __name__)

@signup_usuario_bp.route('/', methods=['POST'])
def post_signup():
    payload = request.get_json()
    
    usuario_username = crud_usuario.get_by_username(payload.get('username'))
    usuario_email = crud_usuario.get_by_email(payload.get('email'))

    if usuario_username:
        return {'erro': False, 'message': 'usuario existente'}
    
    if usuario_email:
        return {'erro': False, 'message': 'email existente'}

    return crud_usuario.create(usuario={
        'email': payload.get('email'),
        'username': payload.get('username'),
        'password': hashlib.sha256(payload.get('password').encode('utf-8')).hexdigest(),
        'phone': payload.get('email'),
        'name': payload.get('name')
    })
