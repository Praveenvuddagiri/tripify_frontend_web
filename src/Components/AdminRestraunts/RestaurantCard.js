import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import axios from "axios";
import { baseAPI, deleteUpdateRestaurant } from "../../GlobalConstants";
import { LoadingButton } from "@mui/lab";

function RestaurantCard({ restaurant, setError, handleClick, fetchData, jumpToTab }) {
  const [deleteLoader, setDeletLoader] = React.useState(false);

  const handleDelete = async () => {
    try {
      setDeletLoader(true);
      await axios.delete(
        `${baseAPI}${deleteUpdateRestaurant}/${restaurant._id.toString()}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      let successAlert = {
        errorType: "success",
        message: "Restaurant has been successfully deleted",
      };

      setError(successAlert);
      handleClick();

      fetchData();
    } catch (error) {
      if (Math.floor(error.response.status / 100) === 5) {
        error.response.data.errorType = "warning";
      } else {
        error.response.data.errorType = "error";
      }

      setError(error.response.data);

      handleClick();
    } finally {
      setDeletLoader(false);
    }
  };

  const handleView = (e) => {
    e.preventDefault();
    localStorage.setItem("restaurant", JSON.stringify(restaurant));

    jumpToTab(1);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 100, width: 250 }}
        image={restaurant.images[0].secure_url}
        title={restaurant.images[0].id}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {restaurant.name}
        </Typography>
        <div style={{ height: "100px", overflow: "auto" }}>
          <Typography variant="body1" color="text.secondary">
            {restaurant.description}
          </Typography>
        </div>
      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: "space-evenly" }}>
        {restaurant.isApproved ? (
          <Typography variant="body1" style={{ color: "green" }}>
            <b>{"Approved"}</b>
          </Typography>
        ) : (
          <Typography variant="body1" style={{ color: "red" }}>
            <b>{"Unapproved"}</b>
          </Typography>
        )}

        <Button
          variant="contained"
          color="warning"
          endIcon={<RemoveRedEyeIcon />}
          size="small"
          onClick={handleView}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
}

export default RestaurantCard;
