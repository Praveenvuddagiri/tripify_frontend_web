import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HotelIcon from '@mui/icons-material/Hotel';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import Box from '@mui/material/Box';
import TourIcon from '@mui/icons-material/Tour';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HotelHome from './Hotels/HotelHome';
import TourOperatorHome from './TourOperators/TourOperatorHome';
import RestaurantHome from './Restaurants/RestaurantHome';

const drawerWidth = 240;

const ServiceProviderSidenav = ({ selectedMenuItem, onMenuItemClick }) => {

    

    const renderBody = () => {
        switch (selectedMenuItem) {
        //   case 'analytics':
        //     return <analytics />;
           case 'Hotel':
             return <HotelHome />; 
          case 'TourOperator':
            return <TourOperatorHome />;
           case 'Restaurant':
             return <RestaurantHome />;
          
          default:
            return null;
        }
      };


    return (
        <>

            <Drawer
                variant="permanent"
                anchor="left"
                open='true'
                ModalProps={{
                    keepMounted: false,
                  }}
                sx={{
                    
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        display: 'relative',
                        marginTop: '64px',
                        width: drawerWidth,
                        backgroundColor: '#D912EA ',
                        color: '#D912EA ',
                    },
                }}
            >
                <List>
                    <ListItem button selected={selectedMenuItem === 'Hotel'}
                        onClick={() => onMenuItemClick('Hotel')}
                        
                        sx={{ '&:hover': { backgroundColor: '#2F3E62' } }}>
                        <ListItemIcon>
                            <HotelIcon sx={{ color: '#fff' }} />
                        </ListItemIcon>
                        <ListItemText primary="Hotel" sx={{ color: '#fff' }} />
                    </ListItem>
                    <ListItem button selected={selectedMenuItem === 'TourOperator'}
                        onClick={() => onMenuItemClick('TourOperator')}
                        sx={{ '&:hover': { backgroundColor: '#2F3E62' } }}>
                        <ListItemIcon>
                            <TourIcon sx={{ color: '#fff' }} />
                        </ListItemIcon>
                        <ListItemText primary="Tour Operator" sx={{ color: '#fff' }} />
                    </ListItem>
                    <ListItem button selected={selectedMenuItem === 'Restaurant'}
                        onClick={() => onMenuItemClick('Restaurant')}
                        sx={{ '&:hover': { backgroundColor: '#2F3E62' } }}>
                        <ListItemIcon>
                            <RestaurantIcon sx={{ color: '#fff' }} />
                        </ListItemIcon>
                        <ListItemText primary="Restaurant" sx={{ color: '#fff' }} />
                    </ListItem>
                    
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '64px' }}>
               {renderBody()}
            </Box>
        </>
    );
};

export default ServiceProviderSidenav;






