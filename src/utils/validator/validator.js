export const required = value =>{
    if(value) return undefined;
    return  'Field is required'
}

 const maxLength = max=> value => {
    if(value && value.length > max) return `Must be ${max} characters or less`
    return  undefined
}

export const maxLength10 = maxLength(10)




