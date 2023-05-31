import React, { useState } from 'react';
import { authService } from 'services/authService';
import { useAppDispatch } from 'store/hooks';
import { userActions } from 'store/slices';
import './AuthLayout.scss';

const AuthLayout = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const dispatch = useAppDispatch();
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await authService.login({ email, password: pass });
      dispatch(userActions.setIsAuth(true));
      dispatch(userActions.setUser(resp.data.user));
      dispatch(userActions.setAccessToken(resp.data.accessToken));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={submit}>
      <h1>Login</h1>
      <input value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input value={pass} placeholder="Pass" onChange={(e) => setPass(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AuthLayout;
