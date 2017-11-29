import { FETCH_USER } from '../actions/types';

//action.payload returns the user object or an empty ''.
//empty string in js is treated as falsy.
export default function(state = null, action){
    switch(action.type){
        case FETCH_USER:
            return action.payload || false;
        default:
            return state;
    }
}