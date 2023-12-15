from flask import Flask, render_template, jsonify, request

app = Flask(__name__)
lista = [
   {"id": 1, "master": 1, "serviceTitle": "Serviço 1", "Name": "João", "email": "joao@email.com", "phoneNumber": "(123) 456-7890"},
    {"id": 2, "master": 1, "serviceTitle": "Serviço 2", "Name": "Maria", "email": "maria@email.com", "phoneNumber": "(987) 654-3210"},
    {"id": 3, "master": 2, "serviceTitle": "Serviço 3", "Name": "Carlos", "email": "carlos@email.com", "phoneNumber": "(111) 222-3333"},
    {"id": 4, "master": 2, "serviceTitle": "Serviço 4", "Name": "Fernanda", "email": "fernanda@email.com", "phoneNumber": "(444) 555-6666"},
    {"id": 5, "master": 3, "serviceTitle": "Serviço 5", "Name": "Ana", "email": "ana@email.com", "phoneNumber": "(777) 888-9999"}
]


@app.route('/')
def hello_world():
    return render_template('index.html')


@app.route('/signin', methods=['POST'])
def login():
    """
    colocar funçao de verificação e voltar o id da conta
    in json {'username': '', 'password': ''}
    out json {'id': idconta}
    """
    
    print(request.get_json())
    return {'id': 1}


@app.route('/signup', methods=['POST'])
def register():
    '''
    ex de registro json 
    {   
        'email': 'exemplo@gmail.com', 
        'username': 'lopes', 
        'password': '123456', 
        'phone': '38912345678', 
        'name': 'Luiz Lopes'
    }
    verificar se pode fazer registro
    voltar tipo de erro ex: 'email já registrado'
    se não tiver erro volta {'erro': 'false'}
    '''
    print(request.get_json())
    return jsonify({'erro': 'false'})


@app.route('/registerservice', methods=['POST'])
def register__service():
    '''
    exemplo do que vai vim:
    {
        'master': '1',
        'Name': 'lopes',
        'email': 'exemplo@gmail.com', 
        'phoneNumber': '38 912345678', 
        'serviceTitle': 'frela', 
        'hourlyPrice': '20'
    }

    '''
    print(request.get_json())
    return jsonify({'erro': 'false'})


@app.route('/allservices', methods=['POST', 'GET'])
def services():
    print(jsonify(lista))
    return lista


@app.route('/apagarServico', methods=['POST', 'GET'])
def removerservico():
    '''
    recebe id de serviço a ser excluido da lista
    '''
    print(request.get_json())
    return 'apagou'


@app.route('/attagendamento', methods=['POST'])
def att():
    '''
    voltar valores agendados baseado no id do serviço
    '''
    print('1',request.get_json())
    return[{'data':'17/00','hora': '15/00'},{'data':'17/00','hora': '15/00'}]


@app.route('/agendarservico', methods=['POST'])
def agendar():
    '''
    salvar o agendamento pelo numero de id: 3 serv: [{data: 13, hora: 13}]
    '''
    print(request.get_json())
    return 'add'
    

if __name__ == '__main__':
    app.run(debug=True)
