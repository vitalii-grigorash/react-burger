import {
    LoadingActionTypes,
    ILoaderOn,
    ILoaderOff,
    IErrorOn,
    IErrorOff
} from "./types";

export function loaderOn(): ILoaderOn {
    return {
        type: LoadingActionTypes.LOADER_ON
    }
}

export function loaderOff(): ILoaderOff {
    return {
        type: LoadingActionTypes.LOADER_OFF
    }
}

export function errorOn(text: string): IErrorOn {
    return {
        type: LoadingActionTypes.ERROR_ACTIVE,
        payload: text
    }
}

export function errorOff(): IErrorOff {
    return {
        type: LoadingActionTypes.ERROR_DISABLE
    }
}