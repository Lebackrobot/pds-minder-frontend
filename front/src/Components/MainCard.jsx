import React, { useState, useEffect, useRef, useContext } from 'react';
import { CounterContext } from './CounterContext';
import Card from './Card';

const MainCard = () => {
  const [activeCard, setActiveCard] = useState(null);

  const containerRef = useRef(null);

  const { busca, meu } = useContext(CounterContext);
  const { apagar, setApagar } = useContext(CounterContext);

  const [serviceData, setServiceData] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/allservices');
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setServiceData(data);
        } else {
          console.error('Erro ao obter serviços');
        }
      } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    if (apagar !== '') {
      setServiceData(serviceData.filter((service) => service.id !== apagar));
      setApagar('');
    }
  }, [apagar, setApagar, serviceData]);

  const filteredServiceData = serviceData.filter((service) => {
    const titleMatches = service.serviceTitle.toLowerCase().includes(busca.toLowerCase());

    if (meu) {
      const masterMatches = service.master === parseInt(localStorage.getItem('user'));
      return titleMatches && masterMatches;
    }

    return titleMatches;
  });

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (activeCard !== null && !event.target.closest(`[data-card-id="${activeCard}"]`) && !containerRef.current.contains(event.target)) {
        setActiveCard(null);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [activeCard]);

  return (
    <div style={styles.serviceCards} ref={containerRef}>
      {filteredServiceData.map((service) => (
        <Card
          key={service.id}
          master={service.master}
          id={service.id}
          title={service.serviceTitle}
          senderName={service.Name}
          email={service.email}
          phone={service.phoneNumber}
          activeCard={activeCard}
          setActiveCard={setActiveCard}
        />
      ))}
    </div>
  );
};

const styles = {
  serviceCards: {
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    maxWidth: '90%',
  },
};

export default MainCard;
