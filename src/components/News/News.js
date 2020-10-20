import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import s from '../../App.css';
let a
const OneNews = (props) => {
    console.log(props)
    let removeRow = () => {
        props.addNewsActionCreator(props.id)
    }


    let addActiveClass = () => {
        // setCount(props.id)

        props.addActive(props.id)
        console.log(props.id)
        console.log(props.active)

    }

    return (

        <div className={props.id === props.active ? 'active news-item' : 'news-item'} onClick={addActiveClass}>
            <span class='data'>{props.data}</span>
            <span class='news-text'>{props.news}</span>
            <span class='name'>{props.author}</span>
            <button onClick={removeRow}>remove</button>


        </div>

    )
}

const News = (props) => {
    console.log(props)

    let addNews = () => {
        console.log(props)
        // OneNews(props.news)
    }
    return (
        <div>

            <button onClick={addNews}>ADD NEWS</button>
            <div>

                {props.news.map((el, i) => {
                        if (el.newsState === false) {
                            return <OneNews addActive={props.addActive} id={el.id} data={el.data} news={el.news}
                                            author={el.author}
                                            addNewsActionCreator={props.addNewsActionCreator} i={i}
                                            active= {props.active}/>
                        }
                    }
                )}

            </div>
        </div>
    )
}


export default News
