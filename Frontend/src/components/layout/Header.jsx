import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

const Header = () => {
    return (
        <header className="bg-red-600 p-4 flex justify-between items-center">
            <div className="flex items-center">
                <img src={logo} alt="RescueX Logo" className="h-10" />
                <h1 className="text-white text-2xl ml-2">RescueGrid</h1>
            </div>
            <nav>
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/" className="text-white hover:underline">Home</Link>
                    </li>
                    <li>
                        <Link to="/dashboard" className="text-white hover:underline">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/sos" className="text-white hover:underline">SOS Portal</Link>
                    </li>
                    <li>
                        <Link to="/login" className="text-white hover:underline">Login</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;