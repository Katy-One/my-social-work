export const getUsersSelector =(state)=>{
    return state.usersPage.users
}
export const getSizeSelector =(state)=>{
    return state.usersPage.pageSize
}
export const gettotalUsersCount =(state)=>{
    return state.usersPage.totalUsersCount
}
export const getCurrentPage =(state)=>{
    return state.usersPage.currentPage
}
export const getIsFetching =(state)=>{
    return state.usersPage.isFetching
}
export const getFollowingInProgress =(state)=>{
    return state.usersPage.followingInProgress
}