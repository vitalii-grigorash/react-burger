import { LOADER_ON, LOADER_OFF, ERROR_ACTIVE } from "./types";

const initialState = {
    loading: false,
    error: null
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADER_ON:
            return {
                ...state,
                loading: true,
                error: null
            }
        case LOADER_OFF:
            return {
                ...state,
                loading: false
            }
        case ERROR_ACTIVE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}