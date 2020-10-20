import React, {useState} from 'react';
import s from './Dialogs.module.css';
import {NavLink, Redirect, Route} from "react-router-dom";
import {addMessageActionCreator, UpdateMessagePostActionCreator} from "../../redux/message-reducer";
import {Field, reduxForm} from 'redux-form'
import {TextArea} from "../common/FormControls/FormControls";
import {maxLength10, required} from "../../utils/validator/validator";
import NewsContainer from "../News/NewsContainer";


const DialogsForm = (props) => {
    const {handleSubmit, load, pristine, reset, submitting} = props
    return (

        <form onSubmit={props.handleSubmit}>


            <div>
                <Field placeholder={'post text'} name={'post_text'} component={TextArea}
                       validate={[required, maxLength10]}/>
            </div>


            <button disabled={props.pristine || props.submitting}>Add post</button>
        </form>
    )

}


const ReduxDialogsForm = reduxForm({
    // a unique name for the form
    form: 'login'
})(DialogsForm)

const DialogItem = (props) => {
    const UserMessage = (e) => {
        props.setState(true)
    }

    let path = '/dialogs/' + props.id;
    return (

        <NavLink to={path} className={s.dialog} activeClassName={s.active}>{props.name}</NavLink>

    )
}

const Message = (props) => {
    return (
        <div className="message">{props.message}</div>
    )
}
const Dialogs = (props) => {
    let id = props.match.params.id
    console.log(id)
    // let [state, setState] = useState(false)
    let addSubmit = (value) => {
        props.addMessageActionCreator(value.post_text, id)
    }

    return (
        <div className={s.dialogs}>
            {id ? <div>
                    <ReduxDialogsForm onSubmit={addSubmit}/>
                    <div>
                        {props.message.map((el, i) => {
                            if (id == el.id) {
                                return  <Message message={el.message}/>
                            }

                        } )}
                    </div>
                </div> :
                <div className={s.dialogsItem}>
                    {props.dialogs.map((el, i) =>
                        <DialogItem  name={el.name} id={el.id}/>
                    )}
                </div>


            }
        </div>)
}


export default Dialogs
