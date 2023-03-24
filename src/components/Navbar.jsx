import React, { useRef } from 'react';
import { FaBars, FaTimes, FaPencilAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle('responsive_nav');
  };

  const isHome = window.location.pathname === '/';

  return (
    <header className={isHome ? 'home-navbar' : ''}>
      <div className="logo-container">
        <h4>
          <span className="logo-icon">
            <FaPencilAlt />
          </span>
          Leboncoin des dessins
        </h4>
      </div>
      <nav ref={navRef}>
        <Link to="/" onClick={showNavbar}>
          Home
        </Link>
        <Link to="/register" onClick={showNavbar}>
          S'inscrire
        </Link>
        <Link to="/login" onClick={showNavbar}>
          Se connecter
        </Link>
        <Link to="/favorites" onClick={showNavbar}>
          Mes favoris
        </Link>
        <Link to="/new-art" onClick={showNavbar}>
          Ajouter un dessin
        </Link>
        
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
};

export default Navbar;
