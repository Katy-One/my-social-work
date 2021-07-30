import React, {ChangeEvent, useState} from "react";
import s from './ProfileInfo.module.css';
import Preloader from "../../common/preloader/Preloader";
import StatusProfile from "./StatusProfile/StatusProfile";
import ProfileDataForm from "./ProfileDataForm";
import {NavLink} from "react-router-dom";
import {contactType, PhotosType, profileType} from "../../../redux/profile-reducer";
type ProfileInfoType ={
    profile:  profileType | null,
    setPhotoApi: (file: File)=> void
    updateStatus:(status1:string)=>void
    // aboutMe: string,
    // lookingForAJob: boolean,
    // lookingForAJobDescription: string,
    // fullName: string,
    // userId: number,
    // contacts: contactType,
    // photos: PhotosType
    saveProfile: (profile: profileType) => Promise<any>
  //  authorizedUserId: number
    ownerId:boolean
    status: string,
    ownerId2:any,
    authorizedUserId: number | null
    // posts: string,
  //  id: number,
}
const ProfileInfo: React.FC<ProfileInfoType> = (props) => {

    if (!props.profile) {
        return <Preloader/>
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let [editMode, setStateEditMode] = useState(false)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let [state, setState] = useState(false)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let onChangeFile = (e:ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files.length) {
            console.log(e.target.files[0])
            props.setPhotoApi(e.target.files[0])
        }
    }

    let onSubmitForm = (profile:profileType) => {

        props.saveProfile(profile).then(
            () => {
                setStateEditMode(false)
            }
        )
    }
    return (
        <div>
            <NavLink  to='/users'>user</NavLink>
            <div className={s.avatar}>
                <img src={props.profile.photos.large || ''} alt=""/>
            </div>

            {!props.ownerId && props.profile.userId == props.authorizedUserId &&
            <div>
                <input type="file" name="myImage" onChange={onChangeFile}/>
            </div>
                // vLink to={'/dialogs/' + props.id} onClick={()=> {setState(true)}} className={s.dialog} activeClassName={s.active}>Message</NavLink>

            }

            <StatusProfile status={props.status} updateStatus={props.updateStatus}/>
            {editMode ? <ProfileDataForm
                    initialValues={props.profile}
                    ownerId={props.ownerId}
                    profile={props.profile}
                    onSubmit={onSubmitForm}/> :
                <ProfileData ownerId={props.ownerId}
                             authorizedUserId={props.authorizedUserId}
                             setStateEditMode={() => {
                                    setStateEditMode(true)}}
                             profile={props.profile}/>}


        </div>
    )
}
type ProfileDataType ={
    ownerId:boolean
    setStateEditMode:()=> void
    profile: profileType
    authorizedUserId: number | null
}
const ProfileData: React.FC<ProfileDataType> = (props) => {
    return <div>
        {/*{!props.ownerId &&  <Redirect to={'/login'}/>}*/}
        {props.profile.userId == props.authorizedUserId && <button onClick={props.setStateEditMode}>Edit</button>}
        <div><b>Full name:</b>{props.profile.fullName}</div>
        <div><b>Looking for a job:</b>{props.profile.lookingForAJob ? 'yes' : 'no'} </div>
        {props.profile.lookingForAJob &&
        <div><b>My professional skills:</b> {props.profile.lookingForAJobDescription}</div>
        }
        <div><b>About me:</b> {props.profile.aboutMe}</div>

        <div><b>Contact:</b>
            {Object.keys(props.profile.contacts).map(key => {
                return <Contact key={key} contactsTitle={key} contactsValue={props.profile.contacts[key as keyof contactType]}/>
            })}

        </div>


    </div>
}
type ContactsTypeProps ={
    contactsTitle: string
    contactsValue:string
}
const Contact: React.FC <ContactsTypeProps> = ({contactsTitle, contactsValue}) => {
    return <div>
        <b>{contactsTitle}:</b> <span>{contactsValue}</span>
    </div>

}
export default ProfileInfo