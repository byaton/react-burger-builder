import * as actionType from '../actions/actionTypes';

const initState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

const authReducer = (state = initState, action) => {
    switch(action.type) {
        case actionType.AUTH_START:
            return {
                ...state,
                error: null,
                loading: true
            };
        case actionType.AUTH_SUCCESS:
            return {
                ...state,
                token: action.token,
                userId: action.localId,
                error: null,
                loading: false
            };
        case actionType.AUTH_FAIL:            
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case actionType.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null
            };
        case actionType.SET_AUTH_REDIRECT_PATH:
            return {
                ...state,
                authRedirectPath: action.path
            };
        default:
            return state;
    }
}

export default authReducer;