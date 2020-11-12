import React from 'react';
import './App.css';
import {Route, withRouter} from "react-router-dom";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import NewsContainer from "./components/News/NewsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initialzeApp} from "./redux/app-reducer";
import Preloader from "./components/common/preloader/Preloader";
import {withSuspense} from "./hoc/WithSuspense";
import {AppStateType} from "./redux/redux-store";
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const  DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
type DispatchPropsType ={
    initialzeApp: ()=> void
}
type MapPropsType= ReturnType<typeof mapStateToProps>
const SuspendDialogs =withSuspense(DialogsContainer)
const SuspendProfile=withSuspense(ProfileContainer)
class App extends React.Component<DispatchPropsType & MapPropsType> {
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

                    <Route path='/profile/:userId?' render={()=><SuspendProfile/>}/>
                    <Route path='/dialogs/:id?' render={() => <SuspendDialogs/>}/>
                    <Route path='/news' render={() => <NewsContainer/>}/>
                    <Route  path='/users' render={() => <UsersContainer title={"jjjjj"}/>}/>
                    <Route path='/login' render={() => <Login/>}/>

                </div>
            </div>

        );
    }
}

let mapStateToProps = (state:AppStateType) => {
    return {
        initialized: state.initialzeAppPage.initialized,
    };
};
export default compose<React.ComponentType>(withRouter, connect(mapStateToProps, {initialzeApp}))(App)


