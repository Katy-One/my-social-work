import {UserType} from "../redux/users-reducer";



export  const updateObjectInArr = (item:any,  actionId:any, propName:any, newObj:any)=>{
  return  item.map((el:any) => {

        if (el[propName] === actionId) {
            // console.log({...el, ...newObj})
            return {...el, ...newObj}
        }
        // console.log(el)
        return el
    })
}