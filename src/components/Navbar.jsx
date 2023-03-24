import React, { useEffect, useRef, useState } from 'react';
import { FaBars, FaTimes, FaPencilAlt, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar = () => {
const navRef = useRef();
const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get('user_token') !== undefined);
const [formValues, setFormValues] = useState({});

const showNavbar = () => {
navRef.current.classList.toggle('responsive_nav');
};

const isHome = window.location.pathname === '/';

const handleLogout = () => {
Cookies.remove('user_token');
setIsLoggedIn(false);
window.location.href = '/'; // redirige l'utilisateur vers la page de connexion
};

useEffect(() => {
const checkLoginStatus = () => {
setIsLoggedIn(Cookies.get('user_token') !== undefined);
};
checkLoginStatus();
}, []);

async function handleSubmit(e) {
e.preventDefault();
const sendData = {
method: 'POST', // Change to POST if you're submitting data
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(formValues),
};
const data = await useFetch("https://starfish-app-3xk6j.ondigitalocean.app/users/sign_out", sendData);
const result = await data.json();
console.log(result);
window.location.reload();
}

const handleInputChange = (e) => {
setFormValues({
...formValues,
[e.target.name]: e.target.value,
});
};

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
<ul className="nav-links">
{isLoggedIn ? (
<>
<li>
<Link to="/" onClick={showNavbar}>
Home
</Link>
</li>
<li>
<Link to="/new-art" onClick={showNavbar}>
Ajouter un dessin
</Link>
</li>
<li>
<Link to="/filtered-list" onClick={showNavbar}>
Liste filtrée
</Link>
</li>
<li>
<Link to="/favorites" onClick={showNavbar}>
Mes favoris
</Link>
</li>
<li>
 <Link to="/" onClick={handleLogout}>
  Me deconnecter
</Link>
</li>
      </>
    ) : (
      <>
      <li>
      <Link to="/" onClick={showNavbar}>
          Home
        </Link>
        </li>
        <li>
        <Link to="/signup" onClick={showNavbar}>
          S'inscrire
        </Link>
        </li>
        <li>
        <Link to="/login" onClick={showNavbar}>
          Se connecter
        </Link>
        </li>
        <li>
        <Link to="/about" onClick={showNavbar}>
          A propos
        </Link>
        </li>
  
      </>
    )}
</ul>

    <button className="nav-btn nav-close-btn" onClick={showNavbar}>
      <FaTimes />
    </button>
  </nav>
  <div className="nav-right-container"> {/* Nouveau div pour placer le panier à droite */}
    {/* Afficher le panier si l'utilisateur est connecté */}
    {isLoggedIn && (
          <Link to="/cart" onClick={showNavbar}>
            <FaShoppingCart />
          </Link>
        )}
  </div>
  <button className="nav-btn" onClick={showNavbar}>
    <FaBars />
  </button>
  
</header>
);
};

export default Navbar;