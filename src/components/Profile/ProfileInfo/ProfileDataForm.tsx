import React from "react";
import {CreateInput, Input, TextArea} from "../../common/FormControls/FormControls";
import {InjectedFormProps, reduxForm} from 'redux-form'

import {required} from "../../../utils/validator/validator";
import style from "../../common/FormControls/FormControls.module.css";
import {LoginFormType} from "../../Login/Login";
import {profileType} from "../../../redux/profile-reducer";

type  ProfileDataFormType ={


}
type ProfileDataFormKeysType = keyof profileType
interface Props {
    ownerId:boolean
    profile: profileType

}
const ProfileDataForm:React.FC <InjectedFormProps <profileType  , Props >& Props > = (props) => {
    console.log(props)
    const {handleSubmit, pristine, reset, submitting, error} = props
    return <form onSubmit={handleSubmit}>
        {props.ownerId && <button disabled={pristine || submitting}>Save</button>}
        <div>{CreateInput<ProfileDataFormKeysType>('', 'fullName', [required], Input, {type: 'text', label: 'Full Name:'})}</div>
        <div>{CreateInput<ProfileDataFormKeysType>('', 'lookingForAJob', [], Input, {type: 'checkbox', label: 'Looking for a job:'})}</div>
        {CreateInput<ProfileDataFormKeysType>('', 'lookingForAJobDescription', [], TextArea, {type: 'text', label: 'My professional skills:'})}
        {CreateInput<ProfileDataFormKeysType>('', 'aboutMe', [], TextArea, {type: 'text', label: 'About me:'})}

        <div><b>Contact:</b>
            {Object.keys(props.profile.contacts).map(key => {
                // todo: create some solution
                return <div key={key}>{CreateInput('', 'contacts.' + key, [], Input, {
                    type: 'text',
                    label: `${key}:`
                })}</div>
            })}
            {
                props.error && <div className={style.formSummeryError}>{props.error}</div>
            }
        </div>


    </form>
}
const ReduxDataForm = reduxForm <profileType, Props>({
    // a unique name for the form
    form: 'dataForm',

})(ProfileDataForm)


export default ReduxDataForm