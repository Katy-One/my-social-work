import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";
let mapStateToPropsRedirect = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth
    };
};
type MapPropsType={
    isAuth: boolean
}

export function withAuthRedirect<WPC>(Component: React.ComponentType<WPC>){
  const  RedirectComponent: React.FC<MapPropsType>=(props)=>{
let {isAuth, ...restProps} =props

            if(!isAuth){
             return   <Redirect to={'/login'} />
            }
            return <Component {...restProps as WPC}/>

    }
    let ConnectedAuthRedirectComponent =connect<MapPropsType , {}, WPC , AppStateType>(mapStateToPropsRedirect)(RedirectComponent)
    return ConnectedAuthRedirectComponent
}