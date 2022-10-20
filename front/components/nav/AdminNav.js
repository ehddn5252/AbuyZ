// React
import React, { useState } from "react";

// MUI
import Link from "@mui/material/Link";
import PersonIcon from "@mui/icons-material/Person";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Grid from "@mui/material/Grid";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";

// StyledComponents
import styled from "@emotion/styled";

export default function AdminNav() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AdminNavContainer>
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={2}>
          <LogoLink href="/admin/dashboard">ITDA</LogoLink>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={3}>
          <UserDiv onClick={handleClick}>
            <PersonIcon sx={{ fontSize: "2rem", color: "white" }} />
            <UserName>권도건님</UserName>
            <KeyboardArrowDownIcon sx={{ fontSize: "2rem", color: "white" }} />
          </UserDiv>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: "center", vertical: "top" }}
            anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
          >
            <MenuItem>
              <ListItemIcon sx={{ marginRight: "1rem" }}>
                <Settings />
              </ListItemIcon>
              마이페이지
            </MenuItem>
            <MenuItem>
              <ListItemIcon sx={{ marginRight: "1rem" }}>
                <Logout />
              </ListItemIcon>
              로그아웃
            </MenuItem>
          </Menu>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </AdminNavContainer>
  );
}

const AdminNavContainer = styled.div`
  display: flex;
  background-color: #375176;
  padding: 1rem;
`;

const LogoLink = styled(Link)`
  font-weight: bold;
  font-size: 2rem;
  color: #e60012;
  text-decoration: none;
`;

const UserDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const UserName = styled.p`
  margin: 0;
  padding: 0;
  margin: 0.3rem;
  font-size: 1rem;
  color: white;
`;
