import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { IconButton, List, ListItem, ListItemButton, ListItemText, styled } from "@mui/material";
import theme from "../theme";
import { useNavigate } from "react-router-dom";
import { ScreenDetails } from "../Routes/Urls";
import { startTransition } from "react";

const Sidebar = ({drawerOnClose}:any) => {
  const settings = ScreenDetails;
  const navigation=useNavigate()
 
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));
  const handleNavigation =(text:string)=>{
    startTransition(() => {
    navigation(text)
    
    })
  }
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
              <ListItem key={text.name} disablePadding>
                <ListItemButton onClick={() => handleNavigation(text.url)} >
                  <ListItemText primary={text.name} sx={{color: (theme) => theme.palette.warning.main }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
     
    </div>
  )
}

export default Sidebar
