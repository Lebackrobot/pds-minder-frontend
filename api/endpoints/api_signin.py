from flask import Blueprint, jsonify, redirect, request, session
from api.crud.crud_usuario import crud_usuario

signin_usuario_bp = Blueprint('signin_usuario', __name__)


@signin_usuario_bp.route('/', methods=['GET'])
def get_signin():
    return redirect(location='/')


@signin_usuario_bp.route('/', methods=['POST'])
def post_signin():
    payload = request.get_json()

    username = payload.get('username')
    password = payload.get('password')

    usuario = crud_usuario.get_by_username(username)

    if not usuario or password != usuario['password']: 
        return { 'success': False, 'message': 'username ou password incorreto' }

    return { 'id': usuario['id'], 'username': usuario['username'] }

