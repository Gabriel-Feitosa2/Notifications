import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import {
  Tooltip,
  Popper,
  Fade,
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Divider,
  Badge,
} from "@mui/material";
import axios from "axios";
import { Circle, NotificationsTexts, NotificationsWrapper } from "./style";

type notificationsTypes = {
  categort: string;
  content: string;
  id: string;
  recipientId: string;
};

function App() {
  const [notifications, setNotifications] = React.useState<
    notificationsTypes[]
  >([]);
  const [count, setCount] = React.useState<number>();

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  function Count() {
    axios
      .get(
        "http://localhost:3000/notifications/count/from/ac16b9b4-8854-4273-a47c-6fb5880a2f18"
      )
      .then(function (response) {
        setCount(response.data.count);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function Notifications() {
    axios
      .get(
        "http://localhost:3000/notifications/list/from/ac16b9b4-8854-4273-a47c-6fb5880a2f18"
      )
      .then(function (response) {
        setNotifications(response.data.notifications);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    Notifications();
    setOpen((previousOpen) => !previousOpen);
  };

  useEffect(() => {
    Count();
  }, []);

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  console.log(notifications);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Badge badgeContent={count} color="secondary">
              <Tooltip title="Notifications" onClick={handleClick}>
                <NotificationsIcon style={{ cursor: "pointer" }} />
              </Tooltip>
            </Badge>
            <PersonIcon sx={{ marginLeft: 15 }} />
            <Popper id={id} open={open} anchorEl={anchorEl} transition>
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Box sx={{ border: 1, bgcolor: "#212121" }}>
                    {notifications.map(
                      (notificationsData: notificationsTypes) => (
                        <NotificationsWrapper>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 15,
                            }}
                          >
                            <NotificationsTexts key={notificationsData.id}>
                              {notificationsData.content}
                            </NotificationsTexts>
                          </div>
                          <Divider sx={{ backgroundColor: "white" }} />
                        </NotificationsWrapper>
                      )
                    )}
                  </Box>
                </Fade>
              )}
            </Popper>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default App;
