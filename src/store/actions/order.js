import * as actionType from './actionTypes';
import axios from '../../axios-orders'; 

const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionType.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

const purchaseBurgerFail = (error) => {
    return {
        type: actionType.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
        .then(res => {
            dispatch(purchaseBurgerSuccess(res.data.name, orderData));
        }).catch(err => {
            dispatch(purchaseBurgerFail(err));
        });
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionType.PURCHASE_BURGER_START
    }
}

export const purchaseInit = () => {
    return {
        type: actionType.PURCHASE_INIT
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionType.FETCH_ORDERS_START
    }
}

const fetchOrdersSuccess = (orders) => {
    return {
        type: actionType.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

const fetchOrdersFail = (error) => {
    return {
        type: actionType.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrders = (idToken, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + idToken + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('orders.json' +  queryParams)
             .then(res => {
                 const fetchedOrders = [];
                 for (let key in res.data) {
                    fetchedOrders.push({
                        id: key,
                        ...res.data[key]
                    });
                 }
                 dispatch(fetchOrdersSuccess(fetchedOrders));
                //  this.setState({orders: fetchedOrders, loading: false});
             }).catch(error => {
                 dispatch(fetchOrdersFail(error));
                //  this.setState({loading: false});
             });

    }
}