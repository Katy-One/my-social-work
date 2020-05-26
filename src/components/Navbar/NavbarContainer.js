import React from "react";
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import Navbar from "./Navbar";

let mapStateToProps = (state) => {

    return {
        navLinks: state.navLink
    };
};
let mapDispatchToProps = (dispatch) => {
    return {

    }
}
const NavbarContainer = connect(mapStateToProps, mapDispatchToProps)(Navbar)

export default NavbarContainer