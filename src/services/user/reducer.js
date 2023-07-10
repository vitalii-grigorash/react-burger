import { SET_AUTH_CHECKED, SET_USER } from './types';

const initialState = {
    user: null,
    isAuthChecked: false,
};

export  const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_CHECKED:
            return {
                ...state,
                isAuthChecked: action.payload
            }
        case SET_USER:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
};
