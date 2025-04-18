import React from "react";
import { Typography, Link } from "@mui/material";
import { useParams, Link as RouterLink } from "react-router-dom"; 
import models from "../../modelData/models";
import "./styles.css";


function UserDetail() {
  const { userId } = useParams(); 
  const user = models.userModel(userId); 

  if (!user) {
    return <Typography variant="body1">User not found.</Typography>;
  }

  return (
    <div className="user-detail">
      <Typography variant="h5">
        {user.first_name} {user.last_name}
      </Typography>
      <Typography variant="body1">
        <strong>Occupation:</strong> {user.occupation}
      </Typography>
      <Typography variant="body1">
        <strong>Location:</strong> {user.location}
      </Typography>
      <Typography variant="body1">
        <strong>Description:</strong> {user.description}
      </Typography>
      <br />
      <Link component={RouterLink} to={`/photos/${user._id}`}>
        View Photos of {user.first_name}
      </Link>
    </div>
  );
}

export default UserDetail;
