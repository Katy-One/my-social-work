let initialState =[
    {
        link: 'Profile',
        path: '/profile'
    },
    {
        link: 'Massage',
        path: '/dialogs'
    },
    {
        link: 'News',
        path: '/news'

    },
    {
        link: 'Users',
        path: '/users'

    },{
        link: 'Music',

    },
    {
        link: 'Settings',

    }
]

const sideBarReducer = (state = initialState, action) => {

   return state
}

export default sideBarReducer