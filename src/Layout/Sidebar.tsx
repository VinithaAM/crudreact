import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, styled } from "@mui/material";
import theme from "../theme";
import  { useState } from "react";

const Sidebar = ({drawerOnClose}:any) => {
  const [open, setOpen] = useState(false);
  const settings = ["Location", "Dashboard", "Logout"];
 
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));
  return (
    <div>
     
          <DrawerHeader style={{ backgroundColor: "primary.main" }}>
            <IconButton
              onClick={drawerOnClose}
              style={{ color: "#ffffff" }}
            >
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <List>
            {settings.map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton //onClick={() => handleNavigation(text)}
                >
                  <ListItemText primary={text} color="#ffffff" />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
     
    </div>
  )
}

export default Sidebar
