import { Navigate, Route, Routes } from 'react-router-dom'
const PrivateRoute = ({ component: Component, ...rest }) => {
    return (     
            
        <Routes>
            
            <Route
            
                {...rest}
                render={
                    (props) => {
                        try {
                            localStorage.getItem("authToken") ? (
                                <Component {...props} />
                            ) : (
                                <Navigate to="/login" />
                            )
     
                        } catch (error) {
                            console.log(error)
                        }
                    }}
        />
                    
                   
            </Routes>
            
      )

 
}

export default PrivateRoute