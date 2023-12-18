// Login.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate  } from "react-router-dom";
import { CounterContext } from '../../Components/CounterContext';
import './Login.css'; // Importa o arquivo CSS

const Login = () => {
  console.log(localStorage.getItem('user'))
  const navigate = useNavigate();

  // USE STORAGE
  const loginUser = (userData) => {
    // Salva as informações do usuário no localStorage
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // funcao que verificar login
  const isUserLoggedIn = () => {
      return localStorage.getItem('user') !== null;
  };
  

  // verificar login 
  useEffect(()=>{
    if (isUserLoggedIn()) navigate('/');
  })
  if (isUserLoggedIn()) navigate('/');


  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [register, setRegister] = useState({
    email: '',
    username: '',
    password: '',
    phone: '',
    name: '',
  });

  const handleTrocaRegister = () => {
    const form_login = document.querySelector(".login-container");
    const form_registro = document.querySelector(".register-container");
    console.log('aoba')
    if (form_login.classList.contains('disable')) {
        form_login.classList.remove('disable');
        form_registro.classList.add('disable');
    } else {
        form_registro.classList.remove('disable');
        form_login.classList.add('disable');
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleInputChangeregister = (e) => {
    const { name, value } = e.target;
    setRegister({
      ...register,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Enviar dados para o servidor na rota "/registrar"
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(register),
      });

      if (response.ok) {
        // Redirecionar para a página principal em caso de sucesso
        handleTrocaRegister();
      } else {
        // Limpar os campos em caso de falha
        setRegister({
          email: '',
          username: '',
          password: '',
          phone: '',
          name: '',
        });
        console.error('Erro ao registrar');
      }
    } catch (error) {
      console.error('Erro ao registrar', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // ******** MUDAR 
    //loginUser(1)
    //setlogin(formData.username)
    
    
    try {
      // Enviar dados para o servidor na rota "/logar"
      const response = await fetch('/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.id) {
          console.log(responseData)
          loginUser(responseData.id)
          navigate('/');
        } else {
          const erro = document.querySelector('.erro')
          erro.className = ''
          erro.textContent = 'Senha ou Login errado'

        }
      } else {
        // Limpar os campos de usuário e senha em caso de falha
        setFormData({
          username: '',
          password: '',
        });
        const erro = document.querySelector('.erro')
        erro.textContent = 'Senha ou Login errado'
        console.error('Erro ao fazer login');
      }
    } catch (error) {
      console.error('Erro ao fazer login', error);
    }
  };

  return (
    // parte de login
    <>

    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <label>
          <span>Usuário</span>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          <span>Senha</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        
        <p className='erro'></p>
        <button type="submit">Login</button>
        
        <a className='a' onClick={handleTrocaRegister}>Deseja fazer uma conta ?</a>
      </form>
    </div>

    <div className="register-container disable">
      <h2>Registro</h2>
      <form className="register-form" onSubmit={handleRegister}>
        <label>
          <span>E-mail</span>
          <input
            type="email"
            name="email"
            value={register.email}
            onChange={handleInputChangeregister}
            required
          />
        </label>
        <label>
          <span>Login</span>
          <input
            type="text"
            name="username"
            value={register.username}
            onChange={handleInputChangeregister}
            required
          />
        </label>
        <label>
          <span>Senha</span>
          <input
            type="password"
            name="password"
            value={register.password}
            onChange={handleInputChangeregister}
            required
          />
        </label>
        <label>
          <span>Celular</span>
          <input
            type="tel"
            name="phone"
            value={register.phone}
            onChange={handleInputChangeregister}
            required
          />
        </label>
        <label>
          <span>Nome</span>
          <input
            type="text"
            name="name"
            value={register.name}
            onChange={handleInputChangeregister}
            required
          />
        </label>
        
        <button type="submit">Registrar</button>
        <a className='a' onClick={handleTrocaRegister}>Você já tem uma conta?</a>
      </form>
    </div>
    </>
  );
};

export default Login;
