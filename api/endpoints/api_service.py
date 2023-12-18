from flask import Blueprint, jsonify, redirect, request, session

from api.crud.crud_usuario import crud_usuario
from api.crud.crud_service import crud_service

service_bp = Blueprint('service', __name__)

@service_bp.route('/', methods=['GET'])
def get_services():
    return crud_service.get_services()
    

@service_bp.route('/', methods=['POST'])
def post_service():
    payload = request.get_json()
    print(payload.get('master'))
    print(payload.get('name'))
    service = {
       'master': payload.get('master'),
       'name': payload.get('name'),
       'phone': payload.get('phoneNumber'),
       'service_title': payload.get('serviceTitle'),
       'hourly_price': payload.get('hourlyPrice'),
       'email': payload.get('email')
    }

    crud_service.create(service=service)
    return service


@service_bp.route('/', methods=['DELETE'])
def delete_service():

    # Recebe ID do serviço a ser excluído da lista
    print('entrei aqui')
    return
