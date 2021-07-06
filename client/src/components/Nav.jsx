import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  const location = useLocation();
  const [activePage, setActivePage] = useState('ingredients');

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location]);

  const handleClick = (e) => {
    switch (e.target.value) {
      case 'ingredients':
        setActivePage('/');
        break;
      case 'recipes':
        setActivePage('/recipes');
        break;
      default:
        setActivePage('/');
        break;
    }
  };

  return (
    <nav className="nav">
      <ul className="nav__ul">
        <li className="nav__li">
          <Link to="/">
            <button value="ingredients" className={activePage === '/' ? 'nav__btn nav__btn--active' : 'nav__btn'} type="button" onClick={handleClick}>My Ingredients</button>
          </Link>
        </li>
        <li className="nav__li">
          <Link to="/recipes">
            <button value="recipes" className={activePage === '/recipes' ? 'nav__btn nav__btn--active' : 'nav__btn'} type="button" onClick={handleClick}>Recipes</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
