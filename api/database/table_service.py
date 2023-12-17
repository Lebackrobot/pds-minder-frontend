import csv

def select_services():
    with open('api/database/table_service.csv', newline='', encoding='utf-8') as file:
        reader = csv.reader(file)
        next(reader)

        return [{
            'id': row[0],
            'master': row[1],
            'name': row[2],
            'email': row[3],
            'phoneNumber': row[4],
            'serviceTitle': row[5],
            'hourlyPrice': row[6]
        } for row in reader]


def commit_service(service: dict):
    id_service = 1

    with open('api/database/table_service.csv', newline='', encoding='utf-8') as file:
        reader = csv.reader(file)
        next(reader)

        for row in reader:
            id_service += 1

    with open('api/database/table_service.csv', mode='a', newline='') as file:
        writer = csv.writer(file)

        writer.writerow([
            id_service,
            service['master'],
            service['name'],
            service['email'],
            service['phone'],
            service['service_title'],
            service['hourly_price']
        ])

        return {
            id_service,
            service['master'],
            service['name'],
            service['email'],
            service['phone'],
            service['service_title'],
            service['hourly_price']
        }
