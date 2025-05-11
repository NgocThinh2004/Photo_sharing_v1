import './App.css';

import React from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, useLocation, useParams, useMatch } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import models from './modelData/models';
import UserComments from "./components/UserComments";

const MainLayout = () => {
  const location = useLocation();
  const matchUser = useMatch("/users/:userId");
  const matchPhotos = useMatch("/photos/:userId");
  const userId = matchUser?.params.userId || matchPhotos?.params.userId;

  let contextText = "";

  if (userId) {
    const viewedUser = models.userModel(userId);
    if (viewedUser) {
      if (location.pathname.includes("/photos/")) {
        contextText = `Photos of ${viewedUser.first_name} ${viewedUser.last_name}`;
      } else if (location.pathname.includes("/users/")) {
        contextText = `${viewedUser.first_name} ${viewedUser.last_name}`;
      }
    }
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TopBar contextText={contextText} />
        </Grid>
        <div className="main-topbar-buffer" />
        <Grid item sm={3}>
          <Paper className="main-grid-item">
            <UserList />
          </Paper>
        </Grid>
        <Grid item sm={9}>
          <Paper className="main-grid-item">
            <Routes>
              <Route path="/comments/:userId" element={<UserComments />} />
              <Route path="/users/:userId" element={<UserDetail />} />
              <Route path="/photos/:userId" element={<UserPhotos />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/" element={<Typography variant="h4">Welcome to PhotoShare!</Typography>} />
            </Routes>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

const App = (props) => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
