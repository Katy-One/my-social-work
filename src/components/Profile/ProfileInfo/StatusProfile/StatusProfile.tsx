import React, {useEffect, useState} from "react";
type PropsType={
    status: string
    updateStatus:(status1:string)=>void
}
type StateType={


}

const StatusProfile : React.FC<PropsType> = ({status, updateStatus}) => {
    console.log(status)
    let [editMode, setStateEditMode] = useState(false)
    let [status1, setStateStatus] = useState(status)

    useEffect(() => {
        setStateStatus(status)
    }, [status])


    let activateMode = () => {
        setStateEditMode(true)
    }
    let deActivateMode = () => {
        setStateEditMode(false)
      updateStatus(status1)
    }
    let updateStatusNew = (e:any) => {

        setStateStatus(e.currentTarget.value)

    }

    return <div>
        {!editMode &&
        <span onDoubleClick={activateMode}>{status || 'here can be your status...'}</span>
        }
        {editMode &&
        < input onChange={updateStatusNew} autoFocus={true} onBlur={deActivateMode} value={status1} type="text"/>
        }
    </div>


}

export default StatusProfile