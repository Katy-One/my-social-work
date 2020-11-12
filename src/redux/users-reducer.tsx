import {UserAPI, ResponseType} from "../api/api";
import {updateObjectInArr} from "../utils/object-helper";
import {PhotosType} from "./profile-reducer";
import {AppStateType, BasicThunkType, InferActionsType} from "./redux-store";
import {Dispatch} from "redux";


const FOLLOWED = 'FOLLOWED'
const UNFOLLOWED = "UNFOLLOWED"
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USER_COUNT = 'SET_TOTAL_USER_COUNT'
const LOADING = 'LOADING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

export  type UserType = {

    name: string,
    id: number,
    uniqueUrlName: null | string,
    status: string,
    followed: boolean
    photos: PhotosType
}
let initialState = {
    users: [] as Array<UserType>,
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>
}
type  initialStateType = typeof initialState


const usersReducer = (state = initialState, action: AllActionTypes): initialStateType => {
    switch (action.type) {
        case FOLLOWED:
            return {
                ...state,
                users: updateObjectInArr(state.users, action.id, "id", {followed: true})
            }
        case UNFOLLOWED:
            return {
                ...state,
                users: updateObjectInArr(state.users, action.id, "id", {followed: false})
                // users: state.users.map((el) => {
                //     if (el.id === action.id) {
                //         return {...el, followed: false}
                //     }
                //     return el
                // })
            }
        case SET_USERS:

            if (action.flag) {
                return {

                    ...state, users: [...state.users, ...action.users]
                }
            } else {
                return {

                    ...state, users: [...action.users]
                }
            }

        case SET_CURRENT_PAGE:

            return {
                ...state,
                currentPage: action.currentPage,
            }
        case SET_TOTAL_USER_COUNT:

            return {
                ...state,
                totalUsersCount: action.totalUsersCount,
            }
        case LOADING:
            return {
                ...state,
                isFetching: action.isFetching

            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        default:
            return state
    }
}

export default usersReducer
export const action = {
    follow: (id: number) => ({type: FOLLOWED, id: id} as const),
    unfollow: (id: number) => ({type: UNFOLLOWED, id: id} as const),
    setUsers: (users: Array<UserType>, flag: boolean) => {
        return {type: SET_USERS, users: users, flag: flag} as const
    },
    setCurrentPage: (page: number) => {
        return {type: SET_CURRENT_PAGE, currentPage: page} as const
    },
    setTotalUsersCount: (count: number) => {
        return {type: SET_TOTAL_USER_COUNT, totalUsersCount: count,} as const
    },
    setIsFetching: (load: boolean) => {
        return {type: LOADING, isFetching: load} as const
    },
    isToggleProgress: (flag: boolean, userId: number) => {
        return {type: TOGGLE_IS_FOLLOWING_PROGRESS, isProgress: flag, userId: userId} as const
    }
}

export const getUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch, getState: () => AppStateType) => {
        dispatch(action.setCurrentPage(currentPage))
        dispatch(action.setIsFetching(true))
        // dispatch(action.isToggleProgress(true, userId))
        let data = await UserAPI.getUsers(currentPage, pageSize)
        dispatch(action.setIsFetching(false))
        dispatch(action.setUsers(data.items, false))
        dispatch(action.setTotalUsersCount(data.totalCount))
    }

}
export const followUnfollowFlow = async (dispatch: Dispatch<AllActionTypes>,
                                         userId: number,
                                         apiMethod: (userId: number) => Promise<ResponseType>
                                         , actionCreator: (userId: number) => AllActionTypes) => {
    dispatch(action.isToggleProgress(true, userId))
    let response = await apiMethod(userId)
    // dispatch(actionCreator(userId))
    if (response.resultCode == 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(action.isToggleProgress(false, userId))
}
export const unfollowing = (userId: number): ThunkType => {
    return async (dispatch, getState: () => AppStateType) => {
        followUnfollowFlow(dispatch, userId, UserAPI.unfollow.bind(UserAPI), action.unfollow)
    }
}
export const following = (userId: number): ThunkType => {
    return async (dispatch, getState: () => AppStateType) => {
        followUnfollowFlow(dispatch, userId, UserAPI.follow.bind(UserAPI), action.follow)
    }
}
export const loadingUsers = (page: number, flag: boolean, pageSize: number): ThunkType => {
    return async (dispatch, getState: () => AppStateType) => {
        dispatch(action.setCurrentPage(page));
        dispatch(action.setIsFetching(true))
        let data = await UserAPI.getUsers(page, pageSize)
        dispatch(action.setIsFetching(false))
        dispatch(action.setUsers(data.items, flag))
    }
} 
type AllActionTypes = InferActionsType<typeof action>
type ThunkType = BasicThunkType<AllActionTypes>