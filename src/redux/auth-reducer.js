import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from 'redux-form'


const SET_USER_DATA = 'SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS'
let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}


const autorReducer = (state = initialState, action) => {

    switch (action.type) {
        case  SET_USER_DATA:
        case  GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }




        default :
            return state
    }
}
export const setUserData = (userId, email, login, isAuth, captchaUrl) => {

    return {
        type: SET_USER_DATA,
        payload: {userId, email, login, isAuth, captchaUrl}
    }
};
const getCaptchaUrlSuccess = (captchaUrl) => {

    return {
        type: GET_CAPTCHA_URL_SUCCESS,
        payload: {captchaUrl}
    }
};


export const setAuth = () => {
    return async (dispatch) => {
        let response = await authAPI.me();
        if (response.data.resultCode === 0) {
            let {id, email, login} = response.data.data
            dispatch(setUserData(id, email, login, true))

        }
    }

}
export const login = (email, password, rememberMe, captcha) => {

    return async (dispatch) => {
        let response = await authAPI.login(email, password, rememberMe, captcha)
        if (response.data.resultCode === 0) {
            dispatch(setAuth())
        } else {
            console.log(response.data)
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaUrl())
            }
            let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
            dispatch(stopSubmit('login', {_error: message}))
        }
    }

}
export const getCaptchaUrl = () => {

    return async (dispatch) => {
        let response = await securityAPI.getCaptchaUrl()
        const captchaUrl = response.data.url;
        dispatch(getCaptchaUrlSuccess(captchaUrl))

    }

}
export const logout = () => {
    return async (dispatch) => {
        let response = await authAPI.logout();
        if (response.data.resultCode === 0) {
            let {id, email, login} = response.data.data

            dispatch(setUserData(null, null, null, false, null))
        }
    }

}
export default autorReducer