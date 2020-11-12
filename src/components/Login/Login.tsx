import React from "react";
import {connect} from "react-redux";
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import style from '../common/FormControls/FormControls.module.css'
import {CreateInput, Input} from "../common/FormControls/FormControls";
import {maxLength10, required} from "../../utils/validator/validator";
import {login} from "../../redux/auth-reducer";
import {compose} from "redux";

import {Redirect, withRouter} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";

export  type LoginFormType={
    email:string,
    password:string
    rememberMe: boolean
    captcha: string | null
}
type  LoginFormKeysType = keyof LoginFormType
interface Props {
    captchaUrl: string |null
}
const LoginForm: React.FC <InjectedFormProps <LoginFormType , Props >& Props > = ({handleSubmit, error, captchaUrl}) => {

    return (

        <form onSubmit={handleSubmit}>
 

            {CreateInput<LoginFormKeysType>('Email', 'email', [required], Input,{type: 'text', label: 'Full Name:'} )}
            {CreateInput<LoginFormKeysType>('passwоrd', 'password', [required], Input, {type: 'password', label: 'Paswword'})}
            {CreateInput<LoginFormKeysType>(undefined, 'rememberMe', [],  Input, {type: 'checkbox', label:'rememberMe'}, )}
            {captchaUrl && <img src={captchaUrl} alt=""/>}
            {captchaUrl && CreateInput<LoginFormKeysType>('Simbol image', 'captcha', [required],  Input)}

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
type  MapStatePropsType ={
    captchaUrl: string  | null
    isAuth: boolean

}
type  MapDispatchType ={

    login: (email:string, password:string, rememberMe:boolean, captcha:string|null)=> void
}
let Login : React.FC <MapStatePropsType & MapDispatchType> = ({login, captchaUrl, isAuth, }) => {

    let loginSubmit = (formData:any) => {
        console.log(formData)
        login(formData.email, formData.password, formData.rememberMe, formData.captcha)


    }

    return <>
        <div>
            {isAuth ? <Redirect to={'/profile/6880'}/> :  <Redirect to={'/login'}/>}

            <h1>Login</h1>
            <ReduxLoginForm onSubmit={loginSubmit} captchaUrl={captchaUrl}/>
        </div>
    </>


}


// You have to connect() to any reducers that you wish to connect to yourself
let mapStateToProps = (state:  AppStateType):  MapStatePropsType  => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth,
    // login: state.auth.login
})
export default compose<React.ComponentType>(connect<MapStatePropsType, MapDispatchType, {}, AppStateType>(mapStateToProps, {login}), withRouter) (Login)

