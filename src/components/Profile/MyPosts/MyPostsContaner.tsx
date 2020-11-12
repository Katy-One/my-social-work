import React from "react";
import {

    actions
} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";

let mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.postInfo,
         // newPostText:state.profilePage.newPostText
    };
};

const MyPostsContainer = connect(mapStateToProps,{
    addPostText: actions.addPostText,
    updateNewPostText: actions.updateNewPostText})(MyPosts)
export default MyPostsContainer