import React from "react";
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";

const Navbar = (props) => {
console.log(props)
    return <nav className={s.nav}>
        {props.navLinks.map((el) => {


            if(el.hasOwnProperty('path')){
                return <div className={s.item} ><NavLink activeClassName={s.active} to={el.path}>{el.link}</NavLink></div>

            }else{
                return    <div className={s.item} ><NavLink   to=''>{el.link}</NavLink></div>

            }
        })}


    </nav>
}
export default Navbar