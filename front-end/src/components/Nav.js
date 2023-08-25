import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.css';

const Nav = () =>{
    const auth = localStorage.getItem('user');
    const navigate = useNavigate(); //this hook rerender whenever some changes occur in our component
    const logout = () =>{
        localStorage.clear();
        navigate('/signup'); //logout hote he signup wale page pr chla jaega
    }

    return(
        <div>
            <img src="https://static.vecteezy.com/system/resources/thumbnails/011/401/535/small/online-shopping-trolley-click-and-collect-order-logo-design-template-vector.jpg" alt="--logo" className='logo'/>
            { auth ? <ul className='nav-ul'>
                    <li><Link to="/">Products</Link></li>
                    <li><Link to="/add">Add Products</Link></li>
                    <li><Link to="/update">Update Products</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link onClick={()=>logout()} to="/login">Logout ({JSON.parse(auth).name})</Link></li>
                </ul>
                :
                <ul className='nav-ul nav-right'>
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            }
        </div>
    )
}

export default Nav;