// Header.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const logoutUser = () => {
      // Remove as informações do usuário do localStorage
      localStorage.removeItem('user');
      navigate('/login')
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    logoutUser()
    
    console.log('Logout realizado');
  };

  return (
    <header style={styles.header}>
      <div style={styles.logo}>Minder</div>
      <div style={styles.toggleButton} onClick={handleToggle}>
        ☰
      </div>
      {menuOpen && (
        <div style={styles.menu}>
          <div style={styles.btn} onClick={handleLogout}>Logout</div>
        </div>
      )}
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    background: '#333',
    color: '#fff',
  },
  logo: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    margin: '0 auto',
  },
  toggleButton: {
    cursor: 'pointer',
    fontSize: '1.5em',
  },
  menu: {
    position: 'absolute',
    top: '50px',
    right: '10px',
    background: '#fff',
    color: '#333',
    border: '1px solid #333',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
    zIndex: '1',
  },
  btn: {
    cursor: 'Pointer',
  }
};

export default Header;
