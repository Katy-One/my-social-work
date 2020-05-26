const addnews = 'addnews'
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
    ]
}


const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case addnews:
            const userForRemoveId = action.id
            let arr = state.allNews.filter((user) => {
                return user.id !== userForRemoveId;
            })
            debugger
            return {
                ...state,
                allNews: arr

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

// export const UpdateNewPostActionCreator = (text) => {
//
//    return {
//       type: updateNewTextPost,
//       nextText: text
//    }
// };