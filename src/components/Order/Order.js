import React from 'react';
import classes from './Order.css';

const order = props => {
    const ingredients = [];
    for (let ingredient in props.ingredients) {
        ingredients.push({
            name: ingredient,
            quantity: props.ingredients[ingredient]
        });
    }
    const ingredientOutput = ingredients.map(ig => {
        return <span 
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '2px solid #ccc',
                    padding: '5px'
                }}
                key={ig.name}>{ig.name} ({ig.quantity})</span>
    });
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>{props.price}</strong></p>
        </div>
    );
}


export default order;