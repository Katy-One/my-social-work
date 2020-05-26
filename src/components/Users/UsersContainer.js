import React from "react";

import {connect} from "react-redux";

import {
    following, getUsers, isToggleProgress, loadingUsers,
    setTotalUsersCount,
    unfollowing
} from "../../redux/users-reducer";

import * as axios from "axios";
import Users from "./Users";
import Preloader from "../common/preloader/Preloader";
import {UserAPI} from "../../api/api";
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getSizeSelector,
    gettotalUsersCount,
    getUsersSelector
} from "../../redux/users-selectors";


class UsersContainer extends React.Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.page1 = 1
    }

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
        // this.props.getUsers(this.props.currentPage, this.props.pageSize).then(response => {
        //     return response.data
        // })
        console.log(this.props)
    }
    changePage = () => {

        if(this.page1 >0){
            this.page1 += 1
            this.props.getUsers(this.page1, this.props.pageSize)
        }



    }
    changePagePrev = () => {
        this.page1 -= 1
        if(this.page1 >=1){
            this.props.getUsers(this.page1, this.props.pageSize)
        }
        if(this.page1 <= 0){
            this.page1 = 1
        }
    }
    loadUsers = (flag, page) => {
        debugger
        page = this.props.currentPage;
        page += 1;

        console.log(page);
        this.props.loadingUsers(page, flag, this.props.pageSize)

    }

    setCurrentPage2 = (page) => {
        this.props.getUsers(page, this.props.pageSize)
        // this.props.setCurrentPage(page);
        // this.props.setIsFetching(true)
        // UserAPI.getUsers(page, this.props.pageSize).then(data => {
        //     this.props.setIsFetching(false)
        //     this.props.setUsers(data.items)
        // })


    }
    isFollowed = (page) => {
        this.props.getUsers(page, this.props.pageSize)
        // this.props.setCurrentPage(page);
        // this.props.setIsFetching(true)
        // UserAPI.getUsers(page, this.props.pageSize).then(data => {
        //     this.props.setIsFetching(false)
        //     this.props.setUsers(data.items)
        // })


    }
    isFollow = (page) => {
        this.props.getUsers(page, this.props.pageSize)
        // this.props.setCurrentPage(page);
        // this.props.setIsFetching(true)
        // UserAPI.getUsers(page, this.props.pageSize).then(data => {
        //     this.props.setIsFetching(false)
        //     this.props.setUsers(data.items)
        // })


    }


    render() {
        return <>
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
                   isToggleProgress={this.props.isToggleProgress}
                   changePage={this.changePage}
                   changePagePrev={this.changePagePrev}/>
        </>
    }
}

let mapStateToProps = (state) => {

    return {
        users:getUsersSelector (state) ,
        pageSize: getSizeSelector(state),
        totalUsersCount: gettotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    };
};


export default connect(mapStateToProps, {
    setTotalUsersCount,
    getUsers,
    isToggleProgress,
    following,
    unfollowing,
    loadingUsers

})(UsersContainer)
