from flask import Blueprint, jsonify, redirect, request, session, abort

from api.crud.crud_agenda import crud_agenda

agenda_bp = Blueprint('agenda', __name__)


@agenda_bp.route('/<int:id_service>', methods=['GET'])
def get_agenda_by_id(id_service):
    return crud_agenda.get_agenda_by_id(id_service)


@agenda_bp.route('/', methods=['POST'])
def post_agenda():
    db_agendas = crud_agenda.get_agendas()
    payload = request.get_json()

    agenda = {
        'id_service': int(payload.get('idServico')),
        'data': payload.get('data'),
        'hora': payload.get('hora'),
    }

    # Validar horários de agendamentos
    for db_agenda in db_agendas:
        db_data = db_agenda['data']
        db_hora = int(db_agenda['hora'])

        data = agenda['data']
        hora = int(agenda['hora'])

        if (db_data, db_hora ) == (data, hora):
            abort(409)

    crud_agenda.create(agenda=agenda)
    return agenda
