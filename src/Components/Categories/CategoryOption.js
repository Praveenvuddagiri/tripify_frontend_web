import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@mui/material';


const CategoryOption = () => {
const navigate = useNavigate();
return (
<Box m={3}>
<Typography variant="h4" align="center" gutterBottom>
Choose an Action
</Typography>
<Grid container spacing={3}>
<Grid item xs={12} sm={4}>
<Box boxShadow={2}>
<Button onClick={ () => navigate('/AddCategoryForm')}
           variant="contained"
           color="primary"
           fullWidth
         >
Add Category
</Button>
</Box>
</Grid>
<Grid item xs={12} sm={4}>
<Box boxShadow={2}>
<Button
           component={Link}
           to="/update-category"
           variant="contained"
           color="secondary"
           fullWidth
         >
Update Category
</Button>
</Box>
</Grid>
<Grid item xs={12} sm={4}>
<Box boxShadow={2}>
<Button
           component={Link}
           to="/delete-category"
           variant="contained"
           color="error"
           fullWidth
         >
Delete Category
</Button>
</Box>
</Grid>
</Grid>
</Box>
);
};

export default CategoryOption;