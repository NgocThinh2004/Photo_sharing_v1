import React, { useEffect, useState } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@mui/material";
import { Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function UserList() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetchModel("/user/list")
      .then((data) => setUsers(data))
      .catch((err) => {
        console.error("Error fetching users:", err);
        setUsers([]); // fallback empty
      });
  }, []);

  if (users === null) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <List component="nav">
        {users.map((user) => (
          <React.Fragment key={user._id}>
            <ListItem button component={Link} to={`/users/${user._id}`}>
              <ListItemText primary={`${user.first_name} ${user.last_name}`} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserList;
