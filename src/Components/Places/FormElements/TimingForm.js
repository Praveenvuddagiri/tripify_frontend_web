import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import React from "react";

function TimingForm({ formValues, setFormValues, setError, handleClick }) {
    // functions for timing part 
    const handleTimingChange = (event, day, timeType) => {
        const updatedTimings = formValues.timings.map((timing) => {
            if (timing.day === day) {
                return {
                    ...timing,
                    [timeType]: event.target.value,
                };
            }
            return timing;
        });

        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            timings: updatedTimings,
        }));
    };

    const generateTimeOptions = () => {
        const options = [];
        for (let i = 0; i < 24; i++) {
            const hour = i < 10 ? `0${i}` : i.toString();
            options.push(<MenuItem key={`hour-${hour}`} value={`${hour}:00`}>{`${hour}:00`}</MenuItem>);
        }
        return options;
    };

    const handleSameAsMonday = () => {
        var newTime = [];
        var open = formValues.timings[0].open_time;
        var close = formValues.timings[0].close_time;
        newTime = formValues.timings.map((time, index) => {
            if(index!==0){
                return {
                    day: time.day,
                    open_time: open,
                    close_time: close
                }
            }
        })

        newTime = [{day: 'Monday', open_time: open, close_time: close}, ...newTime]
        newTime.splice(1,1);

        setFormValues( (prevFormValues) =>({
            ...prevFormValues,
            timings: newTime
        }))

    }


    return (
        <Box sx={{ mt: 2, ml: 2 }}>
            <Typography variant="h6">Timings</Typography>

            <Grid container spacing={2} alignItems="center">
                {formValues.timings.map((timing) => (
                    <React.Fragment key={timing.day}>
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                                <InputLabel id={`${timing.day}-open_time-label`}>{timing.day} Open Time</InputLabel>
                                <Select
                                    labelId={`${timing.day}-open_time-label`}
                                    id={`${timing.day}-open_time`}
                                    name={`${timing.day}-open_time`}
                                    label={`${timing.day} Open Time`}
                                    value={timing.open_time}
                                    onChange={(event) => handleTimingChange(event, timing.day, 'open_time')}
                                >
                                    <MenuItem value="">None</MenuItem>
                                    {generateTimeOptions()}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                                <InputLabel id={`${timing.day}-close_time-label`}>{timing.day} Close Time</InputLabel>
                                <Select
                                    labelId={`${timing.day}-close_time-label`}
                                    id={`${timing.day}-close_time`}
                                    name={`${timing.day}-close_time`}
                                    label={`${timing.day} Close Time`}
                                    value={timing.close_time}
                                    onChange={(event) => handleTimingChange(event, timing.day, 'close_time')}
                                >
                                    <MenuItem value="">None</MenuItem>
                                    {generateTimeOptions()}
                                </Select>
                            </FormControl>
                        </Grid>

                        {
                        timing.day === "Monday"?
                        <Grid item xs={12} sm={10}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Button
                                    variant="outlined"
                                    onClick={handleSameAsMonday}
                                >
                                    Same as Monday
                                </Button>
                            </Box>
                            </Grid>
                            : <></>
                        }
                    </React.Fragment>

                ))
                }
            </Grid>
        </Box>
    );
}

export default TimingForm;