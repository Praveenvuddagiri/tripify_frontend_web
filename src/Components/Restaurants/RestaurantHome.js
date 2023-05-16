import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddRestaurant from './AddRestaurant';
import AllRestaurants from './AllRestaurants';
import UpdateRestaurant from './UpdateRestaurant';
import ViewRestaurant from './ViewRestaurant';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function RestaurantHome() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const jumpToTab = (index) => {
    setValue(index);
  }


  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Restaurants" {...a11yProps(0)} />
          <Tab label="Add Restaurant" {...a11yProps(1)} />
          <Tab label="Update Restaurant" {...a11yProps(2)} />
          <Tab label="View Restaurant" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <AllRestaurants jumpToTab={jumpToTab} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AddRestaurant />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <UpdateRestaurant jumpToTab={jumpToTab}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ViewRestaurant jumpToTab={jumpToTab}/>
      </TabPanel>
    </Box>
  );
}
