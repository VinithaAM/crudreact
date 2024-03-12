import { AppBar, Box, Drawer, IconButton,  Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import MoreIcon from "@mui/icons-material/MoreVert";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from './Sidebar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigation=useNavigate()
  const logo = require("../assets/logo.jpg");
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const drawerOnClose = () => {
    setVisible(false);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleNavigation = (name:any) => {
    console.log(name)
    navigation("/");
    setAnchorElUser(null);
  };

  const drawerWidth = 240;
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ minHeight: 5, backgroundColor: (theme) => theme.palette.primary.main }}>
            <Box sx={{ flexGrow: 1, display: "flex" }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                edge="start"
                style={{ color: "#ffffff" }}
                sx={{ mr: 1 }}
                onClick={showDrawer}
              >
                <MenuIcon />
              </IconButton>

              <Typography
                variant="h6"
                noWrap
                component="div"
                color="#ffffff"
                sx={{
                  display: { sm: "block", mr: 1, margin: "6px" },
                }}
              >
                Menu
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1, display: "flex" }}>
              <img
                src={logo}
                style={{
                  maxWidth:50,
                  maxHeight:50,
                  position: "relative",
                  alignContent: "center",
                  justifyContent: "center",
                }}
                alt="logo"
              />
            </Box>
            <Box sx={{ display: { md: "flex" } }}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                style={{ color: "#ffffff" }}
                onClick={handleOpenUserMenu}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={() => handleNavigation("Logout")}>
                  <Typography textAlign="center">{"Logout"}</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton size="large" aria-label="show more" color="inherit">
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: (theme) => theme.palette.primary.main,
              color: (theme) => theme.palette.warning.main,
            },
          }}
          variant="persistent"
          anchor="left"
          open={visible}
        >
          <Sidebar drawerOnClose={drawerOnClose} />
          </Drawer>
      </Box>
      </div>
  );
}

export default Header;
