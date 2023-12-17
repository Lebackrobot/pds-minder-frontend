from flask import Flask

from api.endpoints.api_signin import signin_usuario_bp
from api.endpoints.api_signup import signup_usuario_bp
from api.endpoints.api_service import service_bp
from api.endpoints.api_agenda import agenda_bp
from api.endpoints.api_index import index_bp

app = Flask(__name__)

# Roteamento dos endpoints
app.register_blueprint(index_bp, url_prefix='/')
app.register_blueprint(signin_usuario_bp, url_prefix='/signin')
app.register_blueprint(signup_usuario_bp, url_prefix='/signup')
app.register_blueprint(service_bp, url_prefix='/services')
app.register_blueprint(agenda_bp, url_prefix='/agenda')


if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=4000)