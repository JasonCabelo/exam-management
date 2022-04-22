import { useState,useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom'
import './RegisterScreen.css';

const RegisterScreen = () => {
    const history = useNavigate();
    const [fName, setFname] = useState('');
    const [lName, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState(false);
    const[error, setError] = useState('');
    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            history('/login');
       } 
    },[history])
    const RegisterHandler = async (e) => {
        e.preventDefault();
        const config = {
            header: {
                "Content-Type": "application/json",
            }
        }
        if (password !== confirmPassword) {
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                setError("")
            }, 5000);
            return setError("Password did Not Match");
        }
        try {
            const { data } = await axios.post("api/auth/register", { fName, lName, email, password, role },config);
            localStorage.setItem("authToken", data.token);
            history("/login");
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    }
    return (
        <div className="register-screen">
            <form className="register-screen__form " onSubmit={RegisterHandler}>
                <h3 className="register-screen__title">
                    Register Here
                </h3>
                {error && <span className="error-message">{error}</span>}
                <div className="form-group">
                    <div className="form-group">
                    <label htmlFor="fname">First Name</label>
                    <input type="text" name="fname" id="fname" placeholder="Enter First Name" value={fName}
                    onChange={(e) => setFname(e.target.value)} required />
                    </div>
                    <div className="form-group">
                    <label htmlFor="lname">Last Name</label>
                    <input type="text" name="lname" id="lname"
                    placeholder="Enter Last Name" value={lName}
                    onChange={(e) => setLname(e.target.value)} required />
                    </div>
                    <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email"
                    placeholder="Enter Email Address" value={email}
                    onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                    <label htmlFor="pass">Password</label>
                    <input type="password" name="pass" id="pass"
                    placeholder="Enter Password" value={password}
                    onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="form-group">
                    <label htmlFor="confirmpass">Confirm Password</label>
                    <input type="password" name="confirmpass" id="confirmpass"
                    placeholder="Confirm Password" value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>
                    <label htmlFor="role">Role</label>
                    <div className="form-check form-check-inline">
                    
                        <label className="form-check-label">
                            Student   
                        </label>
                            <input  type="radio" value="Student" name="role" id="role0" checked={role === "Student"} onChange={(e) => { setRole(e.target.value) }} required /> 
                        </div>
                    <div className="form-check form-check-inline">
                    <label className="form-check-label">
                            Teacher   
                        </label>
                        <input type="radio" value="Teacher" name="role" id="role1" checked={role === "Teacher"} onChange={(e) => { setRole(e.target.value) }} />

                    </div>
                </div>
                <button type="submit" className="btn btn-primary">
                    Register
                </button>
                <span className="register-screen__subtext">Already Registered? <Link to ="/login"> Login</Link> </span>
            </form>
        </div>
    );
}
export default RegisterScreen