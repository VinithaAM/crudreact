import { AppBar, Box, Toolbar, Typography } from "@mui/material";

const Footer = () => {
  return (
    <div>
      <Box sx={{ flex: 1 }}>
        <AppBar position="relative" style={{ top: "auto", bottom: 0 }}>
          <Toolbar
            sx={{
              minHeight: 0,
              backgroundColor: (theme) => theme.palette.secondary.main,
            }}
          >
            <Box sx={{ flexGrow: 1, display: "flex" }}></Box>

            <Box sx={{ flexGrow: 1, display: "flex" }}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                color="#ffffff"
                sx={{
                  display: { sm: "block", mr: 1, margin: "6px" },
                }}
              >
                @copyrights
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Footer;
