import csv

def select_agenda():
    with open('api/database/table_agenda.csv', newline='', encoding='utf-8') as file:
        reader = csv.reader(file)
        next(reader)

        return [{
            'id': row[0],
            'idServico': row[1],
            'data': row[2],
            'hora': row[3],
        } for row in reader]


def commit_agenda(agenda: dict):
    id_agenda = 1

    with open('api/database/table_agenda.csv', newline='', encoding='utf-8') as file:
        reader = csv.reader(file)
        next(reader)

        for row in reader:
            id_agenda += 1

    with open('api/database/table_agenda.csv', mode='a', newline='') as file:
        writer = csv.writer(file)

        writer.writerow([
            id_agenda,
            agenda['id_service'],
            agenda['data'],
            agenda['hora']
        ])

        return {
            id_agenda,
            agenda['id_service'],
            agenda['data'],
            agenda['hora']
        }
