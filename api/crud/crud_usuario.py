from api.database.table_usuario import select_usuarios, commit_usuario

class CRUDusuario:
    @staticmethod
    def get_usuarios():
        return select_usuarios()


    @staticmethod
    def get_by_username(username: str):
        usuarios = select_usuarios()

        for usuario_db in usuarios:
            if usuario_db['username'] == username:
                return usuario_db
            

    @staticmethod
    def get_by_email(username: str):
        usuarios = select_usuarios()

        for usuario_db in usuarios:
            if usuario_db['email'] == username:
                return usuario_db


    @staticmethod
    def create(usuario: dict):
        commit_usuario(usuario=usuario)
        return usuario 

crud_usuario = CRUDusuario()