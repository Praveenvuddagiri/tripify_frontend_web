import React, { useState } from 'react';
import { Modal, TextField, Button } from '@mui/material';

const CategoryUpdateModal = ({ category, open, onClose, onSubmit }) => {
  const [name, setName] = useState(category ? category.name : '');
  const [description, setDescription] = useState(category ? category.description : '');
  const [image, setImage] = useState(category ? category.image : '');

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedCategory = {
      ...category,
      name,
      description,
      image,
    };
    onSubmit(updatedCategory);
  };

  const handleClose = () => {
    setName('');
    setDescription('');
    setImage('');
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', minWidth: '300px', maxWidth: '80vw' }}>
          <h2>Update Category</h2>
          <TextField label="Name" value={name} onChange={(event) => setName(event.target.value)} fullWidth margin="normal" required />
          <TextField label="Description" value={description} onChange={(event) => setDescription(event.target.value)} fullWidth margin="normal" required />
          <TextField label="Image URL" type='file' value={image} onChange={(event) => setImage(event.target.value)} fullWidth margin="normal" required />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <Button onClick={handleClose} color="secondary" style={{ marginRight: '10px' }}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">Save</Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default CategoryUpdateModal;
