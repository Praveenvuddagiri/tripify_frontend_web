import { Box, Button, FormGroup, Grid, TextField, Typography } from "@mui/material";

import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';

function ActivitiesForm({ formValues, setFormValues, setError, handleClick }) {
    const handleActivityChange = (event, index) => {
        const { value } = event.target;
        setFormValues((prevValues) => {
          const activities = [...prevValues.activities];
          activities[index] = value;
          return { ...prevValues, activities };
        });
      };
    
      const handleAddActivity = () => {
        setFormValues((prevValues) => ({
          ...prevValues,
          activities: [...prevValues.activities, ""],
        }));
      };
    
      const handleActivityRemove = (index) => {
        setFormValues((prevValues) => {
          const activities = [...prevValues.activities];
          activities.splice(index, 1);
          return { ...prevValues, activities };
        });
      };
    return (
        <Grid sx={{ mt: 4, ml: 2 }} sm={12}>
            <Typography variant="h6">Activities</Typography>
            <Grid container spacing={2} sm={12}>
                <Grid item xs={12} >
                    <FormGroup>
                        {formValues.activities.map((activity, index) => (
                            <Box
                                key={index}
                                sx={{ display: "flex", alignItems: "center", mt: 2 }}
                            >
                                <TextField
                                    fullWidth
                                    id={`activity-${index}`}
                                    name={`activity-${index}`}
                                    label={`Activity ${index + 1}`}
                                    required
                                    value={activity}
                                    onChange={(event) => handleActivityChange(event, index)}
                                />
                                <Box sx={{ marginLeft: "1rem" }}>
                                    <Button
                                        variant="contained"
                                        onClick={() => handleActivityRemove(index)}
                                        startIcon={<RemoveCircleRoundedIcon />}
                                    >
                                        Remove
                                    </Button>
                                </Box>
                            </Box>
                        ))}
                        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                            <Button
                                variant="contained"
                                onClick={handleAddActivity}
                                startIcon={<AddCircleRoundedIcon />}
                            >
                                Add Activity
                            </Button>
                        </Box>
                    </FormGroup>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ActivitiesForm;