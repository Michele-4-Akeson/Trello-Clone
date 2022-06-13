import { useState } from "react";
import { useLocalStorage } from "./CustomHooks/UseLocalStorage";
import { motion, AnimatePresence } from "framer-motion"
import Auth from "./Authentication/AuthPage";
import { Home } from "./Home/Home";
import "./Styles/bigS.css"
import "./Styles/trelloBoard.css"
import {io} from "socket.io-client"
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'



const socket = io("http://localhost:5000");

function App() {
  const [token, setToken] = useLocalStorage("token", null)


  function signOut(){
    localStorage.clear()
    setToken(null)
    
}

  return (
    <DndProvider backend={HTML5Backend}>
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

    </DndProvider>
     


   
  );
}

export default App;
