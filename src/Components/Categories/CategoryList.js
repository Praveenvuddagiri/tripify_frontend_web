import React, { useState } from 'react';
import CategoryListItem from './CategoryListItem';
import Grid from '@mui/material/Grid';



const CategoryList = () => {
    const [categories, setCategories] = useState([
        {
          id: 1,
          name: 'Category 1',
          description: 'This is the first category',
          image: 'https://picsum.photos/id/237/200/300',
        },
        {
          id: 2,
          name: 'Category 2',
          description: 'This is the second category',
          image: 'https://picsum.photos/id/238/200/300',
        },
        {
          id: 3,
          name: 'Category 3',
          description: 'This is the third category',
          image: 'https://picsum.photos/id/239/200/300',
        },
        
      ]);
    const handleUpdate = updatedCategory => {
        const updatedCategories = categories.map(category =>
          category.id === updatedCategory.id ? updatedCategory : category
        );
        setCategories(updatedCategories);
      };
    
      const handleDelete = categoryId => {
        const updatedCategories = categories.filter(
          category => category.id !== categoryId
        );
        setCategories(updatedCategories);
      };
  return (
    <Grid container spacing={3}>
      {categories.map(category => (
        <Grid item xs={12} sm={6} md={4} key={category.id}>
          <CategoryListItem 
            category={category} 
            onUpdate={handleUpdate}
            onDelete={handleDelete} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoryList;
