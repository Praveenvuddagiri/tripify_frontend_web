import { Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React from "react";
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";


const initialRoomState = {
    roomType: '',
    description: '',
    price: '',
    maxOccupancy: '',
    beds: {
        bedType: '',
        quantity: '',
    },
    amenities: [],
};


function RoomForm({ hotel, setHotel }) {
    const handleRoomChange = (event, index) => {
        const { name, value } = event.target;
        setHotel((prevHotel) => {
            const updatedRooms = [...prevHotel.rooms];
            updatedRooms[index][name] = value;
            return {
                ...prevHotel,
                rooms: updatedRooms,
            };
        });
    };

    const handleBedChange = (event, index) => {
        const { name, value } = event.target;
        setHotel((prevHotel) => {
            const updatedRooms = [...prevHotel.rooms];
            updatedRooms[index].beds[name] = value;
            return {
                ...prevHotel,
                rooms: updatedRooms,
            };
        });
    };

    const handleAddRoom = () => {
        setHotel((prevHotel) => ({
            ...prevHotel,
            rooms: [...prevHotel.rooms, initialRoomState],
        }));
    };

    const handleRemoveRoom = (index) => {
        setHotel((prevHotel) => {
            const updatedRooms = [...prevHotel.rooms];
            updatedRooms.splice(index, 1);
            return {
                ...prevHotel,
                rooms: updatedRooms,
            };
        });
    };

    const handleAmenitiesChange = (event, index) => {
        const { value } = event.target;
        setHotel((prevHotel) => {
            const updatedRooms = [...prevHotel.rooms];
            updatedRooms[index].amenities = value.split(',').map((amenity) => amenity.trim());
            return {
                ...prevHotel,
                rooms: updatedRooms,
            };
        });
    };
    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h6">Rooms</Typography>
            </Grid>
            {hotel.rooms && hotel.rooms.map((room, index) => (
                <React.Fragment key={index}>
                    <Grid item xs={12} sm={12}>
                        <h4>Room - {index+1}</h4>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel>Room Type</InputLabel>
                            <Select
                                name="roomType"
                                value={room.roomType}
                                onChange={(event) => handleRoomChange(event, index)}
                                required
                            >
                                <MenuItem value="Single Room">Single Room</MenuItem>
                                <MenuItem value="Twin Room">Twin Room</MenuItem>
                                <MenuItem value="Triple Room">Triple Room</MenuItem>
                                <MenuItem value="Family Room">Family Room</MenuItem>
                                <MenuItem value="Suite Room">Suite Room</MenuItem>
                                <MenuItem value="Deluxe Room">Deluxe Room</MenuItem>
                                <MenuItem value="Cottage">Cottage</MenuItem>
                                <MenuItem value="Dormitory Room">Dormitory Room</MenuItem>
                                <MenuItem value="Executive Suite">Executive Suite</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            name="price"
                            label="Price(Rs.) "
                            type="number"
                            value={room.price}
                            onChange={(event) => handleRoomChange(event, index)}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            name="maxOccupancy"
                            label="Max Occupancy"
                            value={room.maxOccupancy}
                            onChange={(event) => handleRoomChange(event, index)}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="description"
                            label="Description"
                            value={room.description}
                            onChange={(event) => handleRoomChange(event, index)}
                            fullWidth
                            rows={2}
                            multiline
                            required
                        />
                    </Grid>


                    <Grid item xs={12} sm={6}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel>Bed Type</InputLabel>
                            <Select

                                name="bedType"
                                value={room.beds.bedType}
                                onChange={(event) => handleBedChange(event, index)}
                                required
                            >
                                <MenuItem value="Single">Single</MenuItem>
                                <MenuItem value="Twin">Twin</MenuItem>
                                <MenuItem value="Double">Double</MenuItem>
                                <MenuItem value="Queen">Queen</MenuItem>
                                <MenuItem value="King">King</MenuItem>
                                <MenuItem value="Super King">Super King</MenuItem>
                                <MenuItem value="Bunk Bed">Bunk Bed</MenuItem>
                                <MenuItem value="Sofa Bed">Sofa Bed</MenuItem>
                                <MenuItem value="Futon">Futon</MenuItem>
                                <MenuItem value="Trundle Bed">Trundle Bed</MenuItem>
                                <MenuItem value="Murphy Bed">Murphy Bed</MenuItem>
                                <MenuItem value="Day Bed">Day Bed</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="number"
                            name="quantity"
                            label="Bed Quantity"
                            value={room.beds.quantity}
                            onChange={(event) => handleBedChange(event, index)}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <TextField
                            name="amenities"
                            label="Amenities"
                            value={room.amenities.join(', ')}
                            onChange={(event) => handleAmenitiesChange(event, index)}
                            fullWidth
                            helperText="Separate multiple amenities with commas(,)"
                        />
                    </Grid>

                    <Grid item xs={12} sm={3} mt={1}>
                        <Button
                            variant="contained"
                            onClick={() => handleRemoveRoom(index)}
                            startIcon={<RemoveCircleRoundedIcon />}
                        >
                            Remove Room
                        </Button>
                    </Grid>
                </React.Fragment>
            ))}
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    onClick={handleAddRoom}
                    startIcon={<AddCircleRoundedIcon />}
                >
                    Add Room
                </Button>
            </Grid>
        </>
    );
}

export default RoomForm;