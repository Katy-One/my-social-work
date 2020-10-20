import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContaner";


const Profile = (props) => {
console.log(props)

    return  <div >
      <ProfileInfo saveProfile={props.saveProfile} ownerId={props.ownerId} id={props.match.params.userId} getUsersProfile={props.getUsersProfile} setPhotoApi={props.setPhotoApi} profile={props.profile} authorizedUserId={props.authorizedUserId}  status={props.status} updateStatus={props.updateStatus}/>
      <MyPostsContainer/>


    </div>
}

export default Profile