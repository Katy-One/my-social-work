import React from "react";
import {connect} from "react-redux";
import Navbar, {PropsType2} from "./Navbar";
import {AppStateType} from "../../redux/redux-store";


let mapStateToProps = (state: AppStateType) => {
    return {
        navLinks: state.navLink
    }as PropsType2
};

const NavbarContainer = connect<PropsType2 , {}, {}, AppStateType>(mapStateToProps)(Navbar)

export default NavbarContainer