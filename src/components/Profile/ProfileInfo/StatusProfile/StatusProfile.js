import React, {useEffect, useState} from "react";


const StatusProfile = (props) => {
    let [editMode, setStateEditMode] = useState(false)
    let [status, setStateStatus] = useState(props.status)

    useEffect(() => {
        setStateStatus(props.status)
    }, [props.status])


    let activateMode = () => {
        setStateEditMode(true)
    }
    let deActivateMode = () => {
        setStateEditMode(false)
        props.updateStatus(status)
    }
    let updateStatus = (e) => {

        setStateStatus(e.currentTarget.value)

    }

    return <div>
        {!editMode &&
        <span onDoubleClick={activateMode}>{props.status || 'here can be your status...'}</span>
        }
        {editMode &&
        < input onChange={updateStatus} autoFocus={true} onBlur={deActivateMode} value={status} type="text"/>
        }
    </div>


}

export default StatusProfile