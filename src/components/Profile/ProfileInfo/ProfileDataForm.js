import React from "react";
import {CreateInput, Input, TextArea} from "../../common/FormControls/FormControls";
import { reduxForm} from 'redux-form'

import {required} from "../../../utils/validator/validator";
import style from "../../common/FormControls/FormControls.module.css";

const ProfileDataForm = (props) => {
    console.log(props)
    const { handleSubmit, pristine, reset, submitting, error } = props
    return <form onSubmit={handleSubmit}>
        {props.ownerId &&  <button  disabled={pristine || submitting}>Save</button>}
        <div>{CreateInput('', 'fullName', [required], Input, {type: 'text', label: 'Full Name:'} )}</div>
        <div>{CreateInput('', 'lookingForAJob', [], Input, {type: 'checkbox', label: 'Looking for a job:'} )}</div>
        {/*{props.profile.lookingForAJob &&*/}
        {/*}*/}
      {CreateInput('', 'lookingForAJobDescription', [], TextArea, {type: 'text', label: 'My professional skills:'} )}

   {CreateInput('', 'aboutMe', [], TextArea, {type: 'text', label: 'About me:'} )}

        <div><b>Contact:</b>
            {Object.keys(props.profile.contacts).map(key => {

                return <div key={key}>{CreateInput('', 'contacts.'+ key, [], Input, {type: 'text', label: `${key}:`} )}</div>

                // <Contact contactsTitle={key} contactsValue={props.profile.contacts[key]}/>
            })}
            {
                props.error && <div className={style.formSummeryError}>{props.error}</div>
            }
        </div>


    </form>
}
const ReduxDataForm = reduxForm({
    // a unique name for the form
    form: 'dataForm',

})(ProfileDataForm)


export default  ReduxDataForm