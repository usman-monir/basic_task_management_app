import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({user}) =>
{
    const navigate = useNavigate();
    const logout = () =>{
        sessionStorage.clear();
        localStorage.clear();
        user = null;
        navigate('/');
    }
    return(
        <nav className="mx-3 p-2 navbar navbar-light bg-light justify-content-between">
            <p className="navbar-brand">Task Manager App - {user?.username}</p>
            <button className="btn btn-outline-danger my-2 my-sm-0" onClick={()=>logout()} >Logout</button>
        </nav>)
}

export default Navbar;
