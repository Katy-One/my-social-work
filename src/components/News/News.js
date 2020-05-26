import React from 'react';
import {NavLink} from "react-router-dom";



const OneNews = (props) => {
    let removeRow = () => {
        props.onNewsRemove(props.id)
    }

    return (

        <div className='news-item'>
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
                            return <OneNews id={el.id} data={el.data} news={el.news} author={el.author}
                                            onNewsRemove={props.onNewsRemove}/>
                        }
                    }
                )}

            </div>
        </div>
    )
}


export default News
