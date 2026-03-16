import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { register, login, logout, getMe } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login({ email, password });
      console.log(data);
      setUser(data.user);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ userName, email, password }) => {
    setLoading(true);
    try {
        const data = await register({ userName, email, password });
    console.log(data);
    setUser(data.user);
    } catch (error) {
        console.log("Registration failed:", error);
    }finally {
        setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
        const data = await logout();
    setUser(null);
    } catch (error) {
        console.error("Logout failed:", error);
    }finally {
        setLoading(false);
    }
  };

  useEffect(()=>{
    const getAndSetUser = async () =>{
       const data = await getMe()
       setUser(data.user);
       setLoading(false)
    }
    getAndSetUser()
  },[])


    useEffect(()=>{
    const getAndSetUser = async () =>{
           const data = await getMe()
           setUser(data.user)
           setLoading(false)
    }
    getAndSetUser()
  },[])

  return {
    user,
    loading,
    handleLogin,
    handleRegister,
    handleLogout,
  };

};
