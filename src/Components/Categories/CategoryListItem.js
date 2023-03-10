import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CategoryUpdateModal from './CategoryUpdateModal';
import { Box } from '@mui/material';

const CategoryListItem = ({ category, onUpdate, onDelete }) => {
    const { id, name, description, image } = category;

    const [updatedData, setUpdatedData] = useState(category);
    const [modalOpen, setModalOpen] = useState(false);

    const handleUpdate = () => {
        setUpdatedData(category);
        setModalOpen(true);
    };

    const handleDelete = () => {
        onDelete(id);
    };

    const handleUpdateSubmit = (updatedCategory) => {
        onUpdate(updatedCategory);
        setModalOpen(false);
    };

    return (
        <Card>
            <CardMedia
                component="img"
                alt={name}
                height="200"
                image={image}
                title={name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {description}
                </Typography>
                <Box display="flex" justifyContent="space-between" sx={{marginTop: '10px'}}>
                    <Button variant="contained" color="primary" onClick={handleUpdate}>
                        Update
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleDelete}>
                        Delete
                    </Button>
                </Box>
            </CardContent>
            <CategoryUpdateModal
                category={updatedData}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleUpdateSubmit}
            />
        </Card>
    );
};

export default CategoryListItem;