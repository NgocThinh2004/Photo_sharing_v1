import React from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Link,
} from "@mui/material";
import { useParams, Link as RouterLink } from "react-router-dom";
import models from "../../modelData/models";
import "./styles.css";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const { userId } = useParams();
  const photos = models.photoOfUserModel(userId);

  if (!photos || photos.length === 0) {
    return <Typography variant="body1">No photos found for this user.</Typography>;
  }

  return (
    <div className="user-photos">
      <Typography variant="h5" gutterBottom>
        Photos of {models.userModel(userId).first_name}
      </Typography>
      {photos.map((photo) => (
        <Card key={photo._id} sx={{ marginBottom: 4 }}>
          <CardMedia
            component="img"
            height="auto"
            image={`/images/${photo.file_name}`} // absolute path to public/images
            alt={`Photo ${photo._id}`}
          />
          <CardContent>
            <Typography variant="caption" color="text.secondary">
              Taken on: {new Date(photo.date_time).toLocaleString()}
            </Typography>

            {/* Hiển thị bình luận */}
            {photo.comments && photo.comments.length > 0 ? (
              <>
                <Divider sx={{ marginTop: 2, marginBottom: 1 }} />
                <Typography variant="subtitle2" gutterBottom>
                  Comments:
                </Typography>
                {photo.comments.map((comment) => (
                  <div key={comment._id} style={{ marginBottom: "8px" }}>
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
