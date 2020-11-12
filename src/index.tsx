import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';
import store from './redux/redux-store'
import App from './App';
import {Provider} from "react-redux";
import {BrowserRouter, HashRouter} from "react-router-dom";
//
// let renderEntireTree = (state) => {
//
//
//
// }
ReactDOM.render(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Provider store={store}>

            <App  />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);
// renderEntireTree(store.getState())
// store.subscribe(() => {
//     let state = store.getState()
//     renderEntireTree(state)
// })


// eslint-disable-next-line no-undef

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


