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
      setMessage('Registration failed');
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Register</h2>

      {message && <p style={{ color: 'red' }}>{message}</p>}

      <form onSubmit={handleRegister}>
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br /><br />

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}

export default Register;
