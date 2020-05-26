import React from "react";
import s from "./MyPost.module.css";

const MyPost = (props) => {

    return <div className={s.item}>

        <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQIeKxpjPeCtvBoU7BD3oxt0ZdwtmynAqlpR15w2bHTA2oyJhZU"
            alt=""/>
        {props.massage}
        <span>{props.like}</span>
    </div>

}
export default MyPost