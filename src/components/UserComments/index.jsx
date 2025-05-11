import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function UserComments() {
  const { userId } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchModel(`/commentsOfUser/${userId}`)
      .then((data) => setComments(data))
      .catch((err) => console.error("Error fetching comments:", err));
  }, [userId]);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        All Comments by User
      </Typography>
      {comments.map((c, idx) => (
        <Card key={idx} sx={{ display: "flex", marginBottom: 2 }}>
          <CardMedia
            component="img"
            sx={{ width: 120 }}
            image={`/images/${c.file_name}`}
            alt="thumbnail"
          />
          <CardContent>
            <Typography variant="body2">
              {new Date(c.date_time).toLocaleString()}
            </Typography>
            <Typography variant="body1">{c.comment}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UserComments;
