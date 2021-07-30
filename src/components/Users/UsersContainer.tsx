import React from "react";
import { useSelector} from "react-redux";
import Users from "./Users";
import Preloader from "../common/preloader/Preloader";
import {
    getIsFetching,
} from "../../redux/users-selectors";

type UserPagePropsType ={
    title: string
}
export  const UsersPage:React.FC< UserPagePropsType> = (props)=>{
 const isFetching = useSelector(getIsFetching)
    return <>
        <h2>{props.title}</h2>
        {isFetching ? <Preloader/> : null}
        <Users/>
    </>
}


