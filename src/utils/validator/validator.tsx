export type ValidatorType = (value:string)=> string | undefined
export const required:ValidatorType = value =>{
    if(value) return undefined;
    return  'Field is required'
}

 const maxLength = (max:number):ValidatorType=> (value) => {
    if(value && value.length > max) return `Must be ${max} characters or less`
    return  undefined
}

export const maxLength10 = maxLength(10)




