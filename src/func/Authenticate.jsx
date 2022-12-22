import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Axios from './Axios';
import { setUser } from '@/store/UserReducer';

export default function Authenticate({ isAdmin, children, loggedIn }) {
  const [allow, setAllow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function redirect() {
    localStorage.removeItem('digilib');

    if (loggedIn) navigate('/login');
    else setAllow(true);
  }

  useEffect(() => {
    if (!document.cookie.length) return redirect();

    Axios
      .get('/user')
      .then((res) => {
        dispatch(setUser({ ...res.data.result }));

        if (isAdmin && res.data.result.is_admin) return setAllow(true);
        if (loggedIn) setAllow(true);
        else navigate('/')
      })
      .catch(redirect);
  }, []);

  return (
    <>
      { allow && children }
    </>
  );
}
