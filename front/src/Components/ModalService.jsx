import React, { useState } from 'react';

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  modal: {
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    zIndex: 3,
    maxWidth: '400px',
    width: '80%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  Label: {
    paddingTop: '10px',
    margin: '0 auto',
    minWidth: '200px',
    width: '80%',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    textAlign: 'left',
  },
  formInput: {
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  formButtons: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  formButton: {
    padding: '10px',
    width: '48%',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
  },
};

const ModalService = ({ onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [master, setMaster] = useState(parseInt(localStorage.getItem('user')));
    const [phoneNumber, setPhoneNumber] = useState('');
    const [serviceTitle, setServiceTitle] = useState('');
    const [hourlyPrice, setHourlyPrice] = useState('');
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      master,
      name,
      email,
      phoneNumber,
      serviceTitle,
      hourlyPrice,
    };

    try {
      const response = await fetch('/registerservice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Tratar a resposta do servidor, se necessário
        alert('Serviço registrado com sucesso!');
      } else {
        console.error('Erro ao registrar serviço');
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    }

    onClose();
  };

  return (
    <div style={styles.overlay} onClick={handleOverlayClick}>
      <div style={styles.modal}>
        <h2>Postar Serviço</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
          {/* Adicionei o campo do nome abaixo do campo do título */}
          <label style={styles.Label}>
            Nome:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>

          <label style={styles.Label}>
            Título do Serviço:
            <input type="text" value={serviceTitle} onChange={(e) => setServiceTitle(e.target.value)} />
          </label>

          <label style={styles.Label}>
            Email:
            <input type="email" placeholder='Exemplo@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>

          <label style={styles.Label}>
            Número de Celular:
            <input type="tel" placeholder='ddd 91234 5678' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </label>

          <label style={styles.Label}>
            Preço por Hora:
            <input type="number" value={hourlyPrice} onChange={(e) => setHourlyPrice(e.target.value)} />
          </label>

          <div className="buttons">
            <button onClick={onClose}>Fechar</button>
            <button type="submit">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalService;