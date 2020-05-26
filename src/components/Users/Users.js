import React, {useState} from "react";

import {NavLink} from "react-router-dom";
import s from "./Users.module.css"
import Pagination from "react-js-pagination";

let Users = (props) => {
    console.log(props)
let page
    let flag = true;
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let portionSize = Math.ceil(pagesCount / 10)

    let [portionNumber, setPortionNumber] = useState(1)
    let leftNum = (portionNumber - 1) * 10 + 1
    let rightNum = portionNumber * 10
    let changePageNext = () => {
        let page = leftNum + 10
        setPortionNumber(portionNumber + 1)
        props.setCurrentPage(page)
    }
    let changePagePrev = () => {
        let page = leftNum - 10
        setPortionNumber(portionNumber - 1)
        props.setCurrentPage(page)
    }
    let handlePageChange = (pageNumber) => {
        props.setCurrentPage(pageNumber)

    }


    let currentClass
    return <div>
        <div className={s.pageNumbers}>
            {/*<Pagination*/}
            {/*    activePage={props.currentPage}*/}
            {/*    itemsCountPerPage={20}*/}
            {/*    totalItemsCount={props.totalUsersCount}*/}
            {/*    pageRangeDisplayed={4}*/}
            {/*    onChange={handlePageChange}*/}

            {/*    // activeClassName={s.active}*/}
            {/*    activeLinkClass={s.active}*/}
            {/*/>*/}
            {leftNum > portionNumber ? <button onClick={changePagePrev}>Prev</button> : ''}

            {pages.filter(p => p >= leftNum && p <= rightNum).map(p => {
                return <span onClick={() => {
                    props.setCurrentPage(p)
                    currentClass = s.activePage
                }} className={props.currentPage === p && s.activePage}>{p}</span>
            })}

            {rightNum < pages.length ? <button onClick={changePageNext}>Next</button> : ''}

        </div>
        <div className={s.usersWrapper}>

            {
                props.users.map((el, i) =>
                    <div>
                        <div className={s.left}>
                            <span>{el.id}</span>
                            <div>
                                <NavLink to={'/profile/' + el.id}>
                                    <img
                                        src={el.photos.small !== null ? el.photos.small : 'https://www.kodefork.com/static/users/images/user.png'}
                                        alt=""/>
                                </NavLink>
                            </div>
                            <div>
                                {el.followed
                                    ? <button disabled={props.followingInProgress.some(id => id == el.id)}
                                              onClick={() => {
                                                  props.unfollowing(el.id)
                                              }}>unfollow</button>
                                    : <button disabled={props.followingInProgress.some(id => id == el.id)}
                                              onClick={() => {
                                                  props.following(el.id)
                                              }}>follow</button>}

                            </div>
                        </div>
                        <div className={s.right}>
                            <div>
                                <div>{el.name}</div>
                                <div>{el.status}</div>
                            </div>
                            <div>
                                <div>{"el.locations.city"}</div>
                                <div>{"el.locations.country"}</div>
                            </div>


                        </div>
                    </div>
                )
            }
            <button onClick={() => {
                props.loadUsers( flag)
            }}>Load more
            </button>
        </div>
    </div>


}

export default Users