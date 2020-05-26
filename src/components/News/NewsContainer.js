import React from 'react';


import {connect} from "react-redux";
import News from "./News";

import {addNewsActionCreator} from "../../redux/news-reducer";



let mapStateToProps = (state) => {
    return {
        news: state.newsPage.allNews,
    };
};
let mapDispatchToProps = (dispatch) => {
    return {
        onNewsRemove: (id) => {
            dispatch(addNewsActionCreator(id))
        },
    }
}
const NewContainer = connect(mapStateToProps, mapDispatchToProps)(News)

export default NewContainer
