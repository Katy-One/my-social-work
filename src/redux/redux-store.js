import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profile-reducer";
import messageReducer from "./message-reducer";
import sideBarReducer from "./sidebar-reducer";
import newsReducer from "./news-reducer";
import usersReducer from "./users-reducer";
import autorReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
import appReducer, {initialzeApp} from "./app-reducer";


let reducers = combineReducers({

    profilePage: profileReducer,
    messagePage: messageReducer,
    navLink: sideBarReducer,
    newsPage: newsReducer,
    usersPage: usersReducer,
    auth: autorReducer,
    form: formReducer,
    initialzeAppPage: appReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunkMiddleware)
))
//let store = createStore(reducers, applyMiddleware(thunkMiddleware))
export default store