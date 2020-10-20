import {authAPI, ResultCodeEnum, ResultCodeForCaptcha, securityAPI} from "../api/api";
import {stopSubmit} from 'redux-form'
import {BasicThunkType, InferActionsType} from "./redux-store";


const SET_USER_DATA = 'SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS'


type ActionsTypes = InferActionsType<typeof actions>
let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}
export type InitialStateType = typeof initialState

const autorReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case  SET_USER_DATA:
        case  GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
        default :
            return state
    }
}


type ActionsType = InferActionsType<typeof  actions>
type ThunkType = BasicThunkType<ActionsType| ReturnType<typeof stopSubmit>>
export const actions = {
    setUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean, captchaUrl: string | null) =>
        ({type: SET_USER_DATA, payload: {userId, email, login, isAuth, captchaUrl}} as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}
    } as const)
}



export const setAuth = (): ThunkType  => {
    return async (dispatch) => {
        let meData = await authAPI.me();
        if (meData.resultCode === ResultCodeEnum.Success) {
            let {id, email, login} = meData.data
            dispatch(actions.setUserData(id, email, login, true, ''))
        }
    }

}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null): ThunkType => {
    return async (dispatch) => {
        let data = await authAPI.login(email, password, rememberMe, captcha)
        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(setAuth())
        } else {
            if (data.resultCode === ResultCodeForCaptcha.captchaIsReq) {
                dispatch(getCaptchaUrl())
            }
            let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
            dispatch(stopSubmit('login', {_error: message}))
        }
    }

}
export const getCaptchaUrl = (): ThunkType => {
    return async (dispatch) => {
        let data = await securityAPI.getCaptchaUrl()
        const captchaUrl = data.url;
        dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
    }
}
export const logout = (): ThunkType => {
    return async (dispatch) => {
        let response = await authAPI.logout();
        if (response.data.resultCode === 0) {
            let {id, email, login} = response.data.data
            dispatch(actions.setUserData(null, null, null, false, null))
        }
    }
}
export default autorReducer