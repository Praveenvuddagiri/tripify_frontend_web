import React, { useState } from 'react';
import {
Box,
Button,
Grid,
TextField,
Typography,
TableContainer,
Table,
TableHead,
TableRow,
TableCell,
TableBody,
IconButton,
Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteIsland = () => {
const [islandName, setIslandName] = useState('');
const [islands, setIslands] = useState([]);

const handleSearch = () => {
// api fetch for getIslandDetails goes here
// update islands state with the response data
const sampleData = [
{
id: 1,
name: 'Island 1',
description: 'This is island 1',
},
{
id: 2,
name: 'Island 2',
description: 'This is island 2',
},
];
setIslands(sampleData);
};

const handleDelete = (id) => {
// api fetch for deleteIsland goes here
// remove the deleted island from islands state
setIslands(islands.filter((island) => island.id !== id));
};

return (
<Box m={3}>
<Typography variant="h4" align="center" gutterBottom>
Delete Island
</Typography>
<Box component="form">
<Grid container spacing={2}>
<Grid item xs={12}>
<TextField
fullWidth
label="Island Name"
variant="outlined"
required
value={islandName}
onChange={(e) => setIslandName(e.target.value)}
/>
</Grid>
<Grid item xs={12}>
<Button
           variant="contained"
           color="primary"
           onClick={handleSearch}
           disabled={!islandName}
           fullWidth
         >
Search
</Button>
</Grid>
</Grid>
</Box>
{islands.length > 0 && (
<TableContainer component={Paper} mt={3}>
<Table>
<TableHead>
<TableRow>
<TableCell>Island Name</TableCell>
<TableCell>Description</TableCell>
<TableCell>Action</TableCell>
</TableRow>
</TableHead>
<TableBody>
{islands.map((island) => (
<TableRow key={island.id}>
<TableCell>{island.name}</TableCell>
<TableCell>{island.description}</TableCell>
<TableCell>
<IconButton onClick={() => handleDelete(island.id)}>
<DeleteIcon />
</IconButton>
</TableCell>
</TableRow>
))}
</TableBody>
</Table>
</TableContainer>
)}
</Box>
);
};

export default DeleteIsland;