from api.database.table_service import select_services, commit_service

class CRUDService:
    @staticmethod
    def get_services():
        return select_services()

    """ @staticmethod
    def get_by_username(username: str):
        usuarios = select_usuarios()

        for usuario_db in usuarios:
            if usuario_db['username'] == username:
                return usuario_db
     """        

    """ @staticmethod
    def get_by_email(username: str):
        usuarios = select_usuarios()

        for usuario_db in usuarios:
            if usuario_db['email'] == username:
                return usuario_db
 """

    @staticmethod
    def create(service: dict):
        commit_service(service=service)
        return service


crud_service = CRUDService()