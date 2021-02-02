import { LOGIN,LOGOUT} from '../constants'

const initialState={
    user:null,
}
const AuthenticationReducer=(state=initialState,action)=>{
    switch(action.type){
        case LOGIN:
            return {
                user:{...action.payload.user}
            }
        case LOGOUT:
            return {
                user:null
            }
        default:
            return state;
    }
}

export default AuthenticationReducer;