import React, { useState } from 'react';
import CategoryList from './Categories/CategoryList';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import CategoryIcon from '@mui/icons-material/Category';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import PeopleIcon from '@mui/icons-material/People';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FeedbackIcon from '@mui/icons-material/Feedback';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import Box from '@mui/material/Box';


const drawerWidth = 240;

const AdminSidenav = ({ selectedMenuItem, onMenuItemClick }) => {

    

    const renderBody = () => {
        switch (selectedMenuItem) {
        //   case 'analytics':
        //     return <analytics />;
        //   case 'places':
        //     return <Places />;
          case 'categories':
            return <CategoryList />;
        //   case 'islands':
        //     return <Islands />;
        //   case 'services':
        //     return <Services />;
        //   case 'tourists':
        //     return <Tourists />;
        //   case 'serviceProviders':
        //     return <ServiceProviders />;
        //   case 'approvals':
        //     return <Approvals />;
        //   case 'feedbacks':
        //     return <Feedbacks />;
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
                        backgroundColor: '#4dacff',
                        color: '#fff',
                    },
                }}
            >
                <List>
                    <ListItem button
                        selected={selectedMenuItem === 'analytics'}
                        onClick={() => onMenuItemClick('analyitcs')}
                        sx={{ '&:hover': { backgroundColor: '#2F3E62' } }}>
                        <ListItemIcon>
                            <AnalyticsIcon sx={{ color: '#fff' }} />
                        </ListItemIcon>
                        <ListItemText primary="Analytics" sx={{ color: '#fff' }} />
                    </ListItem>
                    <ListItem button selected={selectedMenuItem === 'places'}
                        onClick={() => onMenuItemClick('places')}
                        
                        sx={{ '&:hover': { backgroundColor: '#2F3E62' } }}>
                        <ListItemIcon>
                            <PlaceIcon sx={{ color: '#fff' }} />
                        </ListItemIcon>
                        <ListItemText primary="Places" sx={{ color: '#fff' }} />
                    </ListItem>
                    <ListItem button selected={selectedMenuItem === 'categories'}
                        onClick={() => onMenuItemClick('categories')}
                        sx={{ '&:hover': { backgroundColor: '#2F3E62' } }}>
                        <ListItemIcon>
                            <CategoryIcon sx={{ color: '#fff' }} />
                        </ListItemIcon>
                        <ListItemText primary="Categories" sx={{ color: '#fff' }} />
                    </ListItem>
                    <ListItem button selected={selectedMenuItem === 'islands'}
                        onClick={() => onMenuItemClick('islands')}
                        sx={{ '&:hover': { backgroundColor: '#2F3E62' } }}>
                        <ListItemIcon>
                            <BeachAccessIcon sx={{ color: '#fff' }} />
                        </ListItemIcon>
                        <ListItemText primary="Islands" sx={{ color: '#fff' }} />
                    </ListItem>
                    <ListItem button selected={selectedMenuItem === 'services'}
                        onClick={() => onMenuItemClick('services')}
                        sx={{ '&:hover': { backgroundColor: '#2F3E62' } }}>
                        <ListItemIcon>
                            <RoomServiceIcon sx={{ color: '#fff' }} />
                        </ListItemIcon>
                        <ListItemText primary="Services" sx={{ color: '#fff' }} />
                    </ListItem>
                    <ListItem button selected={selectedMenuItem === 'tourists'}
                        onClick={() => onMenuItemClick('tourists')}

                        sx={{ '&:hover': { backgroundColor: '#2F3E62' } }}>
                        <ListItemIcon>
                            <PeopleIcon sx={{ color: '#fff' }} />
                        </ListItemIcon>
                        <ListItemText primary="Tourists" sx={{ color: '#fff' }} />
                    </ListItem>
                    <ListItem button selected={selectedMenuItem === 'serviceProviders'}
                        onClick={() => onMenuItemClick('serviceProviders')}

                        sx={{ '&:hover': { backgroundColor: '#2F3E62' } }}>
                        <ListItemIcon>
                            <SupervisorAccountIcon sx={{ color: '#fff' }} />
                        </ListItemIcon>
                        <ListItemText primary="Service Providers" sx={{ color: '#fff' }} />
                    </ListItem>
                    <ListItem button selected={selectedMenuItem === 'approvals'}
                        onClick={() => onMenuItemClick('approvals')}
                        sx={{ '&:hover': { backgroundColor: '#2F3E62' } }}>
                        <ListItemIcon>
                            <CheckCircleIcon sx={{ color: '#fff' }} />
                        </ListItemIcon>
                        <ListItemText primary="Approvals" sx={{ color: '#fff' }} />
                    </ListItem>
                    <ListItem button selected={selectedMenuItem === 'feedbacks'}
                        onClick={() => onMenuItemClick('feedbacks')}
                        sx={{ '&:hover': { backgroundColor: '#2F3E62' } }}>
                        <ListItemIcon>
                            <FeedbackIcon sx={{ color: '#fff' }} />
                        </ListItemIcon>
                        <ListItemText primary="Feedbacks" sx={{ color: '#fff' }} />
                    </ListItem>
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '64px' }}>
               {renderBody()}
            </Box>
        </>
    );
};

export default AdminSidenav;






