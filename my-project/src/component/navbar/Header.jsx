import { useState } from 'react';
import './Header.css';
import logo from '../../assets/header/zone.png.png';
import search from '../../assets/header/search.png';
import cart from '../../assets/header/cart.png.png';
import account from '../../assets/header/account.png';
import hum from '../../assets/header/pigeon.png';
import hum2 from '../../assets/header/humming-bird-black-side-silhouette.png';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const links = [
    { name: 'Home', link: '/' },
    { name: 'Product', link: '/products' },
    { name: 'About', link: '/About' },
    { name: 'Contact', link: '/' },
  ];

  return (
    <div className='navbg'>
      <nav className="flex justify-between items-center p-1">
        <img
          src={isMenuOpen ? hum2 : hum}
          alt=""
          className="w-16 drop-shadow-lg sm:hidden"
          onClick={toggleMenu}
        />
        <img src={logo} alt="" className="w-20" />
        <ul
          className={`menu-list absolute top-16 left-2 bgp z-10 px-8 py-4 mt-1 rounded-md items-center ease-in duration-500 sm:top-0 sm:left-24 ${
            isMenuOpen ? 'open' : ''
          }`}
        >
          {links.map((link) => (
            <li key={link.name} className="text-xl p-1">
              <Link to={link.link} className="text-xl p-2">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="sm:flex contents space-x-4 bgp p-3 rounded-md cursor-pointer drop-shadow-lg">
          <img
            src={search}
            alt=""
            className="search w-10"
            onClick={() => {
              navigate('/search');
          
            }}
          />
          <img src={cart} alt="" className="cart w-10"  onClick={() => {
              navigate('/cart');
             
            }} />
          <img src={account} alt="" className="account w-10"   onClick={() => {
              navigate('/loginSingup');
            
            }} />
        </div>
      </nav>
    </div>
  );
};

export default Header;
