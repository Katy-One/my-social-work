import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profile-reducer";
import messageReducer from "./message-reducer";
import sideBarReducer from "./sidebar-reducer";
import newsReducer from "./news-reducer";
import usersReducer from "./users-reducer";
import autorReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
import appReducer, {initialzeApp} from "./app-reducer";
import {ThunkAction} from "redux-thunk";


let reducersRoot = combineReducers({

    profilePage: profileReducer,
    messagePage: messageReducer,
    navLink: sideBarReducer,
    newsPage: newsReducer,
    usersPage: usersReducer,
    auth: autorReducer,
    form: formReducer,
    initialzeAppPage: appReducer
})
type RootReducerType = typeof reducersRoot;
export type AppStateType = ReturnType<RootReducerType>;
// type PropertyTypes<T> = T extends { [key: string]: infer U } ? U : never
// export type  InferActionsType<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertyTypes<T>>
 export type  InferActionsType<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never
export type BasicThunkType<A extends Action, R=Promise<void>> = ThunkAction<R, AppStateType, unknown, A>



// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducersRoot, composeEnhancers(
    applyMiddleware(thunkMiddleware)
))
//let store = createStore(reducers, applyMiddleware(thunkMiddleware))
export default store