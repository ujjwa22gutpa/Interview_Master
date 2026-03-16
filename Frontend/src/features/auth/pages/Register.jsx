import React from 'react'
import {useNavigate} from 'react-router'
import {Link} from 'react-router'
import { useState} from 'react'
import {useAuth} from '../hooks/useAuth'
export default function Register() {
  const navigate = useNavigate();
  const {loading, handleRegister} = useAuth();
  const [user, setUser] = useState({
    name:"",
    email:"",
    password:""
  })
     async function handleSubmit(e){
        e.preventDefault();
        await handleRegister({userName: user.name, email: user.email, password: user.password});
        navigate("/");
    }
    function handleChange(e){
        const {name, value} = e.target; 
        setUser((prevUser) => ({
           ...prevUser,
           [name]: value 
        }))
    }
    if(loading) return <main> <h2>Loading...</h2></main>;
  return (
    <>
      <main>
        <div className="form-contain">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">
                UserName
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={user.name}
                  placeholder="Enter username"
                  autoFocus
                  required
                  onChange={handleChange}
                />
              </label>
            </div>
             <div className="input-group">
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  placeholder="Enter email address"
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
                  required
                  onChange={handleChange}
                />
              </label>
            </div>
            <button className="button primary-button danger-button  ">Register</button>
          </form>
          <span>Already have an account? 
                 <Link to="/login"> Login</Link>
               </span>
        </div>
      </main>
    </>
  );
}
