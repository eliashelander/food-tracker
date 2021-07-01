import React from 'react'

const Button = ({ notEnoughIngredients, name, handleClick }) => {
    return (
        <button onClick={handleClick} disabled={notEnoughIngredients}>{name}</button>
    )
}

export default Button;
