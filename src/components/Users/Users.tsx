import React, {useState} from "react";

import {NavLink} from "react-router-dom";
import s from "./Users.module.css"
import Pagination from "../common/Pagination/Paginations";
import {UserType} from "../../redux/users-reducer";
import User from "./User";

type PropsType = {

    totalUsersCount: number
    pageSize: number
    setCurrentPage: (page: number) => void,
    currentPage: number,
    users: Array<UserType>,
    followingInProgress: Array<number>
    unfollowing: (id: number) => void
    following: (id: number) => void
    loadUsers: (flag: boolean, page: number) => void

}

let Users: React.FC<PropsType> = ({setCurrentPage, currentPage, totalUsersCount, pageSize, users,
                                      followingInProgress, unfollowing, following, loadUsers}) => {
    let flag = true
    return <div>
        <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage}
                    totalUsersCount={totalUsersCount} pageSize={pageSize}/>

        <div className={s.usersWrapper}>
            {
                users.map((el) => <User key={el.id} user={el} followingInProgress={followingInProgress} unfollowing={unfollowing}
                               following={following}/>
                    // <div>
                    //     <div className={s.left}>
                    //         <span>{el.id}</span>
                    //         <div>
                    //             <NavLink to={'/profile/' + el.id}>
                    //                 <img
                    //                     src={el.photos.small !== null ? el.photos.small : 'https://www.kodefork.com/static/users/images/user.png'}
                    //                     alt=""/>
                    //             </NavLink>
                    //         </div>
                    //         <div>
                    //             {el.followed
                    //                 ? <button disabled={followingInProgress.some(id => id == el.id)}
                    //                           onClick={() => {
                    //                               unfollowing(el.id)
                    //                           }}>unfollow</button>
                    //                 : <button disabled={followingInProgress.some(id => id == el.id)}
                    //                           onClick={() => {
                    //                               following(el.id)
                    //                           }}>follow</button>}
                    //
                    //         </div>
                    //     </div>
                    //     <div className={s.right}>
                    //         <div>
                    //             <div>{el.name}</div>
                    //             <div>{el.status}</div>
                    //         </div>
                    //         <div>
                    //             <div>{"el.locations.city"}</div>
                    //             <div>{"el.locations.country"}</div>
                    //         </div>
                    //
                    //
                    //     </div>
                    // </div>
                )
            }
            <button onClick={() => {
                loadUsers(flag, currentPage)
            }}>Load more
            </button>
        </div>
    </div>


}

export default Users