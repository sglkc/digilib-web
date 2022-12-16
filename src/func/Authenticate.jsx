import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Axios from './Axios';
import { setUser } from '@/store/UserReducer';

export default function Authenticate({ children, auth }) {
  const [allow, setAllow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function redirect() {
    localStorage.removeItem('digilib');

    if (auth) setAllow(true);
    else navigate('/login');
  }

  useEffect(() => {
    if (!document.cookie.length) return redirect();

    Axios
      .get('/user')
      .then((res) => {
        dispatch(setUser({ ...res.data.result }));

        if (auth) navigate('/');
        else setAllow(true);
      })
      .catch(redirect);
  }, []);

  return (
    <>
      { allow && children }
    </>
  );
}
