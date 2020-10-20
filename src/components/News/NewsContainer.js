import React from 'react';


import {connect} from "react-redux";
import News from "./News";

import {addActive, addNewsActionCreator} from "../../redux/news-reducer";



let mapStateToProps = (state) => {
    return {
        news: state.newsPage.allNews,
        active: state.newsPage.active
    };
};
let mapDispatchToProps = (dispatch) => {
    return {
        onNewsRemove: (id) => {
            dispatch(addNewsActionCreator(id))
        },  addActive: (id) => {
            dispatch(addActive(id))
        }
    }
}
const NewContainer = connect(mapStateToProps, {addNewsActionCreator, addActive})(News)

export default NewContainer
