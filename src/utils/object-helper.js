export  const updateObjectInArr = (item,  actionId, propName, newObj)=>{
  return  item.map((el) => {

        if (el[propName] === actionId) {
            return {...el, ...newObj}
        }
        return el
    })
}