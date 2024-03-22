import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({user}) =>
{
    const navigate = useNavigate();
    const logout = () =>{
        sessionStorage.clear();
        localStorage.clear();
        navigate('/auth/login');
    }
    return(
        <nav class="mx-3 p-2 navbar navbar-light bg-light justify-content-between">
            <p class="navbar-brand">Task Manager App - {user?.username}</p>
            <button class="btn btn-outline-danger my-2 my-sm-0" onClick={()=>logout()} >Logout</button>
        </nav>)
}

export default Navbar;
