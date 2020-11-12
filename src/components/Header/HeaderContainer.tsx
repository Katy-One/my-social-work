import React from 'react';


import {connect} from "react-redux";
import Header, {DespatchType, PropsType} from "./Header";
import * as axios from "axios";
import {logout} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";
import {compose} from "redux";



class HeaderContainer extends React.Component<PropsType & DespatchType> {
    render() {
        return (
            <Header {...this.props}/>
        );
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    };
};

export default  compose<React.ComponentType>(connect<PropsType , DespatchType,{}, AppStateType>(mapStateToProps, { logout}))(HeaderContainer)
