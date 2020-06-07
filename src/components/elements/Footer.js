import React from 'react';
import './footerStyles.css';

const Footer = ({children, ...others}) => {
    return <div className="root" {...others}>
        <div className="flex-container">
            <p className="footer-link">About</p>
            <p className="footer-link">Contact</p>
            <p className="footer-link">Report</p>
        </div>
        <p className="copy">Copyright Bitwise 2020</p>
    </div>
};

export default Footer;