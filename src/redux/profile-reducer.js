import {ProfileAPI, UserAPI} from "../api/api";
import {stopSubmit} from 'redux-form';

let updateNewTextPost = 'updateNewTextPost';
let addpost = 'ADD-POST';
let SET_USER_PROFILE = 'SET_USER_PROFILE'
let SET_STATUS = 'SET_STATUS'
let SET_PHOTO = 'SET_PHOTO'
let initialState = {
    postInfo: [
        {
            id: 1,
            massage: 'post1',
            like: 12
        },
        {
            id: 2,
            massage: 'post2',
            like: 20
        },
        {
            id: 3,
            massage: 'post3',
            like: 1
        },
    ],
    profile: null,
    status: '',

}

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case addpost:

            let newPost = {
                id: action.id,
                massage: action.text,
                like: 0
            };


            return {
                ...state,
                postInfo: [...state.postInfo, newPost],

            }
        case updateNewTextPost:

            return {
                ...state,
                newPostText: action.nextText
            }
        case SET_USER_PROFILE:

            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case SET_PHOTO:
            return {
                ...state,
                profile: {...state.profile, photos: action.photo}

            }
        default :
            return state
    }
}
export const addPostText = (id, text) => {

    return {
        type: addpost,
        id: id,
        text
    }
};
export const setStatusProfile = (status) => {

    return {
        type: SET_STATUS,
        status: status
    }
};
export const updateNewPostText = (text) => {

    return {
        type: updateNewTextPost,
        nextText: text
    }
};
export const setUsersProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setUsersPhoto = (photo) => ({type: SET_PHOTO, photo});
export const setPhotoApi = (file) => {

    return async (dispatch) => {


        let response = await ProfileAPI.photo(file)

        if (response.data.resultCode == 0) {
            console.log(response.data)
            dispatch(setUsersPhoto(response.data.data.photos))


        }
    }
}
export const getUsersProfile = (userId) => {

    return async (dispatch) => {
        let response = await UserAPI.getProfile(userId)

        dispatch(setUsersProfile(response.data))

    }
}
export const getStatus = (userId) => {
    return async (dispatch) => {

        let response = await ProfileAPI.getStatus(userId)
        dispatch(setStatusProfile(response.data))

    }
}
export const saveProfile = (profile) => {
    return async (dispatch, getState) => {
        let id = getState().auth.userId
        let response = await ProfileAPI.saveProfile(profile)

        if (response.data.resultCode === 0) {
            dispatch(getUsersProfile(id))
        }else {
            console.log(response.data)
            let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
            let nameContact = message.split('->').reverse()[0].slice(0, -1).toLocaleLowerCase()

             dispatch(stopSubmit('dataForm', {"contacts":{[nameContact] :  message} }))
            return Promise.reject(response.data.messages[0])
        }


    }
}
export const updateStatus = (status) => {

    return async (dispatch) => {
        let response = await ProfileAPI.setStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatusProfile(status))
        }
    }
}
export default profileReducer