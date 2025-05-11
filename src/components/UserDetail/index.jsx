import React, { useState, useEffect } from "react";
import { Typography, Link } from "@mui/material";
import { useParams, Link as RouterLink } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchModel(`/user/${userId}`)
      .then((data) => {
        setUser(data);
        setError(null);
      })
      .catch((err) => {
        console.error("Failed to fetch user:", err);
        setError("User not found or error fetching data.");
      });
  }, [userId]);

  if (error) {
    return <Typography variant="body1">{error}</Typography>;
  }

  if (!user) {
    return <Typography variant="body1">Loading...</Typography>;
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
