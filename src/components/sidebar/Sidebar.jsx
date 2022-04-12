import React from "react";
import "./sidebar.css";
import { useSelector } from "react-redux";
import Divider from "@mui/material/Divider";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import ApiIcon from "@mui/icons-material/Api";
import SecurityIcon from "@mui/icons-material/Security";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const { isSidebar } = useSelector((state) => state.sideBarReducer);

  const val = isSidebar ? "none" : "flex";
  const goToDashboardPage = () => {
    navigate("/");
  };
  const goToServicePage = () => {
    navigate("/services");
  };
  const goToEndpointPage = () => {
    navigate("/endpoint");
  };

  return (
    <div style={{ display: val }} className="sidebar_container">
      <List component="nav" aria-label="mailbox folders" sx={{ flex: 1 }}>
        <ListItem disablePadding onClick={goToDashboardPage}>
          <ListItemButton>
            <ListItemIcon>
              <DashboardCustomizeIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <Divider />

        <ListItem disablePadding onClick={goToServicePage}>
          <ListItemButton>
            <ListItemIcon>
              <ApiIcon />
            </ListItemIcon>
            <ListItemText primary="Service Config" />
          </ListItemButton>
        </ListItem>
        <Divider />

        <ListItem disablePadding onClick={goToEndpointPage}>
          <ListItemButton>
            <ListItemIcon>
              <SecurityIcon />
            </ListItemIcon>
            <ListItemText primary="Endpoint" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <MiscellaneousServicesIcon />
            </ListItemIcon>
            <ListItemText primary="Services" />
          </ListItemButton>
        </ListItem>

        <Divider />
      </List>
    </div>
  );
};

export default Sidebar;
