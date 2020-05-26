import React from 'react';
import './App.css';
import {Route, withRouter} from "react-router-dom";
//import DialogsContainer from "./components/Dialogs/DialogsContainer";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import NewsContainer from "./components/News/NewsContainer";
import UsersContainer from "./components/Users/UsersContainer";

//import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initialzeApp} from "./redux/app-reducer";
import Preloader from "./components/common/preloader/Preloader";
import {withSuspense} from "./hoc/WithSuspense";
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const  DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));


class App extends React.Component {
    componentDidMount() {
        this.props.initialzeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (


            <div className='app-wrapper'>
                <HeaderContainer/>
                <NavbarContainer/>
                <div className='app-wrapper-content'>

                    <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)}/>
                    <Route path='/dialogs/:id?' render={withSuspense(DialogsContainer)}/>
                    <Route path='/news' render={() => <NewsContainer/>}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/login' render={() => <Login/>}/>

                </div>
            </div>

        );
    }
}

let mapStateToProps = (state) => {
    return {
        initialized: state.initialzeAppPage.initialized,
    };
};
export default compose(withRouter, connect(mapStateToProps, {initialzeApp}))(App)


