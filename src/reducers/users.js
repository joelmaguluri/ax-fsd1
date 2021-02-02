import { SET_USERS } from '../constants'

const initialState={
    users:[],
}
const UserReducer=(state=initialState,action)=>{
    switch(action.type){
        case SET_USERS:
            {
            const {users}=action.payload
            return {
                users:Object.values(users)
            }
        }
        default:
            return state;
    }
}

export default UserReducer;