import Footer from "./Footer"
import Header from "./Header"

interface Layoutprops{
  children:React.ReactElement
}
const Layout = (props:Layoutprops) => {
  return (
    <div>
      <Header />
      <div style={{minHeight:"90vh"}}>
      {props.children}
      </div>
      
      <Footer />
    </div>
  )
}

export default Layout
