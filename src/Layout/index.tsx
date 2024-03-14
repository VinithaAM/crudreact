import { Box } from "@mui/material"
import Footer from "./Footer"
import Header from "./Header"

interface Layoutprops{
  children:React.ReactElement
}
const Layout = (props:Layoutprops) => {
  return (
    <Box >
      <Header />
      <Box style={{minHeight:"90vh",minWidth:"70vh"}}>
      {props.children}
      </Box>
      <Footer />
    </Box>
  )
}

export default Layout
