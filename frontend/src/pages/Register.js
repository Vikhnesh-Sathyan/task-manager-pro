import React, { useState } from 'react';
import API from '../services/api';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', {
        name,
        email,
        password
      });

      alert('Registration successful! Please login.');
      window.location.href = '/login';
    } catch (err) {
      setMessage('Registration failed. Try another email.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Create Account</h2>

        {message && <p style={styles.error}>{message}</p>}

        <form onSubmit={handleRegister}>
          <input
            style={styles.input}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button style={styles.button} type="submit">
            Register
          </button>
        </form>

        <p style={styles.footerText}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;

/* 🔹 Styles */
const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #43cea2, #185a9d)',
    fontFamily: 'Arial'
  },
  card: {
    width: '380px',
    padding: '30px',
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
    textAlign: 'center'
  },
  heading: {
    marginBottom: '20px'
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    fontSize: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  button: {
    width: '100%',
    padding: '10px',
    background: '#43cea2',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer'
  },
  error: {
    color: 'red',
    marginBottom: '10px'
  },
  footerText: {
    marginTop: '15px',
    fontSize: '14px'
  }
};
