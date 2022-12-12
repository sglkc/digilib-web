import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from './Axios';

export default function Authenticate({ children }) {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!document.cookie.length) return navigate('/login');

    Axios
      .get('/user')
      .then(() => setAuth(true))
      .catch(() => navigate('/login'));
  }, []);

  return (
    <>
      { auth && children }
    </>
  );
}
