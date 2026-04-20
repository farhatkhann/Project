import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import './Footer.css';
const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-4 pb-3 mt-2">
      <div className="container text-center text-md-left">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase">Equi Roots</h5>
            <p>
              Your trusted platform for agricultural equipment rentals. Easy, affordable, and reliable for every farmer.
            </p>
          </div>
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/about" className="text-white text-decoration-none">About Us</a></li>
              {/* <li><a href="/services" className="text-white text-decoration-none">Services</a></li> */}
              <li><a href="/contact" className="text-white text-decoration-none">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase">Contact</h5>
            <p>📍 Village Road, Indore, India</p>
            <p>📞 +91 98765 43210</p>
            <p>📧 support@equiroots.com</p>
            <div className="mt-3">
              <a href="https://facebook.com" className="text-white me-3 fs-5" target="_blank" rel="noreferrer">
                <FacebookIcon/>
              </a>
              <a href="https://twitter.com" className="text-white me-3 fs-5" target="_blank" rel="noreferrer">
                <XIcon/>
              </a>
              <a href="https://instagram.com" className="text-white me-3 fs-5" target="_blank" rel="noreferrer">
              <InstagramIcon/>
              </a>
              <a href="https://linkedin.com" className="text-white fs-5" target="_blank" rel="noreferrer">
                <LinkedInIcon/>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-3">
        <p className="mb-0 text-secondary">&copy; {new Date().getFullYear()} Equi Roots. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
