import {ProfileAPI, UserAPI} from "../api/api";
import {FormAction, stopSubmit} from 'redux-form';
import {BasicThunkType, InferActionsType} from "./redux-store";
type  postInfoType = {
    id: number,
    massage: string,
    like: number
}
type contactType = {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}
export  type PhotosType = {
    small: string | null,
    large: string | null
}
export  type  profileType = {

    aboutMe: string,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    userId: number,
    contacts: contactType,
    photos: PhotosType

}
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
    ] as Array<postInfoType>,
    profile: null as null | profileType,
    status: '',
    newPostText: '',
    id: ''
}
type  InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'ADD-POST':

            let newPost = {
                id: action.id,
                massage: action.text,
                like: 0
            };


            return {
                ...state,
                postInfo: [...state.postInfo, newPost],

            }
        case 'updateNewTextPost':

            return {
                ...state,
                newPostText: action.nextText
            }
        case 'SET_USER_PROFILE':

            return {
                ...state,
                profile: action.profile
            }
        case 'SET_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'SET_PHOTO':
            return {
                ...state,
                profile: {...state.profile, photos: action.photo} as profileType

            }
        default :
            return state
    }
}
type ActionsType = InferActionsType<typeof actions>
 type ThunkType = BasicThunkType<ActionsType | FormAction>
export const actions = {
    addPostText: (id: number, text: string) => ({type: 'ADD-POST', id: id, text} as const),
    setStatusProfile: (status: string) => ({type: 'SET_STATUS', status: status} as const),
    updateNewPostText: (nextText: string) => ({type: 'updateNewTextPost', nextText} as const),
    setUsersProfile: (profile: profileType) => ({type: 'SET_USER_PROFILE', profile} as const),
    setUsersPhoto: (photo: PhotosType) => ({type: 'SET_PHOTO', photo} as const)
}


export const setPhotoApi = (file: File): ThunkType => {

    return async (dispatch) => {


        let response = await ProfileAPI.photo(file)

        if (response.resultCode == 0) {

            dispatch(actions.setUsersPhoto(response.data.photos))


        }
    }
}
export const getUsersProfile = (userId: number): ThunkType => {

    return async (dispatch) => {
        let response = await ProfileAPI.getProfile(userId)

        dispatch(actions.setUsersProfile(response))

    }
}
export const getStatus = (userId: number): ThunkType => {
    return async (dispatch) => {

        let response = await ProfileAPI.getStatus(userId)

        dispatch(actions.setStatusProfile(response))

    }
}
export const saveProfile = (profile: profileType): ThunkType => {
    return async (dispatch, getState) => {
        let id = getState().auth.userId
        let response = await ProfileAPI.saveProfile(profile)

        if (response.resultCode === 0) {
            if(id != null){
                dispatch(getUsersProfile(id))
            }

        } else {

            let message = response.messages.length > 0 ? response.messages[0] : 'Some error'
            let nameContact = message.split('->').reverse()[0].slice(0, -1).toLocaleLowerCase()
            dispatch(stopSubmit('dataForm', {"contacts": {[nameContact]: message}}))
            return Promise.reject(response.messages[0])
        }


    }
}
export const updateStatus = (status: string): ThunkType => {

    return async (dispatch) => {
        let response = await ProfileAPI.setStatus(status)
        if (response.resultCode === 0) {
            dispatch(actions.setStatusProfile(status))
        }
    }
}

export default profileReducer