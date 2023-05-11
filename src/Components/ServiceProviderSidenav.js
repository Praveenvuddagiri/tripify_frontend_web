import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HotelIcon from '@mui/icons-material/Hotel';
import CategoryIcon from '@mui/icons-material/Category';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import PeopleIcon from '@mui/icons-material/People';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FeedbackIcon from '@mui/icons-material/Feedback';
// import AnalyticsIcon from '@mui/icons-material/Analytics';
import Box from '@mui/material/Box';
import CategoryHome from './Categories/CategoryHome';
import IslandHome from './Islands/IslandHome';
import ServiceHome from './Services/ServiceHome';
import PlaceHome from './Places/PlaceHome';
import TouristListPage from './Tourists/TouristListPage';


const drawerWidth = 240;

const ServiceProviderSidenav = ({ selectedMenuItem, onMenuItemClick }) => {

    

    const renderBody = () => {
        switch (selectedMenuItem) {
        //   case 'analytics':
        //     return <analytics />;
           case 'Hotel':
             return <PlaceHome />; 
          case 'category':
            return <CategoryHome />;
           case 'Island':
             return <IslandHome />;
          case 'services':
            return <ServiceHome />;
          case 'tourists':
            return <TouristListPage />;
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
                        backgroundColor: '#ff9e1f',
                        color: '#fff',
                    },
                }}
            >
                <List>
                    {/* <ListItem button
                        selected={selectedMenuItem === 'analytics'}
                        onClick={() => onMenuItemClick('analyitcs')}
                        sx={{ '&:hover': { backgroundColor: '#2F3E62' } }}>
                        <ListItemIcon>
                            <AnalyticsIcon sx={{ color: '#fff' }} />
                        </ListItemIcon>
                        <ListItemText primary="Analytics" sx={{ color: '#fff' }} />
                    </ListItem> */}
                    <ListItem button selected={selectedMenuItem === 'Hotel'}
                        onClick={() => onMenuItemClick('Hotel')}
                        
                        sx={{ '&:hover': { backgroundColor: '#2F3E62' } }}>
                        <ListItemIcon>
                            <HotelIcon sx={{ color: '#fff' }} />
                        </ListItemIcon>
                        <ListItemText primary="Hotel" sx={{ color: '#fff' }} />
                    </ListItem>
                    <ListItem button selected={selectedMenuItem === 'category'}
                        onClick={() => onMenuItemClick('category')}
                        sx={{ '&:hover': { backgroundColor: '#2F3E62' } }}>
                        <ListItemIcon>
                            <CategoryIcon sx={{ color: '#fff' }} />
                        </ListItemIcon>
                        <ListItemText primary="Category" sx={{ color: '#fff' }} />
                    </ListItem>
                    <ListItem button selected={selectedMenuItem === 'Island'}
                        onClick={() => onMenuItemClick('Island')}
                        sx={{ '&:hover': { backgroundColor: '#2F3E62' } }}>
                        <ListItemIcon>
                            <BeachAccessIcon sx={{ color: '#fff' }} />
                        </ListItemIcon>
                        <ListItemText primary="Island" sx={{ color: '#fff' }} />
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

export default ServiceProviderSidenav;





