import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";

function BestTimeToVisitForm({ formValues, setFormValues, setError, handleClick }) {
    const handleBestTimeToVisitChange = (event) => {
        const { value, name } = event.target;
        const bestTimeToVisit = formValues.bestTimeToVisit;
        bestTimeToVisit[name] = value;
        setFormValues((prevValues) => ({
          ...prevValues,
          bestTimeToVisit
        }));
      };
    return (
        <Box sx={{ mt: 2, ml: 2 }}>
            <Typography variant="h6">Best Time To Visit</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <FormControl variant="standard" sx={{ m: 2, minWidth: 200 }}>
                        <InputLabel id="startMonth">Start Month</InputLabel>
                        <Select
                            labelId="startMonth"
                            id="startMonth"
                            name="startMonth"
                            label="Start Month"
                            select
                            value={formValues.bestTimeToVisit.startMonth}
                            onChange={handleBestTimeToVisitChange}
                        >
                            <MenuItem value="January">January</MenuItem>
                            <MenuItem value="February">February</MenuItem>
                            <MenuItem value="March">March</MenuItem>
                            <MenuItem value="April">April</MenuItem>
                            <MenuItem value="May">May</MenuItem>
                            <MenuItem value="June">June</MenuItem>
                            <MenuItem value="July">July</MenuItem>
                            <MenuItem value="August">August</MenuItem>
                            <MenuItem value="September">September</MenuItem>
                            <MenuItem value="October">October</MenuItem>
                            <MenuItem value="November">November</MenuItem>
                            <MenuItem value="December">December</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl variant="standard" sx={{ m: 2, minWidth: 200 }}>
                        <InputLabel id="endMonth">End Month</InputLabel>
                        <Select
                            labelId="endMonth"
                            id="endMonth"
                            name="endMonth"
                            label="End Month"
                            select
                            value={formValues.bestTimeToVisit.endMonth}
                            onChange={handleBestTimeToVisitChange}
                        >
                            <MenuItem value="January">January</MenuItem>
                            <MenuItem value="February">February</MenuItem>
                            <MenuItem value="March">March</MenuItem>
                            <MenuItem value="April">April</MenuItem>
                            <MenuItem value="May">May</MenuItem>
                            <MenuItem value="June">June</MenuItem>
                            <MenuItem value="July">July</MenuItem>
                            <MenuItem value="August">August</MenuItem>
                            <MenuItem value="September">September</MenuItem>
                            <MenuItem value="October">October</MenuItem>
                            <MenuItem value="November">November</MenuItem>
                            <MenuItem value="December">December</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
    );
}

export default BestTimeToVisitForm;