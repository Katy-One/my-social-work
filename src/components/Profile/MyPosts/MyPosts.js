import React from "react";
import MyPost from './MyPost/MyPost'
import {Field,reset, reduxForm} from 'redux-form'
import { maxLength10, required} from "../../../utils/validator/validator";
import {TextArea} from "../../common/FormControls/FormControls";


const MyPostForm = (props) => {
    const {handleSubmit, load, pristine, reset, submitting} = props
    const {createRecord, resetForm} = props;



    return (

        <form onSubmit={props.handleSubmit}>


            <div>
                <Field   name='post_text' component={TextArea} validate={[required, maxLength10]}/>
            </div>


            <button disabled={props.pristine || props.submitting}>Add post</button>
        </form>
    )

}

const afterSubmit = (result, dispatch) =>
    dispatch(reset('login'));
const ReduxMyPostForm = reduxForm({
    // a unique name for the form
    form: 'login',
    onSubmitSuccess: afterSubmit,
})(MyPostForm)

const MyPosts = (props) => {
    console.log("props")
    let arr_post = props.posts.map((el, i) => <MyPost massage={el.massage} id={i + 1} like={el.like}/>);
    let newPostElement = React.createRef()
    const addPost = () => {


    }
    const onPostChange = () => {

        let text = newPostElement.current.value;


    }
    let submitPostForm = (data) => {
        console.log(data)
        let id = props.posts.length + 1;
        let text = data.post_text

        props.addPostText(id, text)

        props.updateNewPostText(text)
    }
    return <div>
        <div>
            <h3> My post</h3>
            {/*<textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}/>*/}
            {/*<button onClick={addPost}>add button</button>*/}

        </div>
        < ReduxMyPostForm onSubmit={submitPostForm} text={props.NewPostText}/>
        <div>
            {arr_post}
        </div>
    </div>
}
export default MyPosts