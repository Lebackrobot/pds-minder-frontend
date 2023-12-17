import csv

def select_usuarios():
    with open('api/database/table_usuario.csv', newline='', encoding='utf-8') as file:
        reader = csv.reader(file)
        next(reader)

        return [{
            'id': row[0],
            'username': row[1],
            'password': row[2],
            'email': row[3],
            'phoneNumber': row[4],
            'nome': row[5]
        } for row in reader]


def commit_usuario(usuario):
    id_usuario = 1

    with open('api/database/table_usuario.csv', newline='', encoding='utf-8') as file:
        reader = csv.reader(file)
        next(reader)

        for row in reader:
            id_usuario += 1

    with open('api/database/table_usuario.csv', mode='a', newline='') as file:
        writer = csv.writer(file)

        writer.writerow([
            id_usuario,
            usuario['username'], 
            usuario['password'], 
            usuario['email'], 
            usuario['phone'], 
            usuario['name']
        ])

        return {
            id_usuario,
            usuario['username'],
            usuario['password'],
            usuario['email'],
            usuario['phone'],
            usuario['name']
        }
