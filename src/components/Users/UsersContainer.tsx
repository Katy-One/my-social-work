import React from "react";

import {connect} from "react-redux";

import {
    following, getUsers, loadingUsers,
    unfollowing, UserType
} from "../../redux/users-reducer";

import Users from "./Users";
import Preloader from "../common/preloader/Preloader";
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getSizeSelector,
    gettotalUsersCount,
    getUsersSelector
} from "../../redux/users-selectors";
import {AppStateType} from "../../redux/redux-store";
import {compose} from "redux";

type MapStatePropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: Array<UserType>
    followingInProgress: Array<number>
    isFetching: boolean

}

type MapDistpatchType = {
    getUsers: (currentPage: number, pageSize: number) => void
    unfollowing: (id: number) => void
    following: (id: number) => void
    loadingUsers: (currentPage: number, flag: boolean, pageSize: number) => void
}
type  OwnProperty = {
    title: string
}
type PropsType = MapStatePropsType & MapDistpatchType & OwnProperty

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)

    }


    loadUsers = (flag: boolean, page: number) => {
        debugger
        page = this.props.currentPage;
        page += 1;
        this.props.loadingUsers(page, flag, this.props.pageSize)

    }

    setCurrentPage2 = (page: number) => {
        this.props.getUsers(page, this.props.pageSize)
    }


    render() {
        return <>
            <h2>{this.props.title}</h2>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   users={this.props.users}
                   setCurrentPage={this.setCurrentPage2}
                   following={this.props.following}
                   unfollowing={this.props.unfollowing}
                   loadUsers={this.loadUsers}
                   currentPage={this.props.currentPage}
                   followingInProgress={this.props.followingInProgress}

            />
        </>
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {

    return {
        users: getUsersSelector(state),
        pageSize: getSizeSelector(state),
        totalUsersCount: gettotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    };
};


export default compose(
    connect<MapStatePropsType, MapDistpatchType, OwnProperty, AppStateType>(mapStateToProps, {
        getUsers,
        following,
        unfollowing,
        loadingUsers

    }))(UsersContainer)
   