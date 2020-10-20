let initialState =[
    {
        link: 'Profile',
        path: '/profile/6880'
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

const sideBarReducer = (state = initialState, action: object) => {

   return state
}

export default sideBarReducer