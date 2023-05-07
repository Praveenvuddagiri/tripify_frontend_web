import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";

import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';

function EntryCostForm({ formValues, setFormValues, setError, handleClick }) {
    const handleEntryChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value === true ? true : false,
        }));
    };

    const handleEntryCostChange = (event, index) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => {
            const entry_cost = [...prevValues.entry_cost];

            if (name === 'cost') {
                console.log(value);
                if (isNaN(value)) {
                    let e = { errorType: "error", message: "The cost should be number type. Ref: index-" + index }
                    setError(e);
                    handleClick();
                    const entry_cost = [...prevValues.entry_cost];
                    entry_cost[index][name] = '';
                    return { ...prevValues, entry_cost: entry_cost };
                }
            }
            entry_cost[index][name] = value;
            return { ...prevValues, entry_cost: entry_cost };
        });
    };

    const handleAddEntryCost = () => {
        setFormValues((prevValues) => ({
            ...prevValues,
            entry_cost: [
                ...prevValues.entry_cost,
                { category: "", cost: "" }
            ],
        }));
    };

    const handleRemoveEntryCost = (index) => {
        setFormValues((prevValues) => {
            const entry_cost = [...prevValues.entry_cost];
            entry_cost.splice(index, 1);
            return { ...prevValues, entry_cost: entry_cost };
        });
    };
    return (
        <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center" }}>

                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="entry">Entry Paid</InputLabel>
                    <Select
                        labelId="entry"
                        id="entry"
                        name="entry"
                        label="Entry"
                        select
                        value={formValues.entry}
                        onChange={handleEntryChange}
                    >
                        <MenuItem value={false}>No</MenuItem>
                        <MenuItem value={true}>Yes</MenuItem>
                    </Select>
                </FormControl>
                {formValues.entry && (
                    <Box sx={{ marginLeft: "1rem" }}>
                        <Button
                            variant="contained"
                            onClick={handleAddEntryCost}
                            startIcon={<AddCircleRoundedIcon />}
                        >
                            Add Entry Cost
                        </Button>
                        {formValues.entry_cost.map((cost, index) => (
                            <Box key={index} sx={{ display: "flex", alignItems: "center", marginTop: '20px' }}>
                                <TextField
                                    name="category"
                                    label="Category"
                                    required
                                    value={cost.category}
                                    onChange={(event) => handleEntryCostChange(event, index)}
                                    sx={{ marginLeft: "1rem" }}
                                />
                                <TextField
                                    name="cost"
                                    label="Cost"
                                    value={cost.cost}
                                    required
                                    onChange={(event) => handleEntryCostChange(event, index)}
                                    sx={{ marginLeft: "1rem" }}
                                />
                                <Button
                                    variant="outlined"
                                    onClick={() => handleRemoveEntryCost(index)}
                                    startIcon={<RemoveCircleRoundedIcon />}
                                    sx={{ marginLeft: "1rem" }}
                                >
                                    Remove
                                </Button>
                            </Box>
                        ))}
                    </Box>
                )}
            </Box>
        </Grid>
    );
}

export default EntryCostForm;