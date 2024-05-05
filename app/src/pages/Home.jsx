import React from 'react';
import useAuth from '../hooks/auth';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  useAuth();

  const navigat = useNavigate()
  function removeCookie(name) {
    document.cookie = name + '=; Path=/;';
  }
  

  const logout = () => {
    removeCookie('email')
    removeCookie('exp')
    navigat('/sign')
  }

  return (<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
    <div>Welcome to the application.</div>
    <button style={{marginTop: '24px'}} onClick={logout}>Logout</button>
  </div>);
}
