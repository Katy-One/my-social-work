import profileReducer from "./profile-reducer";
import messageReducer from "./message-reducer";


let store = {

    _state: {
        profilePage: {
            postInfo: [
                {
                    id: 1,
                    massage: 'post1',
                    like: 12
                },
                {
                    id: 2,
                    massage: 'post2',
                    like: 20
                },
                {
                    id: 3,
                    massage: 'post3',
                    like: 1
                },
            ],
            newPostText: 'it-kamasutra'

        },
        messagePage: {
            messagesList: [
                {
                    id: 1,
                    message: 'Hi'
                },
                {
                    id: 2,
                    message: 'How are you?'
                },
                {
                    id: 3,
                    message: 'How is yore it?'
                },
                {
                    id: 4,
                    message: 'yo!!!!'
                }
            ],
            names: [
                {
                    name: 'Dimych',
                    id: '1'
                }, {
                    name: 'Kate',
                    id: '2'
                }, {
                    name: 'Ann',
                    id: '3'
                }, {
                    name: 'Sveta',
                    id: '4'
                }, {
                    name: 'Andru',
                    id: '5'
                },
            ],
            textMessage: 'lalala'
        },
        navLink: [
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

            },
            {
                link: 'Music',

            },
            {
                link: 'Settings',

            }
        ],
    },
    getState() {

        return this._state
    },
    subscribe(observer) {

        this._renderEntireTree = observer
    },

    _renderEntireTree() {},

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.messagePage = messageReducer(this._state.messagePage, action)
        this._renderEntireTree(this._state)

    }
}



export default store
window.store = store