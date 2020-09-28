import * as actionType from '../actions/actionTypes';

const initState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}


const ingredientReducer = (state = initState, action, ingredPrice = INGREDIENT_PRICES) => {
    switch(action.type) {
        case actionType.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + ingredPrice[action.ingredientName],
                building: true
            }
        case actionType.REMOVE_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - ingredPrice[action.ingredientName],
                building: true
            }
        case actionType.SET_INGREDIENTS:
            let totPrice = 0;
            Object.keys(action.ingredients).map(ingName => {
                totPrice += action.ingredients[ingName] * ingredPrice[ingName];
                return ingName;
            });
                        
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: totPrice,
                error: false,
                building: false
            }
        case actionType.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: false
            }
        case actionType.UPDATE_PRICE:
            return {
                ...state,
                totalPrice: action.totalPrice
            }
        default:
            break;
    }
    return state;
};

export default ingredientReducer;
