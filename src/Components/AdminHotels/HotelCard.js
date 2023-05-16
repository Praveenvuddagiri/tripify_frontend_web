import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

function HotelCard({ hotel, setError, handleClick, fetchData, jumpToTab }) {
  const handleView = (e) => {
    e.preventDefault();
    localStorage.setItem("hotel", JSON.stringify(hotel));

    jumpToTab(3);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={hotel.images[0].secure_url}
        title={hotel.images[0].id}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {hotel.name}
        </Typography>
        <div style={{ height: "100px", overflow: "auto" }}>
          <Typography variant="body1" color="text.secondary">
            {hotel.description}
          </Typography>
        </div>
      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Button
          variant="contained"
          color="success"
          startIcon={<RemoveRedEyeIcon />}
          size="small"
          onClick={handleView}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
}

export default HotelCard;
