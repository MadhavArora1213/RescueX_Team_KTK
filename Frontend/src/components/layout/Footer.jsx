import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-charcoal text-white py-4">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} RescueGrid. All rights reserved.</p>
                <p>Contact us: support@rescuegrid.com</p>
            </div>
        </footer>
    );
};

export default Footer;