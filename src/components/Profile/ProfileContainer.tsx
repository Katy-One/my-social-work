import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getStatus,
    getUsersProfile,
    setPhotoApi,
    updateStatus,
    saveProfile,
    profileType
} from "../../redux/profile-reducer";

import {Redirect, withRouter, RouteComponentProps} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/AuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapDistpatchType = {
    getUsersProfile: (userId: number) => void,
    getStatus: (userId: number) => void,
    updateStatus: (status1: string) => void
    setPhotoApi: (file: File) => void,
    saveProfile: (profile: profileType) => Promise<any>
}
type OwnProperty = {}
type PathParamsType = {
    userId: string
}


type PropsType = MapStatePropsType & MapDistpatchType & OwnProperty & RouteComponentProps<PathParamsType>;

class ProfileContainer extends React.Component<PropsType> {
    constructor(props: PropsType) {

        super(props);
    }

    changeUserId() {
        let userId: number | null = +this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getUsersProfile(userId as number)
        this.props.getStatus(userId as number)
    }

    componentDidMount() {
        this.changeUserId()
    }
    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.changeUserId()
        }
    }

    render() {

        {
            // if (this.props.isAuth === false && this.props.location.pathname === '/profile') {
            //     return <Redirect to={'/login'}/>
            // }
        }
        return <>

            <div>
                <Profile  {...this.props}
                          ownerId={!this.props.match.params.userId}
                          profile={this.props.profile}
                          status={this.props.status}
                          updateStatus={this.props.updateStatus}
                          saveProfile={this.props.saveProfile}
                    // getUsersProfile={this.props.getUsersProfile}
                    // id={this.props.match.params.userId }
                    // setPhotoApi={this.props.setPhotoApi}
                />
            </div>


        </>
    }
}


let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    // photo: state.profilePage.photo
})
export default compose<React.ComponentType>(connect(mapStateToProps, {
    getUsersProfile,
    getStatus,
    updateStatus,
    setPhotoApi,
    saveProfile
}), withRouter)(ProfileContainer)
