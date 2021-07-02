import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Nav = () => {
    const [activePage, setActivePage] = useState('ingredients')

    const handleClick = e => {
        switch (e.target.value) {
            case 'ingredients':
                setActivePage('ingredients')
                break;
            case 'recipes':
                setActivePage('recipes')
                break;
            default:
                setActivePage('ingredients')
                break;
        }
    }

    return (
        <nav className="nav">
            <ul className="nav__ul">
                <li className="nav__li">
                    <Link to="/">
                        <button value="ingredients" className={activePage === 'ingredients' ? "nav__btn nav__btn--active" : "nav__btn"} type="button" onClick={handleClick} >My Ingredients</button>
                    </Link>
                </li>
                <li className="nav__li">
                    <Link to="/recipes">
                        <button value="recipes" className={activePage === 'recipes' ? "nav__btn nav__btn--active" : "nav__btn"} type="button" onClick={handleClick} >Recipes</button>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
