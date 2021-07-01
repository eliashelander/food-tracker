import React from 'react'

const Stock = ({ stock }) => {
    return (
        <>
            <h1>Stock</h1>
            <ul>
                {stock.stock.map(i => (
                    <li key={i.id}>{i.title} ({i.qty}{i.unit})
                        <button>+</button>
                        <button>-</button>
                        <button>X</button>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Stock;
