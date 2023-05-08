import React, { useEffect, useState } from 'react';
import { Typography, Grid } from '@mui/material';
import { LocationOn, AccessTime, Link } from '@mui/icons-material';


const initialState = {
    name: '',
    description: '',
    entry: true,
    entry_cost: [
    ],
    location: {
        type: "Point",
        coordinates: [
            "",
            ""
        ]
    },
    address: { street: '', city: '', state: 'Andman and Nicobar Islands', zip: '', country: 'India' },
    island: '',
    activities: [],
    categories: [],
    external_links: [],
    timings: [
        { day: 'Monday', open_time: '', close_time: '' },
        { day: 'Tuesday', open_time: '', close_time: '' },
        { day: 'Wednesday', open_time: '', close_time: '' },
        { day: 'Thursday', open_time: '', close_time: '' },
        { day: 'Friday', open_time: '', close_time: '' },
        { day: 'Saturday', open_time: '', close_time: '' },
        { day: 'Sunday', open_time: '', close_time: '' },
    ],
    do_s: [],
    dont_s: [],
    images: [],
    howToReach: '',
    bestTimeToVisit: {
        startMonth: '',
        endMonth: ''
    }
}


const ViewPlace = ({jumpToTab}) => {
    const [formValues, setFormValues] = useState(initialState);

    useEffect(() => {
        if (!localStorage.getItem('place')) {
            jumpToTab(0);
        }
        else {
            var place = JSON.parse(localStorage.getItem('place'));
            if (!place.bestTimeToVisit) {
                place.bestTimeToVisit = {
                    startMonth: 'January',
                    endMonth: 'December'
                }
            }
            setFormValues(place)
        }
    }, [])

    return (
        <Grid container spacing={3}>
            {/* Description */}
            <Grid item xs={12}>
                <Typography variant="h5">{formValues.name}</Typography>
                <Typography variant="subtitle1" gutterBottom>
                    {formValues.description}
                </Typography>
            </Grid>

            {/* Address and Location */}
            <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                    <LocationOn fontSize="small" /> {formValues.address.street}, {formValues.address.city}, {formValues.address.state}, {formValues.address.country} - {formValues.address.zip}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    <strong>Latitude:</strong> {formValues.location.coordinates[1]}, <strong>Longitude:</strong> {formValues.location.coordinates[0]}
                </Typography>
            </Grid>

            {/* Timings */}
            <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                    <AccessTime fontSize="small" /> Timings:
                </Typography>
                <table>
                    <tbody>
                        {formValues.timings.map((timing) => (
                            <tr key={timing.day}>
                                <td>{timing.day}</td>
                                <td>{timing.open_time ? timing.open_time : 'Closed'}</td>
                                <td>-</td>
                                <td>{timing.close_time ? timing.close_time : 'Closed'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Grid>

            {/* External Links */}
            {formValues.external_links.length > 0 && (
                <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                        <Link fontSize="small" /> External Links:
                    </Typography>
                    <ul>
                        {formValues.external_links.map((link) => (
                            <li key={link._id}>
                                <a href={link.link} target="_blank" rel="noopener noreferrer">
                                    {link.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </Grid>
            )}

            {/* Images */}
            {formValues.images.length > 0 && (
                <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                        Images:
                    </Typography>
                    <div>
                        
                            {formValues.images.map((image) => (
                                <Grid item sm={3} key={image._id}>
                                    <img src={image.secure_url}  style={{width: '200px'}} />
                                </Grid>
                            ))}
                    </div>
                </Grid>
            )}
        </Grid>
    );
};

export default ViewPlace;
