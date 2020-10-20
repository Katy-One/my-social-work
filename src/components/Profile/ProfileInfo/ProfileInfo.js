import React, {useState} from "react";
import s from './ProfileInfo.module.css';
import Preloader from "../../common/preloader/Preloader";
import StatusProfile from "./StatusProfile/StatusProfile";
import {unfollow} from "../../../redux/users-reducer";
import ProfileDataForm from "./ProfileDataForm";
import {NavLink, Redirect} from "react-router-dom";

const ProfileInfo = (props) => {
    console.log(props)

    if (!props.profile) {
        return <Preloader/>
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let [editMode, setStateEditMode] = useState(false)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let [state, setState] = useState(false)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let onChangeFile = (e) => {
        e.preventDefault();

        if (e.target.files.length) {
            props.setPhotoApi(e.target.files[0])
        }
    }

    let onSubmitForm = (profile) => {
        console.log(profile)
        props.saveProfile(profile).then(
            () => {
                setStateEditMode(false)
            }
        )


    }
    return (
        <div>

            <div className={s.avatar}>
                <img src={props.profile.photos.large || props.photo} alt=""/>
            </div>

            {props.id == props.authorizedUserId ?
            <div>
                <input type="file" name="myImage" onChange={onChangeFile}/>
            </div> :
                <NavLink to={'/dialogs/' + props.id} onClick={()=> {setState(true)}} className={s.dialog} activeClassName={s.active}>Message</NavLink>

            }

            <StatusProfile status={props.status} updateStatus={props.updateStatus}/>
            {editMode ? <ProfileDataForm initialValues={props.profile} ownerId={props.ownerId} profile={props.profile}
                                         onSubmit={onSubmitForm}/> :
                <ProfileData ownerId={props.ownerId} setStateEditMode={() => {
                    setStateEditMode(true)
                }} profile={props.profile}/>}


        </div>
    )
}
const ProfileData = (props) => {
    return <div>
        {/*{!props.ownerId &&  <Redirect to={'/login'}/>}*/}
        {props.ownerId && <button onClick={props.setStateEditMode}>Edit</button>}
        <div><b>Full name:</b>{props.profile.fullName}</div>
        <div><b>Looking for a job:</b>{props.profile.lookingForAJob ? 'yes' : 'no'} </div>
        {props.profile.lookingForAJob &&
        <div><b>My professional skills:</b> {props.profile.lookingForAJobDescription}</div>
        }
        <div><b>About me:</b> {props.profile.aboutMe}</div>

        <div><b>Contact:</b>
            {Object.keys(props.profile.contacts).map(key => {
                return <Contact key={key} contactsTitle={key} contactsValue={props.profile.contacts[key]}/>
            })}

        </div>


    </div>
}

const Contact = ({contactsTitle, contactsValue}) => {
    return <div>
        <b>{contactsTitle}:</b> <span>{contactsValue}</span>
    </div>

}
export default ProfileInfo