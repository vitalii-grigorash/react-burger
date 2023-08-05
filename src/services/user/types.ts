import { IUser } from '../../utils/types';

export enum UserActionTypes {
    SET_AUTH_CHECKED = 'SET_AUTH_CHECKED',
    SET_USER = 'SET_USER'
}

export interface ISetAuthChecked {
    readonly type: typeof UserActionTypes.SET_AUTH_CHECKED;
    readonly payload: boolean;
}

export interface ISetUser {
    readonly type: typeof UserActionTypes.SET_USER;
    readonly payload: Omit<IUser, 'password'> | null;
}

export type TUserActions =
    ISetAuthChecked |
    ISetUser
;

export interface IUserState {
    user: Omit<IUser, 'password'> | null,
    isAuthChecked: boolean,
}