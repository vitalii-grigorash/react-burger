export enum LoadingActionTypes {
    LOADER_ON = 'LOADER_ON',
    LOADER_OFF = 'LOADER_OFF',
    ERROR_ACTIVE = 'ERROR_ACTIVE',
    ERROR_DISABLE = 'ERROR_DISABLE'
}

export interface ILoaderOn {
    readonly type: typeof LoadingActionTypes.LOADER_ON;
}

export interface ILoaderOff {
    readonly type: typeof LoadingActionTypes.LOADER_OFF;
}

export interface IErrorOn {
    readonly type: typeof LoadingActionTypes.ERROR_ACTIVE;
    readonly payload: string;
}

export interface IErrorOff {
    readonly type: typeof LoadingActionTypes.ERROR_DISABLE;
}

export type TLoadingActions =
    ILoaderOn |
    ILoaderOff |
    IErrorOn |
    IErrorOff
    ;

export interface ILoadingState {
    loading: boolean,
    error: string | null
}