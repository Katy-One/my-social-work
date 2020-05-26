import React from "react";
import s from './FormControls.module.css'
import {Field} from 'redux-form'
export const TextArea = (props) => {
    const {input, meta, ...restProps} = props
    const hasError = meta.error && meta.touched
    return (
        <FormControl {...props}>
            <textarea {...input} {...restProps} />
        </FormControl>

    )
}
export const Input = (props) => {
    const {input, meta, ...restProps} = props
    const hasError = meta.error && meta.touched
    return (
        <FormControl {...props}> <input {...input} {...restProps} /></FormControl>


    )
}
const FormControl = ({input, meta, ...props}) => {

    const hasError = meta.error && meta.touched
    return (
        <div className={hasError ? s.formControls + ' ' + s.error : s.formControls}>

            <div>
                <label htmlFor="">{props.label}</label>
                {props.children}
            </div>
            {hasError && <span>{meta.error}</span>}

        </div>

    )
}

export const CreateInput = (placeholder, name, validate, component, props = {}, text = '')=>{

  return <div> <Field  placeholder={placeholder} name={name} validate={validate} component={component} {...props}/> {text}</div>
}