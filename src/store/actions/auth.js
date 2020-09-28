import * as actionType from './actionTypes';
import axios from 'axios';

const authStart = (startMessage) => {
    return {
        type: actionType.AUTH_START,
    }
}


const authSuccess = (token, localId) => {
    return {
        type: actionType.AUTH_SUCCESS,
        token: token,
        localId: localId
    }
}

const authFail = (error) => {
    return {
        type: actionType.AUTH_FAIL,
        error: error
    }
}

export const logout = (expiresIn) => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionType.AUTH_LOGOUT,
    }
}

const checkAuthTimeout = (expiresIn) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout(expiresIn));
        }, expiresIn * 1000);
    }
}

export const auth = (email, passwd, isSignUp) => {
    return dispatch => {
            dispatch(authStart('S'));
            const authData = {
                email: email,
                password: passwd,
                returnSecureToken: true
            }
            let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=VERIFY_KEY';
            if (!isSignUp) {
                url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=VERIFY_KEY'
            }
            axios.post(url, authData)
                 .then(res => {
                     const expirationDate = new Date(new Date().getTime() +
                                                     res.data.expiresIn * 1000);
                     localStorage.setItem('token', res.data.idToken);
                     localStorage.setItem('expirationDate', expirationDate);
                     localStorage.setItem('userId', res.data.localId);
                     dispatch(authSuccess(res.data.idToken, res.data.localId));
                     dispatch(checkAuthTimeout(res.data.expiresIn))
                 })
                 .catch(err => {                     
                     dispatch(authFail(err.response.data.error));
                 })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionType.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout(2));
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate < new Date()) {
                dispatch(logout(2));
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
            }
        }
    }
}
