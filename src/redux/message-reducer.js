let updateNewMessagePost = 'updateNewMessagePost';
let addMessage = 'ADD-Message';

let initialState =  {
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

}
const messageReducer = (state = initialState, action) => {

    switch (action.type) {

        case addMessage:

            let newMessage = {
                id: action.id,
                message: action.text
            };
            return {
                ...state,
                messagesList:  [...state.messagesList, newMessage],

            }

        case updateNewMessagePost:
            return {
                ...state,
                textMessage:action.nextMessage
            }

        default :
            return state
    }


}
export const addMessageActionCreator = (text, id) => {

    return {
        type: addMessage,

        id: id,
        text
    }
};

export default messageReducer