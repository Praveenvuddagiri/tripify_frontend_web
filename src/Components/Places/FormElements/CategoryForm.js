import { Box, Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";

function CategoryForm({ formValues, setFormValues, setError, handleClick, categories }) {
    const handleCategoryChange = (event) => {
        const selectedCategoryId = event.target.value;
        setFormValues((prevFormValues) => {
          const updatedCategoryIds = prevFormValues.categories.includes(selectedCategoryId)
            ? prevFormValues.categories.filter((id) => id !== selectedCategoryId)
            : prevFormValues.categories.concat(selectedCategoryId);
          return {
            ...prevFormValues,
            categories: updatedCategoryIds,
          };
        });
      };
    
    return (
        <Box sx={{ mt: 2, ml: 2 }}>
            <Typography variant="h6">Categories</Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={12}>
                    {categories.map((category) => {
                        const isChecked = Array.isArray(formValues.categories) && formValues.categories.includes(category._id);
                        return (
                            <FormControlLabel
                                key={category._id}
                                control={
                                    <Checkbox
                                        name={category.name}
                                        checked={isChecked}
                                        onChange={handleCategoryChange}
                                        value={category._id}
                                    />
                                }
                                label={category.name}
                            />
                        );
                    })}
                </Grid>
            </Grid>
        </Box>
    );
}

export default CategoryForm;