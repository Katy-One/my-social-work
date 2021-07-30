import React from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import style from '../common/FormControls/FormControls.module.css'
import {CreateInput, Input} from "../common/FormControls/FormControls";
import {maxLength10, required} from "../../utils/validator/validator";
import {login} from "../../redux/auth-reducer";
import {compose} from "redux";

import {Redirect, withRouter} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";

export  type LoginFormType = {
    email: string,
    password: string
    rememberMe: boolean
    captcha: string | null
}
type  LoginFormKeysType = keyof LoginFormType

interface Props {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormType, Props> & Props> = ({handleSubmit, error, captchaUrl}) => {

    return (

        <form onSubmit={handleSubmit}>


            {CreateInput<LoginFormKeysType>('Email', 'email', [required], Input, {type: 'text', label: 'Full Name:'})}
            {CreateInput<LoginFormKeysType>('passwоrd', 'password', [required], Input, {
                type: 'password',
                label: 'Paswword'
            })}
            {CreateInput<LoginFormKeysType>(undefined, 'rememberMe', [], Input, {
                type: 'checkbox',
                label: 'rememberMe'
            },)}
            {captchaUrl && <img src={captchaUrl} alt=""/>}
            {captchaUrl && CreateInput<LoginFormKeysType>('Simbol image', 'captcha', [required], Input)}

            {
                error && <div className={style.formSummeryError}>{error}</div>
            }


            <button>Login</button>
        </form>
    )

}


const ReduxLoginForm = reduxForm<LoginFormType, Props>({
    // a unique name for the form
    form: 'login',

})(LoginForm)

let Login: React.FC = () => {
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const dispatch = useDispatch()

    let loginSubmit = (formData: LoginFormType) => {
       dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    return <>
        <div>
            {isAuth ? <Redirect to={'/profile'}/> : <Redirect to={'/login'}/>}
            <h1>Login</h1>
            <ReduxLoginForm onSubmit={loginSubmit} captchaUrl={captchaUrl}/>
        </div>
    </>
}
 export default Login
