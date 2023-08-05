import { UserActionTypes, IUserState, TUserActions } from './types';

const initialState: IUserState = {
    user: null,
    isAuthChecked: false,
};

export const reducer = (state = initialState, action: TUserActions): IUserState => {
    switch (action.type) {
        case UserActionTypes.SET_AUTH_CHECKED:
            return {
                ...state,
                isAuthChecked: action.payload
            }
        case UserActionTypes.SET_USER:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
};
