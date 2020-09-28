import * as actionType from './actionTypes';
import axios from '../../axios-orders'; 

export const addIngredients = (ingrdName) => {
    return {
        type: actionType.ADD_INGREDIENTS,
        ingredientName: ingrdName
    }
}

export const removeIngredients = (ingrdName) => {
    return {
        type: actionType.REMOVE_INGREDIENTS,
        ingredientName: ingrdName
    }
}

const setIngredients = (ingredients) => {
    return {
        type: actionType.SET_INGREDIENTS,
        ingredients: ingredients,

    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionType.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('ingredients.json')
             .then(res => {
                 dispatch(setIngredients(res.data));
             })
             .catch(() => {
                 dispatch(fetchIngredientsFailed());
             });
    }
}