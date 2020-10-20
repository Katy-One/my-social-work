
import {setAuth} from "./auth-reducer";
import { InferActionsType } from "./redux-store";



type ActionsType= InferActionsType<typeof  actions>
type InitialStateType = {

    initialized: boolean
}
let initialState: InitialStateType= {

    initialized: false
}


const appReducer = (state = initialState, action:ActionsType):InitialStateType  => {

    switch (action.type) {
        case  'SET_INITIALIZED':

            return {
                ...state,
                initialized: true
            }


        default :
            return state
    }
}

const actions ={
    setInitialized : ()=> ({type: 'SET_INITIALIZED' } as const)
}



export const initialzeApp = () => {
    return (dispatch: Function) => {
       let promise = dispatch(setAuth());

      Promise.all([promise]).then(()=>{
           dispatch(actions.setInitialized());
       })

    }

}

export default appReducer