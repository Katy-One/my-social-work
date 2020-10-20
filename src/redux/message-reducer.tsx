import {InferActionsType} from "./redux-store";

let updateNewMessagePost = 'updateNewMessagePost';
let addMessage = 'ADD-Message';
type MessageType = {
    id: number,
    message: string
}
type NameType = {
    name: string,
    id: number

}
let initialState = {
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
    ] as Array<MessageType>,
    names: [
        {
            name: 'Dimych',
            id: 1
        }, {
            name: 'Kate',
            id: 2
        }, {
            name: 'Ann',
            id: 3
        }, {
            name: 'Sveta',
            id: 4
        }, {
            name: 'Andru',
            id: 5
        },
    ] as Array<NameType>,

}
type initialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>
export const actions = {
    addMessageActionCreator: (text: string, id: number) => ({type: addMessage, id: id, text} as const)
}
const messageReducer = (state = initialState, action: ActionsType): initialStateType => {

    switch (action.type) {

        case addMessage:

            let newMessage = {
                id: action.id,
                message: action.text
            };
            return {
                ...state,
                messagesList: [...state.messagesList, newMessage],

            }

        case updateNewMessagePost:
            return {
                ...state,
                //textMessage:action.nextMessage
            }

        default :
            return state
    }


}

export default messageReducer