import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import style from './Login.module.scss';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Destructure setUserData from UserContext
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const url = 'http://localhost:4000/login';

    if (!email) {
      setError('Indtast din e-mail');
      return;
    }
    if (!password) {
      setError('Indtast dit password');
      return;
    }

    // Create URLSearchParams with username and password
    let body = new URLSearchParams();
    body.append('username', email);
    body.append('password', password);

    // Set options for the fetch request
    let options = {
      method: 'POST',
      body: body,
    };

    fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Forkert e-mail eller adgangskode');
        }
        return res.json();
      })
      .then((data) => {
        // Check if the access_token exists in the response
        if (data.access_token) {
          setUserData(data);
          setMessage(`Du er nu logget ind. Velkommen tilbage ${data.user.firstname}`);
          setError('');
          navigate('/login/reservations');
        } else {
          setError('Forkert e-mail eller adgangskode');
          setMessage('');
        }
      })
      .catch((err) => {
        setError(err.message || 'Der opstod en fejl');
        setMessage('');
      });
  };

  return (
    <div style={{ maxWidth: '500px', width: '80%', marginBottom: '12rem' }}>
      <p className={style.text}>Indtast dit brugernavn og adgangskode for at logge ind</p>
      <form onSubmit={handleLogin}>
        {message && <b style={{ color: 'green' }}>{message}</b>}
        <input
          type="email"
          placeholder="Brugernavn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            display: 'block',
            width: '90%',
            padding: '10px',
            margin: '10px 0',
            marginLeft: '5.5rem',
            borderRadius: '5px',
            border: '1px solid #ddd',
          }}
        />
        <input
          type="password"
          placeholder="Adgangskode"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            display: 'block',
            width: '90%',
            padding: '10px',
            margin: '10px 0 ',
            marginLeft: '5.5rem',
            borderRadius: '5px',
            border: '1px solid #ddd',
          }}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            marginLeft: '5.5rem',
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
        <button
          type="button"
          style={{
            padding: '10px 20px',
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          // onClick={() => {
          //   setEmail('');
          //   setPassword('');
          //   setError('');
          //   setMessage('');
          // }}
        >
          Annuller
        </button>
      </form>
    </div>
  );
};
