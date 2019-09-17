import * as REDUCER from '../actions/types';

const INITIAL_STATE = {
    data: [],
    error: '',
    deletUser: false,
    isAdmin: 0,

};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REDUCER.DATA_SUCCESS:
            return {...state, data: action.payload}
        case REDUCER.DATA_FAIL:
            return {...state, error: action.payload}
        case REDUCER.LOGIN_SUCCESS:
            return {...state, isAdmin: action.payload}
        case REDUCER.LOGIN_FAIL:
            return {...state, isAdmin: 0, error: action.payload}
        case REDUCER.DELETE_SUCCESS:
            return {...state, deletUser: action.payload}
        case REDUCER.DELETE_FAIL:
            return {...state, deletUser: false, error: action.payload}
        case REDUCER.ADD_SUCCESS:
            return {...state };
        case REDUCER.ADD_FAIL:
            return {...state, error: action.payload }
        case REDUCER.LOGOUT:
            return { ...INITIAL_STATE }
        default:
            return state;
    }
}
