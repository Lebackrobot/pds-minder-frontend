// Card.jsx
import React, { useEffect, useState } from 'react';
import ModalAgenda from './ModalAgenda'; 

const cardStyles = {
  width: '200px',
  height: '150px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  marginBottom: '10px',
  cursor: 'pointer',
  marginRight: '10px',
};

const styles = {
  card: {
    ...cardStyles,
  },
  header: {
    padding: '5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontWeight: 'bold',
  },
  senderName: {
    color: '#777',
  },
  expandedContent: {
    backgroundColor: '#eee',
    padding: '10px',
    borderTop: '1px solid #ccc',
  },
};

const Card = ({ id, master, title, senderName, phone, email }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  useEffect(()=>{
    
  })
  return (
    <div style={styles.card} onClick={handleCardClick}>
      <div style={styles.header}>
        <div style={styles.title}>{title}</div>
        <div style={styles.senderName}>{senderName}</div>
      </div>
      <div style={styles.expandedContent}>
        <p>Informações de Contato: {phone + ' ' + email}</p>
      </div>
      <ModalAgenda
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        id={id}
        title={title}
        senderName={senderName}
        contactInfo={phone  + ' ' +  email}
        itsmine = {master === parseInt(localStorage.getItem('user'))}
      />
    </div>
  );
};

export default Card;
