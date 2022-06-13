import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import "../Styles/auth.css";
import { AnimatePresence, motion } from "framer-motion";

const AuthPage = (props) => {
    const [loginShowing, setLoginShowing] = useState(true);



    return (
        <div className="auth-page">
        <AnimatePresence exitBeforeEnter>
            {loginShowing?
                    <motion.div 
                        key='login'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: 200, transition: { duration: 0.5 } }}
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
                    exit={{ opacity: 0, x: -200, transition: { duration: 0.5 } }}
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

    )
    
}

export default AuthPage;