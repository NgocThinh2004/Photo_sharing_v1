import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Link,
} from "@mui/material";
import { useParams, Link as RouterLink } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData"; // Hàm fetch bạn đã sửa
import "./styles.css";

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user info
    fetchModel(`/user/${userId}`)
      .then((data) => setUser(data))
      .catch((err) => {
        console.error("Failed to fetch user:", err);
        setError("Unable to load user.");
      });

    // Fetch photos
    fetchModel(`/photosOfUser/${userId}`)
      .then((data) => setPhotos(data))
      .catch((err) => {
        console.error("Failed to fetch photos:", err);
        setError("Unable to load photos.");
      });
  }, [userId]);

  if (error) {
    return <Typography variant="body1">{error}</Typography>;
  }

  if (!photos.length) {
    return <Typography variant="body1">No photos found for this user.</Typography>;
  }

  return (
    <div className="user-photos">
      <Typography variant="h5" gutterBottom>
        Photos of {user ? user.first_name : "Loading..."}
      </Typography>
      {photos.map((photo) => (
        <Card key={photo._id} sx={{ marginBottom: 4 }}>
          <CardMedia
            component="img"
            image={`/images/${photo.file_name}`}
            alt={`Photo ${photo._id}`}
          />
          <CardContent>
            <Typography variant="caption" color="text.secondary">
              Taken on: {new Date(photo.date_time).toLocaleString()}
            </Typography>

            {photo.comments?.length > 0 ? (
              <>
                <Divider sx={{ marginTop: 2, marginBottom: 1 }} />
                <Typography variant="subtitle2" gutterBottom>
                  Comments:
                </Typography>
                {photo.comments.map((comment, idx) => (
                  <div key={idx} style={{ marginBottom: "8px" }}>
                    <Typography variant="body2">
                      <Link component={RouterLink} to={`/users/${comment.user._id}`}>
                        {comment.user.first_name} {comment.user.last_name}
                      </Link>{" "}
                      ({new Date(comment.date_time).toLocaleString()}):
                    </Typography>
                    <Typography variant="body2" sx={{ marginLeft: 2 }}>
                      {comment.comment}
                    </Typography>
                  </div>
                ))}
              </>
            ) : (
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                No comments.
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UserPhotos;
