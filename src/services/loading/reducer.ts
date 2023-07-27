import { LoadingActionTypes, TLoadingActions, ILoadingState } from "./types";

const initialState: ILoadingState = {
    loading: false,
    error: null
}

export const reducer = (state = initialState, action: TLoadingActions): ILoadingState => {
    switch (action.type) {
        case LoadingActionTypes.LOADER_ON:
            return {
                ...state,
                loading: true
            }
        case LoadingActionTypes.LOADER_OFF:
            return {
                ...state,
                loading: false
            }
        case LoadingActionTypes.ERROR_ACTIVE:
            return {
                ...state,
                error: action.payload
            }
        case LoadingActionTypes.ERROR_DISABLE:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}