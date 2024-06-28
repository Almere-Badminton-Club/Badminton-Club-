import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
        <p>2024 Smashers Badminton Club.<br/> All rights reserved.</p>
        </footer>
  )
}

const footerStyle = {
    // position: "fixed",
    bottom: 0,
    width: "100%",
    textAlign: 'center',
    padding: '1rem',
    background: '#90918f',
    color: 'white',
}

export default Footer;