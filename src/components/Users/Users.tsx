import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import s from "./Users.module.css"
import Pagination from "../common/Pagination/Paginations";
import {FilterType, following, getUsers, loadingUsers, unfollowing} from "../../redux/users-reducer";
import User from "./User";
import UsersSourchForm from "./UsersSearchForm";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFilter, getFollowingInProgress,
    getSizeSelector,
    gettotalUsersCount,
    getUsersSelector
} from "../../redux/users-selectors";
import * as queryString from "querystring";


type PropsType = {}

type QueryType = { term?: string; page?: string, friend?: string };
let Users: React.FC<PropsType> = (props) => {
    let flag = true
    const totalUsersCount = useSelector(gettotalUsersCount)
    const pageSize = useSelector(getSizeSelector)
    const currentPage = useSelector(getCurrentPage)
    const users = useSelector(getUsersSelector)
    const filter = useSelector(getFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {

        const parsed = queryString.parse(history.location.search.substr(1)) as QueryType
        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = Number(parsed.page)
        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
        switch (parsed.friend) {
            case 'null':
                actualFilter = {...actualFilter, friend: null}
                break;
            case 'true':
                actualFilter = {...actualFilter, friend: true}
                break;
            case 'false':
                actualFilter = {...actualFilter, friend: false}
                break;
        }

        dispatch(getUsers(actualPage, pageSize, actualFilter))
    }, [])
    useEffect(() => {
        let query: QueryType = {}

        if(!!filter.term) query.term = filter.term
        if(filter.friend !== null    ) query.friend = String(filter.friend)
        if(currentPage !==1) query.page =String( currentPage)
        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])
    const onFilterChange = (filter: FilterType) => {
        dispatch(getUsers(currentPage, pageSize, filter))
    }
    const loadUsers = (flag: boolean, page: number) => {
        page = currentPage;
        page += 1;
        dispatch(loadingUsers(page, flag, pageSize))
    }

    const setCurrentPage = (page: number) => {
        dispatch(getUsers(page, pageSize, filter))
    }

    const follow = (id: number) => {
        dispatch(following(id))
    }
    const unfollow = (id: number) => {
        dispatch(unfollowing(id))
    }

    return <div>
        <UsersSourchForm onFilterChange={onFilterChange}/>
        <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage}
                    totalUsersCount={totalUsersCount} pageSize={pageSize}/>

        <div className={s.usersWrapper}>
            {users.map((el) => <User key={el.id} user={el} followingInProgress={followingInProgress}
                                     unfollowing={unfollow} following={follow}/>)}
            <button onClick={() => {
                loadUsers(flag, currentPage)
            }}>Load more
            </button>
        </div>
    </div>


}


export default Users