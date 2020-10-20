import React from "react";
import s from './FormControls.module.css'
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from 'redux-form'
import {ValidatorType} from "../../../utils/validator/validator";
import {WrappedFieldInputProps} from "redux-form/lib/Field";

export const TextArea: React.FC<FormControlsPropsType> = (props) => {
    const {input, meta, ...restProps} = props
    const hasError = meta.error && meta.touched
    return (
        <FormControl {...props}>
            <textarea {...input} {...restProps} />
        </FormControl>

    )
}

export const Input: React.FC<FormControlsPropsType> = (props) => {
    console.log(props)
    const {input, meta, ...restProps} = props
    const hasError = meta.error && meta.touched
    return (
        <FormControl {...props}> <input {...input} {...restProps} /></FormControl>


    )
}
type FormControlsPropsType = {
    meta: WrappedFieldMetaProps
    label: string
    input: WrappedFieldInputProps
    // children: React.ReactNode
}


const FormControl: React.FC<FormControlsPropsType> = ({meta: {touched, error}, children, label}) => {

    const hasError = error && touched
    return (
        <div className={hasError ? s.formControls + ' ' + s.error : s.formControls}>

            <div>
                <label htmlFor="">{label}</label>
                {children}
            </div>
            {hasError && <span>{error}</span>}

        </div>

    )
}

export function CreateInput<FormKeysType extends string>(placeholder: string | undefined, name: FormKeysType,
                                                         validate: Array<ValidatorType>,
                                                         component: React.FC<FormControlsPropsType>, props = {}) {

    return <div><Field placeholder={placeholder} name={name} validate={validate}

                       component={component}  {...props}/></div>
}