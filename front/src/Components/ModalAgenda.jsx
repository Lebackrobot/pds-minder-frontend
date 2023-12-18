// ModalAgenda.jsx
import React, { useContext, useState, useEffect } from 'react';
import { CounterContext } from './CounterContext';

const modalStyles = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const contentStyles = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '5px',
};

const ModalAgenda = ({ isOpen, onClose,id, title, senderName, contactInfo, itsmine }) => {
  const {setApagar} = useContext(CounterContext)

  const [newDate, setNewDate] = useState(getTodayDate()); // Inicializa com a data atual
  const [newHour, setNewHour] = useState(7); // Inicializa com 7 para limitar de 7 a 19
  const [appointments, setAppointments] = useState([{'data':'17/00','hora': '15/00'}]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const agendamentosResponse = await fetch('/attagendamento', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
        if (agendamentosResponse.ok) {
          const agendamentosData = await agendamentosResponse.json();
          setAppointments(agendamentosData);
        } else {
          console.error('Erro ao obter lista de agendamentos');
        }
      } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen && isLoading) {
      // Carrega os agendamentos apenas se o componente for aberto e ainda não foram carregados
      fetchAgendamentos();
    }
  }, [isOpen, isLoading, id, setAppointments]);
  
  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const handleAgendarServico = async () => {
    try {
      const response = await fetch('/agendarservico', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idServico: id,
          data: newDate,
          hora: newHour,
        }),
      });

      if (response.ok) {
        const agendamento = await response.json();
        setAppointments([...appointments, agendamento]);
        setNewDate(getTodayDate()); // Reseta para a data atual após adicionar
        setNewHour(7); // Reseta para 7 após adicionar
      } else {
        console.error('Erro ao agendar serviço');
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    }
  };

  const handleApagar = async () => {
    try {
      const response = await fetch('/apagarServico', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
  
      if (response.ok) {
        alert('Serviço apagado com sucesso');
        setApagar(id);
      } else {
        console.error('Erro ao apagar serviço');
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    }
  
    onClose();
  };

  const handleAddAppointment = () => {
    // Adicione validações adicionais conforme necessário
    if (newDate.trim() !== '' && newHour >= 7 && newHour <= 19) {
      const newAppointment = `${newDate} às ${newHour}:00`;
      setAppointments([...appointments, newAppointment]);
      setNewDate(getTodayDate()); // Reseta para a data atual após adicionar
      setNewHour(7); // Reseta para 7 após adicionar
    }
  };

  if (!isOpen) return null;

  return (
    <div style={modalStyles} onClick={onClose}>
      <div style={contentStyles} onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <p>{senderName}</p>
        <p>Informações de Contato: {contactInfo}</p>

        {/* Lista de agendamentos existentes */}
        <div>
          <h3>Agendamentos:</h3>
          <ul>
            {appointments.map((appointment, index) => (
              <li key={index}>{appointment.data} {appointment.hora}</li>
            ))}
          </ul>
        </div>

        {/* Formulário para adicionar novo agendamento */}
        <div>
          <h3>Novo Agendamento:</h3>
          <label>Data:</label>
          <input
            type="date"
            value={newDate}
            min={getTodayDate()}
            onChange={(e) => setNewDate(e.target.value)}
          />
          <label>Hora:</label>
          <input
            type="number"
            min="7"
            max="19"
            value={newHour}
            onChange={(e) => setNewHour(parseInt(e.target.value, 10))}
          />
          {itsmine? 
          <button style={{backgroundColor: "#f05353"}} onClick={handleApagar}>Apagar Serviço</button>:
          <button onClick={handleAgendarServico}> Adicionar Agendamento</button>
          }
          
        </div>

        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default ModalAgenda;
