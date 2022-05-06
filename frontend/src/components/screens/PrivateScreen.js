import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const PrivateScreen = () => {
    let history = useNavigate();
    const [error, setError] = useState('');
    const [privateData, setPrivateData] = useState('');
    try {
        useEffect(() => {
            if (!localStorage.getItem("authToken")) {
                history("/login");
            }
    
            const fetchPrivateData = async () => {
                const config = {
                    headers: {
                        "Content-Type": "applicaton/json",
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`
                    }
                }
                try {
                    const { data } = await axios.get("/api/private", config);
                    setPrivateData(data.data);
                    
                } catch (error) {
                    localStorage.removeItem("authToken");
                    setError("Unauthorized");
                    history("/login");
                    console.log(error);
                }
    
            }
            fetchPrivateData();
        }, [history]);
        const LogoutHandler = () => {
            localStorage.removeItem("authToken");
            history("/login");
            
        }
        
        return (
            error ? <span className="error-message">{error}</span> : <>
                <div style={{ background: 'green', color: "white" }}>
                    {privateData}
                    
                </div>    
    
                <button onClick={LogoutHandler} >Logout</button>
            </>
        )     
    }
    
    catch (error) {
        console.log(error);
        
    }
}
export default PrivateScreen;