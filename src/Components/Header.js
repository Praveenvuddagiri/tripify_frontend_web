import { Button } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../State/StateProvider';

function Header() {
  const [{ user }] = useStateValue();
  const navigate = useNavigate();

  console.log(user);

  const userData = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login')
  }

  console.log(user);
  return (
    <div>Header

      {userData ?
        <Button onClick={handleLogout}>Logout</Button> :
        <div>
          <Button>Login</Button>
          <Button>Signup</Button>
        </div>
      }
    </div>
  )
}

export default Header