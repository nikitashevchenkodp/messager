import React, { useState } from 'react';
import { useAppDispatch } from 'store/hooks';
import { authenticationActions } from 'store/slices/authentication';

const AuthenticationLayout = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(authenticationActions.loginStart({ email, password }));
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={submit}>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="text"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AuthenticationLayout;
