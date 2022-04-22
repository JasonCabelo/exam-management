import { useState, useEffect } from "react";
import axios from "axios";
import { Link,useNavigate } from 'react-router-dom'
import './LoginScreen.css';

const LoginScreen = () => {
    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            history('/login');
       } 
    },[history])
    const LoginHandler = async (e) => {
        e.preventDefault();
        const config = {
            header: {
                "Content-Type": "application/json",
            }
        }
        
        try {
            const { data } = await axios.post("api/auth/login", { email, password },
                config);
            localStorage.setItem("authToken", data.token)
            history("/");
        } catch (error) {
            console.log(error);
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    }
    return (
        <div className="login-screen">
            <form className="login-screen__form " onSubmit={LoginHandler}>
                <h3 className="login-screen__title">
                    Welcome
                </h3>
                {error && <span className="error-message">{error}</span>}
                <div className="form-group">
                   
                    <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email"
                    placeholder="Enter Email Address" value={email}
                            onChange={(e) => setEmail(e.target.value)} required      tabIndex={1}/>
                   
                    </div>
                    <div className="form-group">
                    <label htmlFor="pass">Password</label>
                    <input type="password" name="pass" id="pass"
                    placeholder="Enter Password" value={password}
                    onChange={(e) => setPassword(e.target.value)} required tabIndex={2}    />
                    </div>
                    <Link to="/forgotpassword"className="login-screen__forgotpassword" tabIndex={4}>
                        Forgot Password?
                    </Link>
                </div>
                <button type="submit" className="btn btn-primary" tabIndex={3}>
                    Login
                </button>
                <span className="login-screen__subtext">Do not Have an Account? <Link to ="/register"> Register</Link> </span>
            </form>
        </div>
    );
}
export default LoginScreen