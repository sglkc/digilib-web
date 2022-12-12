import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from './Axios';

export default function Unauthenticated({ children }) {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!document.cookie.length) return setAuth(true);

    Axios
      .get('/user')
      .then(() => navigate('/'))
      .catch(() => setAuth(true));
  }, []);

  return (
    <>
      { auth && children }
    </>
  );
}
