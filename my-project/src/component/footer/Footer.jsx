import logo from '../../assets/header/zone.png.png';
import ApplePay from '../../assets/header/apple play.png';
import GooglePay from '../../assets/header/Google-Play-Logo.png';
import Payment from '../../assets/header/payment.png';

import './Footer.css'
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
  <>
  <footer className="section-s1 p-10 bgD">
    <div className="col">
      <Link to="/"><img src={logo} alt="" width="100px"/></Link>
      <h4>Contact</h4>
      <p> <strong>Address:</strong>562 Willingontn Road, Street 32 San Francesco</p>
      <p> <strong>Phone:</strong>+01 2222 6542/ (+91) 5641 2585</p>
      <p> <strong>Hours:</strong>10:00-18:00 , Mon -Sat</p>
      <div className="follow">
        <h4>Follow Us</h4>
        <div className="icon">
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-youtube"></i>
          <i className="fab fa-whatsapp"></i>
        </div>
      </div>
    </div>
    <div className="col">
      <h4>About</h4>
      <Link to="/about">About Us</Link>
      <a href="#">Delivery Information</a>
      <a href="#">Privacy Policy</a>
      <a href="#">Terms & Condations</a>
      <a href="#">Contact Us</a>
    </div>

    <div className="col">
      <h4>My Account</h4>
      <a href="#">Sign In </a>
      <a href="#">View Cart</a>
      <a href="#">My Wishlist</a>
      <a href="#">Track My Order</a>
      <a href="#">Help</a>
    </div>

    <div className="col install">
      <h4>Install App</h4>
      <p>From App store or Google Play</p>
      <div className="row">
        <img src={ApplePay} alt="" width="100px"/>
        <img src={GooglePay} alt="" width="70px"/>
      </div>
     <p>Secured Payment Gateways</p>
     <img src={Payment} alt="" width="100px"/> 
    </div>
    <div className="copyright">
      <p className='font-bold'> &copy; REACT,RUDEX AND MONGODB DATEBAS PROJECT</p>
    </div>
  </footer>
  </>
  )
}

export default Footer
