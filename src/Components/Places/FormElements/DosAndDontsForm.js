import { Box, Button, FormGroup, Grid, TextField, Typography } from "@mui/material";

import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';


function DosAndDontsForm({ formValues, setFormValues, setError, handleClick }) {
    const handleDoChange = (event, index) => {
        const newDos = [...formValues.do_s];
        newDos[index] = event.target.value;
        setFormValues({ ...formValues, do_s: newDos });
    };

    const handleDontChange = (event, index) => {
        const newDonts = [...formValues.dont_s];
        newDonts[index] = event.target.value;
        setFormValues({ ...formValues, dont_s: newDonts });
    };

    const handleAddDo = () => {
        setFormValues({ ...formValues, do_s: [...formValues.do_s, ''] });
    };

    const handleAddDont = () => {
        setFormValues({ ...formValues, dont_s: [...formValues.dont_s, ''] });
    };

    const handleDoRemove = (index) => {
        const newDos = [...formValues.do_s];
        newDos.splice(index, 1);
        setFormValues({ ...formValues, do_s: newDos });
    };

    const handleDontRemove = (index) => {
        const newDonts = [...formValues.dont_s];
        newDonts.splice(index, 1);
        setFormValues({ ...formValues, dont_s: newDonts });
    };
    return (
        <Grid sx={{ mt: 4, ml: 2 }} sm={12}>
            <Typography variant="h6">Do's and Don'ts</Typography>
            <Grid container spacing={2} sm={12}>
                <Grid item xs={12} >
                    <FormGroup>
                        {formValues.do_s.map((doItem, index) => (
                            <Box
                                key={index}
                                sx={{ display: "flex", alignItems: "center", mt: 2 }}
                            >
                                <TextField
                                    fullWidth
                                    id={`do-${index}`}
                                    name={`do-${index}`}
                                    label={`Do ${index + 1}`}
                                    required
                                    value={doItem}
                                    onChange={(event) => handleDoChange(event, index)}
                                />
                                <Box sx={{ marginLeft: "1rem" }}>
                                    <Button
                                        variant="contained"
                                        onClick={() => handleDoRemove(index)}
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
                                onClick={handleAddDo}
                                startIcon={<AddCircleRoundedIcon />}
                            >
                                Add Do
                            </Button>
                        </Box>
                    </FormGroup>
                </Grid>
                <Grid item xs={12}>
                    <FormGroup>
                        {formValues.dont_s.map((dontItem, index) => (
                            <Box
                                key={index}
                                sx={{ display: "flex", alignItems: "center", mt: 2 }}
                            >
                                <TextField
                                    fullWidth
                                    id={`dont-${index}`}
                                    name={`dont-${index}`}
                                    label={`Don't ${index + 1}`}
                                    required
                                    value={dontItem}
                                    onChange={(event) => handleDontChange(event, index)}
                                />
                                <Box sx={{ marginLeft: "1rem" }}>
                                    <Button
                                        variant="contained"
                                        onClick={() => handleDontRemove(index)}
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
                                onClick={handleAddDont}
                                startIcon={<AddCircleRoundedIcon />}
                            >
                                Add Don't
                            </Button>
                        </Box>
                    </FormGroup>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default DosAndDontsForm;