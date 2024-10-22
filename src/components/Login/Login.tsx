import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('test@gmail.com');
  const [password, setPassword] = useState('1234');
  const navigate = useNavigate();
  const { user, login, isAuthenticated } = useAuth();
  const submitHandler = (e) => {
    e.preventDefault();
    if (email && password) login(email, password);
  };

  console.log(user);
  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <form action="" onSubmit={submitHandler} className="form">
        <div className="formControl">
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            name="email"
            id="email"
          />
        </div>
        <div className="formControl">
          <label htmlFor="password">password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            name="password"
            id="password"
          />
        </div>
        <div className="buttons">
          <button className="btn btn--primary">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
