import * as actionType from '../actions/actionTypes';

const initState = {
    orders: [],
    loading: false,
    purchased: false
};

const orderReducer = (state = initState, action) => {
    switch(action.type) {
        case actionType.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true
            }
        case actionType.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false
            };
        case actionType.FETCH_ORDERS_FAIL:
            return {
                ...state,
                loading: false
            }
        case actionType.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            };
        case actionType.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            };
        case actionType.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            };
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            };
        case actionType.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}

export default orderReducer;