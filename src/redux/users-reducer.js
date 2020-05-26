import {UserAPI} from "../api/api";
import {updateObjectInArr} from "../utils/object-helper";

const FOLLOWED = 'FOLLOWED'
const UNFOLLOWED = "UNFOLLOWED"
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USER_COUNT = 'SET_TOTAL_USER_COUNT'
const LOADING = 'LOADING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'


let initialState = {
    users: [],
    pageSize: 20,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

const usersReducer = (state = initialState, action) => {

    switch (action.type) {

        case FOLLOWED:

            return {
                ...state,
                // users: state.users.map((el) => {
                //     if (el.id === action.id) {
                //         return {...el, followed: true}
                //     }
                //     return el
                // })
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
 const follow = (id) => {
    return {type: FOLLOWED, id: id}
};
 const unfollow = (id) => {
    return {type: UNFOLLOWED, id: id}
};
export const setUsers = (users, flag) => {
    return {type: SET_USERS, users: users, flag: flag}
};
export const setCurrentPage = (page) => {

    return {
        type: SET_CURRENT_PAGE,
        currentPage: page
    }
};
export const setTotalUsersCount = (count) => {

    return {
        type: SET_TOTAL_USER_COUNT,
        totalUsersCount: count,

    }
};
export const setIsFetching = (load) => {

    return {
        type: LOADING,
        isFetching: load
    }
};
export const isToggleProgress = (flag, userId) => {
    return {type: TOGGLE_IS_FOLLOWING_PROGRESS, isProgress: flag, userId: userId}
}

export const getUsers = (currentPage, pageSize) => {
    return async (dispatch) => {
        dispatch(setCurrentPage(currentPage))
        dispatch(setIsFetching(true))
        dispatch(isToggleProgress(true))
        let data = await UserAPI.getUsers(currentPage, pageSize)
        dispatch(setIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
    }

}
export  const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator)=>{
    dispatch(isToggleProgress(true, userId))

    let response = await apiMethod(userId)

    if (response.data.resultCode == 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(isToggleProgress(false, userId))
}

// export const unfollowing = (userId) => {
//     return async (dispatch) => {
//         dispatch(isToggleProgress(true, userId))
//         let response = await UserAPI.unfollow(userId)
//         if (response.data.resultCode == 0) {
//             dispatch(unfollow(userId))
//         }
//         dispatch(isToggleProgress(false, userId))
//     }
//
// }
// export const following = (userId) => {
//     return async (dispatch) => {
//         dispatch(isToggleProgress(true, userId))
//         let response = await UserAPI.follow(userId)
//         if (response.data.resultCode == 0) {
//             dispatch(follow(userId))
//         }
//         dispatch(isToggleProgress(false, userId))
//     }
// }
export const unfollowing = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, UserAPI.unfollow.bind(UserAPI), unfollow)
    }

}
export const following = (userId) => {
    return async (dispatch) => {

        followUnfollowFlow(dispatch, userId, UserAPI.follow.bind(UserAPI), follow)
    }
}

export const loadingUsers = (page, flag, pageSize) => {
    return async (dispatch) => {
        dispatch(setCurrentPage(page));
        dispatch(setIsFetching(true))
        let data = await UserAPI.getUsers(page, pageSize)
        dispatch(setIsFetching(false))
        dispatch(setUsers(data.items, flag))
    }
}