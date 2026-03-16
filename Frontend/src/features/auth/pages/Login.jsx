import "../auth.form.scss"
import {Link, useNavigate} from 'react-router'
import { useState } from "react"; 
import {useAuth} from '../hooks/useAuth'
 
export default function Login() {
  const navigate = useNavigate()
  const {loading, handleLogin} = useAuth();
  
    const [user,setUser] = useState({
        email:"",
        password:""
    })

    function handleChange(e){
        const {name, value} = e.target; 
        setUser((prevUser) => ({
           ...prevUser,
           [name]: value  // Two way binding for form inputs
        }))
    }

   async function handleSubmit(e){
        e.preventDefault();
        await handleLogin({email: user.email, password: user.password});
       navigate("/");

    }
    
    if(loading) return <main> <h2>Loading...</h2></main>;


  return (
    <>
      <main>
        <div className="form-contain">
          <h2>Login Page</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  placeholder="Enter email address"
                  autoFocus
                  autoComplete="off"
                  required
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="input-group">
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={user.password}
                  placeholder="Enter the password"
                  autoComplete="off"
                  required
                  onChange={handleChange}
                />
              </label>
            </div>
            <button className="button primary-button danger-button  ">Login</button>
          </form>
          <span>Don't have an account? 
                 <Link to="/register"> Register</Link>
               </span>
        </div>
      </main>
    </>
  );
}
