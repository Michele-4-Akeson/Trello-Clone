import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import "../Styles/auth.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { AnimatePresence, motion } from "framer-motion";

const AuthPage = (props) => {
    const [loginShowing, setLoginShowing] = useState(true);



    return (
        <div className="auth-page">
            <div className="left-auth">
                <img className="auth-page-image" src="https://blog.trello.com/hs-fs/Trello-For-Work--final.png"/>
            </div>
        
        <div className="right-auth">
            <div className='user-background'>
                <FontAwesomeIcon className='user-icon' icon={faUser}/>
            </div>
            <AnimatePresence exitBeforeEnter>
                {loginShowing?
                        <motion.div 
                            key='login'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, y: 200, transition: { duration: 0.35 } }}
                            transition={{ duration: 1 }}>
                        <Login setToken={props.setToken} />
                        <p className="auth-redirect">
                            Don't have an account? 
                            <a className="auth-link" onClick={() => setLoginShowing(false)}>Register</a>
                        </p>
                        </motion.div>
                : 
                        <motion.div 
                        key='register'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: 200, transition: { duration: 0.35 } }}
                        transition={{ duration: 1 }}>
                        <Register setToken={props.setToken} />
                        <p className="auth-redirect">
                            Already have an account? 
                            <a className="auth-link" onClick={() => setLoginShowing(true)}>Login</a>
                        </p>
                    </motion.div>

                }

                </AnimatePresence>
            </div>
            
        </div>

    )
    
}

export default AuthPage;