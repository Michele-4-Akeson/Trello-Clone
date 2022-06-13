import React, { useState } from "react";
import { getToken, createProfile } from "../Actions/BackendActions";

const Register = (props) => {
    const [state, setState] = useState({"username": "", "password": "", "passwordConfirm": ""});
    const [registerMessage, setRegisterMessage] = useState("")

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (state.password !== state.passwordConfirm) {
            setRegisterMessage("password and confirmation password do not match")
            return
        }

        // Create profile
        
        const response = await createProfile(state.username, state.password);

        if (response.success){
            // Log profile in
            const tokenResult = await getToken(state.username, state.password);
            if (tokenResult) {
                // Put token in local storage
                props.setToken(tokenResult.token);
            }

        } else {
            setRegisterMessage("Username already taken")
        }

       
    }

    return (
        <div>
            <h1 className='heading_main auth-heading'>Register</h1>
            <h4>{registerMessage}</h4>
            <form onChange={handleChange} onSubmit={handleSubmit}>
                <label className='form-label'>Username</label>
                    <input className='form-input' type="text" name="username" value={state.username} required />
                <label className='form-label'>Password</label>
                    <input className='form-input' type="password" name="password" value={state.password} required />
                <label className='form-label'>Confirm Password</label>
                    <input className='form-input' type="password" name="passwordConfirm" value={state.passwordConfirm} required />
                <input className='btn-primary' type="submit" value="Register" />
            </form>
        </div>
    )
}
export default Register;