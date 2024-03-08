import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import React from 'react'
import theme from '../theme'

const Footer = () => {
  return (
    <div>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ minHeight: 0, backgroundColor: (theme) => theme.palette.warning.main }}>
          <Box sx={{ flexGrow: 1, display: "flex" }} bgcolor={"theme.secondary"}>


          </Box>

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
  )
}

export default Footer
