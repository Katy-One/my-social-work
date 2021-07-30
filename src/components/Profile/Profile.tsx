import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContaner";
import {profileType} from "../../redux/profile-reducer";
type ProfileProps ={
    profile:  profileType | null,
    setPhotoApi: (file: File)=> void
    saveProfile: (profile: profileType) => Promise<any>
    updateStatus:(status1:string)=>void
    authorizedUserId: number | null
    ownerId:boolean
    ownerId2:any,
    status: string,

}

const Profile:React.FC<ProfileProps> = (props) => {
console.log(props)

    return  <div >
      <ProfileInfo saveProfile={props.saveProfile}
                   ownerId={props.ownerId}
                 ownerId2={props.ownerId2}
                   setPhotoApi={props.setPhotoApi}
                   profile={props.profile}
                   status={props.status}
                   updateStatus={props.updateStatus}
                    // id={props.match.params.userId}
                    // getUsersProfile={props.getUsersProfile}
                   authorizedUserId={props.authorizedUserId}

        />
      <MyPostsContainer/>


    </div>
}

export default Profile