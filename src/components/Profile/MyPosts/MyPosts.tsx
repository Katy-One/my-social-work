import React from "react";
import MyPost from './MyPost/MyPost'
import {Field, reset, reduxForm, InjectedFormProps} from 'redux-form'
import {maxLength10, required} from "../../../utils/validator/validator";
import {CreateInput, Input, TextArea} from "../../common/FormControls/FormControls";
import {Dispatch} from "redux";
import {postInfoType} from "../../../redux/profile-reducer";

type PostFormType = {
    newPostText: string
}
type PostFormKeysType = keyof PostFormType
interface Props {
    // text: string |null
}
const MyPostForm: React.FC<InjectedFormProps<PostFormType, Props> & Props> = (props) => {
    const {handleSubmit, pristine, reset, submitting} = props
    // const {createRecord, resetForm} = props;


    return (

        <form onSubmit={props.handleSubmit}>

            {CreateInput<PostFormKeysType>('post text', 'newPostText', [required, maxLength10], TextArea)}

            <div>
                {/*<Field name='post_text' component={TextArea} validate={[required, maxLength10]}/>*/}
            </div>


            <button disabled={props.pristine || props.submitting}>Add post</button>
        </form>
    )

}
const afterSubmit = (result: any, dispatch: Dispatch<any>) => dispatch(reset('login'));
const ReduxMyPostForm = reduxForm<PostFormType , Props>({
    // a unique name for the form
    form: 'login',
     // onSubmitSuccess: afterSubmit,
})(MyPostForm)
type MyPostsProps ={
    posts: Array<postInfoType>,
    // newPostText:string
}
export type DispatchPostsProps ={
    addPostText: (id:number, text:string)=>void,
    // updateNewPostText:( text:string)=>void,
}
const MyPosts: React.FC<MyPostsProps & DispatchPostsProps> = (props) => {
    console.log(props)
    let arr_post = props.posts.map((el, i) => <MyPost massage={el.massage} id={i + 1} like={el.like}/>);
    //let newPostElement = React.createRef()
    // const onPostChange = () => {
    //     let text = newPostElement.current.value;
    // }
    let submitPostForm = (data:PostFormType) => {
        let id = props.posts.length + 1;
        let text = data.newPostText
        props.addPostText(id, text)
        // props.updateNewPostText(text)
    }
    return <div>
        <div>
            <h3> My post</h3>
        </div>
        {/*text={props.newPostText}*/}
        < ReduxMyPostForm onSubmit={submitPostForm} />
        <div>
            {arr_post}
        </div>
    </div>
}
export default MyPosts