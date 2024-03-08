import Footer from "./Footer"
import Header from "./Header"

interface Layoutprops{
  children:React.ReactElement
}
const Layout = (props:Layoutprops) => {
  return (
    <div>
      <Header />
      {props.children}
      <Footer />
    </div>
  )
}

export default Layout
