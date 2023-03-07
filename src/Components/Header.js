import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../State/StateProvider';
import { AppBar, Toolbar, Typography, Button, Avatar } from '@mui/material';

function Header() {
  const [{ user }] = useStateValue();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const userData = JSON.parse(localStorage.getItem('user'));

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TRIPIFY
        </Typography>
        {userData ? (
          <>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>{userData.name} Dashboard</Typography>
            <Avatar src={user?.avatar} alt={user?.name} sx={{ marginLeft: 2 }} />
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={()=>{navigate("/login")}}>Login</Button>
            <Button color="inherit" onClick={()=>{navigate("/register")}}>Signup</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
