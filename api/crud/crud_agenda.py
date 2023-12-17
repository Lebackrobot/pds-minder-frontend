from api.database.table_agenda import select_agenda, commit_agenda


class CRUDAgenda:
    @staticmethod
    def get_agendas():
        return select_agenda()


    @staticmethod
    def get_agenda_by_id(id_service):
        
        agendas_db = select_agenda()
        agendas = []

        for agenda in agendas_db:
            if id_service == int(agenda['idServico']):
                agendas.append(agenda)
        
        return agendas
  
    
    @staticmethod
    def create(agenda: dict):
        commit_agenda(agenda=agenda)
        return agenda


crud_agenda = CRUDAgenda()
