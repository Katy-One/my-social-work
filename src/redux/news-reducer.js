const addnews = 'addnews'
const ACTIVE = 'ACTIVE'
let initialState = {
    allNews: [
        {
            id: 0,
            data: '23.10.2020',
            news: 'la la la la ',
            author: 'Katy',
            newsState: false
        },
        {
            id: 1,
            data: '14.05.2020',
            news: 'pa pa pa pa  ',
            author: 'Ann',
            newsState: false
        },
        {
            id: 2,
            data: '18.09.2020',
            news: 'yo yo yo yo yo ',
            author: 'Jack',
            newsState: false
        }
    ],
    active: 0
}


const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case addnews:
            const userForRemoveId = action.id
            let arr = state.allNews.filter((user) => {
                return user.id !== userForRemoveId;
            })

            return {
                ...state,
                allNews: arr

            }
        case ACTIVE:

            return {
                ...state,
                active: action.active

            }

        default :
            return state
    }
}

export default newsReducer
export const addNewsActionCreator = (id) => {

    return {
        type: addnews,
        id: id
    }
};
export const addActive = (id) => {

    return {
        type: ACTIVE,
        active: id
    }
};

// export const UpdateNewPostActionCreator = (text) => {
//
//    return {
//       type: updateNewTextPost,
//       nextText: text
//    }
// };