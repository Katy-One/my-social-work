import React from 'react';
import s from './Dialogs.module.css';
import {NavLink} from "react-router-dom";
import {initialStateType, MessageType, NameType} from "../../redux/message-reducer";
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {CreateInput, TextArea} from "../common/FormControls/FormControls";
import {maxLength10, required} from "../../utils/validator/validator";


export  type NewMassageFormType = {
    post_text: string
}
type  NewMassageFormKeysType = keyof NewMassageFormType

interface Props {

}

const DialogsForm: React.FC<InjectedFormProps<NewMassageFormType, Props> & Props> = (props) => {
    const {handleSubmit, pristine, reset, submitting} = props
    return (

        <form onSubmit={props.handleSubmit}>


            <div>
                {CreateInput<NewMassageFormKeysType>('post text', 'post_text', [required, maxLength10], TextArea)}

                {/*<Field placeholder={'post text'} name={'post_text'} component={TextArea}*/}
                {/*       validate={[required, maxLength10]}/>*/}
            </div>


            <button disabled={props.pristine || props.submitting}>Add post</button>
        </form>
    )

}


const ReduxDialogsForm = reduxForm<NewMassageFormType>({
    // a unique name for the form
    form: 'login'
})(DialogsForm)

const DialogItem: React.FC<NameType> = (props) => {
    let path = '/dialogs/' + props.id;
    return (
        <NavLink to={path} className={s.dialog} activeClassName={s.active}>{props.name}</NavLink>
    )
}
const Message: React.FC<MessageType> = (props) => {
    return (
        <div className="message">{props.message}</div>
    )
}
type ownPropsType2 = {
    message: any
}
type ownPropsType3 = {
    name: any,
    id: any
}
type ownPropsType = {
    dialogsPage: initialStateType,
    addMessageActionCreator: (messageText: string, id:number) => void,
    match: any,
    id: any,

}
const Dialogs: React.FC<ownPropsType> = (props) => {
    let state = props.dialogsPage

 let id = 1
    // console.log(id)
    // let [state1, setState] = useState(false)
    let addSubmit = (value: NewMassageFormType) => {
        props.addMessageActionCreator(value.post_text, id)
    }

    return (
        // <div className={s.dialogs}>
        //     {id ?
        //         <div>
        //             <ReduxDialogsForm onSubmit={addSubmit}/>
        //             <div>
        //                 {state.messagesList.map((el, i) => {
        //                     if (id == el.id) {
        //                         return <Message message={el.message} id={el.id}/>
        //                     }
        //
        //                 })}
        //             </div>
        //         </div> :
        //         <div className={s.dialogsItem}>
        //             {state.names.map((el, i) =>
        //                 <DialogItem name={el.name} id={el.id}/>
        //             )}
        //         </div>
        //
        //
        //     }
        // </div>
        <div className={s.dialogs}>
            <div>

                <div>
                    {state.names.map((el, i) => {
                        // if (id == el.id) {
                        return <Message message={el.name} id={el.id}/>
                        // }

                    })}
                </div>
                <ReduxDialogsForm onSubmit={addSubmit}/>
            </div>
                <div className={s.dialogsItem}>
                    {state.messagesList.map((el, i) =>
                        <DialogItem name={el.message} id={el.id}/>
                    )}
                </div>

        </div>
    )
}


export default Dialogs
