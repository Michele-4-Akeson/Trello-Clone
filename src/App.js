
import { useLocalStorage } from "./CustomHooks/UseLocalStorage";
import { motion, AnimatePresence } from "framer-motion"
import {io} from "socket.io-client"
import { Home } from "./Home/Home";
import Auth from "./Authentication/AuthPage";

import "./Styles/app.css"
import "./Styles/auth.css"
import "./Styles/dashboard.css"
import "./Styles/board.css"
import "./Styles/dropdown.css"
import "./Styles/modal.css"
import "./Styles/navbar.css"
import "./Styles/messageLog.css"



const socket = io(process.env.REACT_BACKEND_URL || "https://my-trello-app-clone.herokuapp.com/" || "http://localhost:5000");

function App() {
  const [token, setToken] = useLocalStorage("token", null)


  function signOut(){
    localStorage.clear()
    setToken(null)
    
}

  return (

    <div className="App">
      <AnimatePresence exitBeforeEnter>
        {token?
          <Home token={token} signOut={signOut} socket={socket}/>:

          <motion.div
            key='authentication'
            initial={ false }
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}>
            <Auth setToken={setToken}/>
          </motion.div>

        }
      </AnimatePresence>
    
    </div>

    
     


   
  );
}

export default App;
