import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";

function IslandForm({ formValues, setFormValues, setError, handleClick, islands }) {
    const handleIslandChange = (event) => {
        setFormValues((prevFormValues) => ({
          ...prevFormValues,
          island: event.target.value,
        }));
      };
    return (

        <Box sx={{ mt: 2, ml: 2 }}>
            <Typography variant="h6" sx={{ ml: 2 }}>Island</Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6}>
                    <FormControl variant="standard" sx={{ m: 2, minWidth: 200 }}>
                        <InputLabel id="island-label">Island</InputLabel>
                        <Select
                            labelId="island-label"
                            id="island"
                            name="island"
                            label="Island"
                            value={formValues.island}
                            onChange={handleIslandChange}
                        >
                            {islands.map((island) => (
                                <MenuItem key={island._id} value={island._id}>
                                    {island.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
    );
}

export default IslandForm;