import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUsersProfile, setPhotoApi, updateStatus, saveProfile} from "../../redux/profile-reducer";

import {Redirect, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/AuthRedirect";
import {compose} from "redux";


class ProfileContainer extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
    }

    changeUserId() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                this.props.history.push('/login')
            }
        }

        this.props.getUsersProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount(props) {
        this.changeUserId()

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(prevProps)
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.changeUserId()
        }


    }

    render() {

        {
            if (this.props.isAuth === false && this.props.location.pathname === '/profile') {
                return <Redirect to={'/login'}/>
            }
        }
        return <>

            <div>
                <Profile setPhotoApi={this.props.setPhotoApi} {...this.props} profile={this.props.profile}
                         status={this.props.status} getUsersProfile={this.props.getUsersProfile}
                         updateStatus={this.props.updateStatus}
                         ownerId={!this.props.match.params.userId}
                         id={this.props.match.params.userId}
                         saveProfile={this.props.saveProfile}/>
            </div>


        </>
    }
}


let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    photo: state.profilePage.photo
})
export default compose(connect(mapStateToProps, {
    getUsersProfile,
    getStatus,
    updateStatus,
    setPhotoApi,
    saveProfile
}), withRouter)(ProfileContainer)