import React, { createContext, useState } from 'react';

export const CounterContext = createContext();

export const CounterContextProvider = ({ children }) => {
  const [busca, setBusca] = useState('');
  const [apagar, setApagar] = useState('');
  const [meu, setMeu] = useState(false); // Corrigi a palavra False para false
  return (
    <CounterContext.Provider value={{ busca, setBusca, meu, setMeu, apagar, setApagar }}>
      {children}
    </CounterContext.Provider>
  );
};
