// import React, { useState } from 'react';
// import AddPlace from "./Places/AddPlace";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import PlaceIcon from "@mui/icons-material/Place";
import CategoryIcon from "@mui/icons-material/Category";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import HotelIcon from '@mui/icons-material/Hotel';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import RoomServiceIcon from "@mui/icons-material/RoomService";
import PeopleIcon from "@mui/icons-material/People";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Box from "@mui/material/Box";
import CategoryHome from "./Categories/CategoryHome";
import IslandHome from "./Islands/IslandHome";
import ServiceHome from "./Services/ServiceHome";
import PlaceHome from "./Places/PlaceHome";
import TouristListPage from "./Tourists/TouristListPage";
import ApprovalHome from "./Approvals/ApprovalHome";
import ServiceProviderListPage from "./ServiceProviders/ServiceProviderListPage";
import AdminHotelHome from "./AdminHotels/AdminHotelHome";
import TourOperatorHome from "./AdminTourOperators/AdminTourOperatorHome";
import AdminRestaurantHome from "./AdminRestraunts/AdminRestaurantHome";
import FeedbackIcon from '@mui/icons-material/Feedback';
import FeedbackListPage from "./Feedbacks/FeedbackListPage";

const drawerWidth = 240;

const AdminSidenav = ({ selectedMenuItem, onMenuItemClick }) => {
  const renderBody = () => {
    switch (selectedMenuItem) {
      case "Place":
        return <PlaceHome />;
      case "category":
        return <CategoryHome />;
      case "Island":
        return <IslandHome />;
      case "services":
        return <ServiceHome />;
      case "tourists":
        return <TouristListPage />;
      case "hotels":
        return <AdminHotelHome />;
      case "touroperators":
        return <TourOperatorHome />;
      case "restaurants":
        return <AdminRestaurantHome />;
      case "serviceProviders":
        return <ServiceProviderListPage />;
      case "approvals":
        return <ApprovalHome />;
      case "feedbacks":
        return <FeedbackListPage />;
      default:
        return null;
    }
  };

  return (
    <>
      <Drawer
        variant="permanent"
        anchor="left"
        open="true"
        ModalProps={{
          keepMounted: false,
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            display: "relative",
            marginTop: "64px",
            width: drawerWidth,
            backgroundColor: "#4dacff",
            color: "#fff",
          },
        }}
      >
        <List>
          <ListItem
            button
            selected={selectedMenuItem === "Place"}
            onClick={() => onMenuItemClick("Place")}
            sx={{ "&:hover": { backgroundColor: "#2F3E62" } }}
          >
            <ListItemIcon>
              <PlaceIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Place" sx={{ color: "#fff" }} />
          </ListItem>
          <ListItem
            button
            selected={selectedMenuItem === "category"}
            onClick={() => onMenuItemClick("category")}
            sx={{ "&:hover": { backgroundColor: "#2F3E62" } }}
          >
            <ListItemIcon>
              <CategoryIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Category" sx={{ color: "#fff" }} />
          </ListItem>
          <ListItem
            button
            selected={selectedMenuItem === "Island"}
            onClick={() => onMenuItemClick("Island")}
            sx={{ "&:hover": { backgroundColor: "#2F3E62" } }}
          >
            <ListItemIcon>
              <BeachAccessIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Island" sx={{ color: "#fff" }} />
          </ListItem>
          <ListItem
            button
            selected={selectedMenuItem === "services"}
            onClick={() => onMenuItemClick("services")}
            sx={{ "&:hover": { backgroundColor: "#2F3E62" } }}
          >
            <ListItemIcon>
              <RoomServiceIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Services" sx={{ color: "#fff" }} />
          </ListItem>
          <ListItem
            button
            selected={selectedMenuItem === "tourists"}
            onClick={() => onMenuItemClick("tourists")}
            sx={{ "&:hover": { backgroundColor: "#2F3E62" } }}
          >
            <ListItemIcon>
              <PeopleIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Tourists" sx={{ color: "#fff" }} />
          </ListItem>
          <ListItem
            button
            selected={selectedMenuItem === "serviceProviders"}
            onClick={() => onMenuItemClick("serviceProviders")}
            sx={{ "&:hover": { backgroundColor: "#2F3E62" } }}
          >
            <ListItemIcon>
              <SupervisorAccountIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Service Providers" sx={{ color: "#fff" }} />
          </ListItem>
          <ListItem
            button
            selected={selectedMenuItem === "hotels"}
            onClick={() => onMenuItemClick("hotels")}
            sx={{ "&:hover": { backgroundColor: "#2F3E62" } }}
          >
            <ListItemIcon>
              <HotelIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Hotels" sx={{ color: "#fff" }} />
          </ListItem>
          <ListItem
            button
            selected={selectedMenuItem === "touroperators"}
            onClick={() => onMenuItemClick("touroperators")}
            sx={{ "&:hover": { backgroundColor: "#2F3E62" } }}
          >
            <ListItemIcon>
              <TravelExploreIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Tour Operators" sx={{ color: "#fff" }} />
          </ListItem>
          <ListItem
            button
            selected={selectedMenuItem === "restaurants"}
            onClick={() => onMenuItemClick("restaurants")}
            sx={{ "&:hover": { backgroundColor: "#2F3E62" } }}
          >
            <ListItemIcon>
              <RestaurantIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Restaurants" sx={{ color: "#fff" }} />
          </ListItem>
          <ListItem
            button
            selected={selectedMenuItem === "approvals"}
            onClick={() => onMenuItemClick("approvals")}
            sx={{ "&:hover": { backgroundColor: "#2F3E62" } }}
          >
            <ListItemIcon>
              <CheckCircleIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Approvals" sx={{ color: "#fff" }} />
          </ListItem>
          <ListItem
            button
            selected={selectedMenuItem === "feedbacks"}
            onClick={() => onMenuItemClick("feedbacks")}
            sx={{ "&:hover": { backgroundColor: "#2F3E62" } }}
          >
            <ListItemIcon>
              <FeedbackIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Feedbacks" sx={{ color: "#fff" }} />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "64px" }}>
        {renderBody()}
      </Box>
    </>
  );
};

export default AdminSidenav;