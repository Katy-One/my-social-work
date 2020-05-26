import React from "react";
import {connect} from "react-redux";
import {Field, reduxForm} from 'redux-form'
import style from '../common/FormControls/FormControls.module.css'
import {CreateInput, Input} from "../common/FormControls/FormControls";
import {maxLength10, required} from "../../utils/validator/validator";
import {login} from "../../redux/auth-reducer";


const LoginForm = ({handleSubmit, error, captchaUrl}) => {

    return (

        <form onSubmit={handleSubmit}>


            {CreateInput('Email', 'email', [required], Input)}
            {CreateInput('passwоrd', 'password', [required], Input, {type: 'password'})}
            {CreateInput(null, 'rememberMe', [], Input, {type: 'checkbox'}, 'remember me')}
            {captchaUrl && <img src={captchaUrl} alt=""/>}
            {captchaUrl && CreateInput('Simbol image', 'captcha', [required], Input)}

            {
                error && <div className={style.formSummeryError}>{error}</div>
            }


            <button>Login</button>
        </form>
    )

}


const ReduxLoginForm = reduxForm({
    // a unique name for the form
    form: 'login',

})(LoginForm)

let Login = (props) => {

    let loginSubmit = (formData) => {
        console.log(formData)
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)


    }

    return <>
        <div>
            <h1>Login</h1>
            <ReduxLoginForm onSubmit={loginSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    </>


}


// You have to connect() to any reducers that you wish to connect to yourself
let mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, {login})(Login)