import '../styles/globals.css'

//Components
import Navbar from '../components/Navbar';

const MyApp = ({ Component, pageProps }) => {
  return (
    <div>
      <Navbar>
        <Component {...pageProps} />
      </Navbar>
    </div>
  )
}

export default MyApp
