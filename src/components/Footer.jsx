import logo from '../assets/logo.png';
import facebookIcon from '../assets/facebook_icon.png';
import twitterIcon from '../assets/twitter_icon.png';
import linkedinIcon from '../assets/linkedin_icon.png';
import './Footer.css'
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={logo} alt="logo" style={{ width: '80px', height: 'auto',borderRadius:'50%',border: '3px solid white' }} />
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel
            expedita nam blanditiis sint cumque voluptatum mollitia, ipsam
            eligendi reprehenderit ipsum officiis sequi ipsa neque! Ipsum
            ducimus eius fugit molestias ea?
          </p>
          <div className="footer-social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={facebookIcon} alt="Facebook" style={{ width: '40px', height: 'auto' }} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={twitterIcon} alt="Twitter" style={{ width: '40px', height: 'auto' }} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedinIcon} alt="LinkedIn" style={{ width: '40px', height: 'auto' }} />
            </a>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-212-456-7890</li>
            <li>contact@recipehub.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        © {new Date().getFullYear()} Recipe Sharing. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;

