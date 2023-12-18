// MainContent.js
import React, { useState, useContext } from 'react';

import { CounterContext } from './CounterContext';
import ModalService from './ModalService';


const MainBusca = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const {setBusca} = useContext(CounterContext)
    const {meu, setMeu} = useContext(CounterContext)

    const handleSelect = () =>{
      setMeu(!meu)
      console.log(meu)
    } 

    const handleBusca = (e) =>{
      setBusca(e.target.value)
    };

    const handleOpenModal = () => {
      setModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setModalOpen(false);
    };
  
    return (
      <div style={styles.Container}>

        <div style={styles.searchContainer}>
          <span>Meus</span>
          <input style={styles.selectInput} onClick={handleSelect} type="checkbox" name="meusCards" id="meusCards" />
        </div>

        <div style={styles.searchContainer}>
          <input type="text" onChange={handleBusca} placeholder="Buscar serviços" style={styles.searchInput} />
        </div>
       
       
        <button  style={styles.postButton} onClick={handleOpenModal}>
          Postar Serviço
        </button>
        {modalOpen && <ModalService onClose={handleCloseModal} />}
        {/* Adicione mais elementos conforme necessário */}
      </div>
    );
};


const styles = {
  Container: {
    paddingTop: '20px',
    display: 'Flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchContainer: {
    marginLeft: '5%',
    paddingLeft: '20px',
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px',
  },
  searchInput: {
    padding: '8px',
    width: '300px',
  },
  selectInput: {
    padding: '5px',
    
  },
  postButton: {
    width: '150px',
    marginBottom: '50px',
    padding: '7px',
    marginLeft: '5%',
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default MainBusca;
