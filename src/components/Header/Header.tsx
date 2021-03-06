import React from 'react';
import s from './Header.module.css';
import {NavLink, Redirect} from "react-router-dom";
export  type PropsType={
    isAuth:boolean
    login: string | null

}
export  type DespatchType={
    logout:()=> void
}
const Header: React.FC<PropsType & DespatchType> = (props) => {
    return <header className={s.header}>
        {!props.isAuth &&  <Redirect to={'/login'}/>}
        <img
            src="data:image/png;base64,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"
            alt=""/>
        {props.isAuth ? <div>{props.login} - <button onClick={props.logout}>LOGOUT</button></div> :
            <NavLink to={'/login'}>
                <div className={s.loginBlock}>login</div>
            </NavLink>}

    </header>
}


export default Header