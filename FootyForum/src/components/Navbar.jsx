import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';

const Navbar=()=>{
    return (    
                <div className='Navbar'>
                    <div className='home'>
                        <Link to="/">Home</Link>
                    </div>
                    <div className='forum'>
                        <Link to="/forum">Forum</Link>
                    </div>
                    <div className='news'>
                        <Link to="/news">News</Link>
                    </div>
                </div>
    )

}

export default Navbar;