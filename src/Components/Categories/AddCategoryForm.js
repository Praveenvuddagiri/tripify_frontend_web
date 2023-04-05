import React, { useState } from 'react';
import { Box, Button, Container, FormControl, Input, InputLabel, Paper, TextareaAutosize, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)({
  margin: 'auto',
  marginTop: '2rem',
  padding: '2rem',
  maxWidth: '600px',
});

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
});

const AddCategoryForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission here
    console.log(name, description, image);
  };

  return (
    <Container>
      <StyledPaper>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Add a Place
        </Typography>
        <form onSubmit={handleSubmit}>
          <StyledBox>
            <FormControl>
              <InputLabel htmlFor="name-input">Name</InputLabel>
              <Input id="name-input" value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="description-input">Description</InputLabel>
              <TextareaAutosize id="description-input" rowsMin={3} value={description} onChange={(e) => setDescription(e.target.value)} />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="image-input">Image URL</InputLabel>
              <Input id="image-input" value={image} onChange={(e) => setImage(e.target.value)} />
            </FormControl>
            <Button variant="contained" color="primary" type="submit">
              Add Place
            </Button>
          </StyledBox>
        </form>
      </StyledPaper>
    </Container>
  );
};

export default AddCategoryForm;

