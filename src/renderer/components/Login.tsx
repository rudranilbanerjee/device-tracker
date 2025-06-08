import React, { useState } from 'react';
import { useLoginMutation } from '../features/auth/authApi';
import { useDispatch } from 'react-redux';
import { setAuth } from '../features/auth/authSlice';

export default function Login() {
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await login({ userId, password }).unwrap();
      dispatch(setAuth(response.token));
      // Navigate or initiate background logic
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div>
      <input value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="User ID" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleSubmit} disabled={isLoading}>Login</button>
    </div>
  );
}
