import { Box, Button, Grid, TextField, Typography } from "@mui/material";

import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';


function ExternalLinksForm({ formValues, setFormValues, setError, handleClick }) {

    const handleExternalLinkChange = (event, index) => {
        const newLinks = [...formValues.external_links];
        newLinks[index][event.target.name] = event.target.value;
        setFormValues({ ...formValues, external_links: newLinks });
      };
    
      const handleAddExternalLink = () => {
        setFormValues({ ...formValues, external_links: [...formValues.external_links, { title: "", link: "" }] });
      };
    
      const handleRemoveExternalLink = (index) => {
        const newLinks = [...formValues.external_links];
        newLinks.splice(index, 1);
        setFormValues({ ...formValues, external_links: newLinks });
      };
    return (
        <Grid item xs={12} sm={12}>
            <Typography variant="h6" gutterBottom>
                External Links
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ ml: 2 }}>
                    <Button
                        variant="contained"
                        onClick={handleAddExternalLink}
                        startIcon={<AddCircleRoundedIcon />}
                    >
                        Add External Link
                    </Button>
                    {formValues.external_links.map((link, index) => (
                        <Box key={index} sx={{ display: "flex", alignItems: "center", marginTop: '20px' }}>
                            <TextField
                                name="title"
                                label="Title"
                                required
                                value={link.title}
                                onChange={(event) => handleExternalLinkChange(event, index)}
                                sx={{ marginLeft: "1rem" }}
                            />
                            <TextField
                                name="link"
                                label="Link"
                                required
                                value={link.link}
                                onChange={(event) => handleExternalLinkChange(event, index)}
                                sx={{ marginLeft: "1rem" }}
                            />
                            <Button
                                variant="outlined"
                                onClick={() => handleRemoveExternalLink(index)}
                                startIcon={<RemoveCircleRoundedIcon />}
                                sx={{ marginLeft: "1rem" }}
                            >
                                Remove
                            </Button>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Grid>
    );
}

export default ExternalLinksForm;