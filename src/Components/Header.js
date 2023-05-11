import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../State/StateProvider';
import { AppBar, Toolbar, Typography, Button, Avatar, Tooltip, IconButton } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
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
        {userData ? (userData.role === 'admin' ?
          <>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>{userData.name} Dashboard</Typography>
            <Tooltip title="Admin" arrow>
              <IconButton color="inherit" sx={{ marginLeft: 2 }}>
                <AdminPanelSettingsIcon />
              </IconButton>
            </Tooltip>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>

          :
          <>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>{userData.name} Dashboard</Typography>
            <Tooltip title="Service Provider" arrow>
              <IconButton color="inherit" sx={{ marginLeft: 2 }}>
                <ManageAccountsIcon />
              </IconButton>
            </Tooltip>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => { navigate("/login") }}>Login</Button>
            <Button color="inherit" onClick={() => { navigate("/register") }}>Signup</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
