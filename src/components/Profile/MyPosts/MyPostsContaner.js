import React from "react";
import {
    addPostText,
    updateNewPostText
} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.postInfo,
        newPostText:state.profilePage.newPostText
    };
};
// let mapDispatchToProps = (dispatch) => {
//
//     return {
//         updateNewPostText: (text) => {
//             dispatch(UpdateNewPostActionCreator(text))
//         },
//         addPostText: (id) => {
//             dispatch(addPostActionCreator(id))
//         }
//     }
// }
const MyPostsContainer = connect(mapStateToProps,{addPostText, updateNewPostText})(MyPosts)
export default MyPostsContainer