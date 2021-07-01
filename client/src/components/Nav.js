import React from 'react';
import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">My stock</Link>
                </li>
                <li>
                    <Link to="/recipes">Recipes</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
