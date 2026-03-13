import {createBrowserRouter} from 'react-router';
import Login from './features/auth/pages/Login';
import signUp from './features/auth/pages/signUp';

export const router = createBrowserRouter([
    {
        path:"/login",
        element:<Login/>
    },
    {  
        path:"/signup",
        element:<signUp/>
    }
])