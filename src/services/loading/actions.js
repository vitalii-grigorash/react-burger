import { LOADER_ON, LOADER_OFF, ERROR_ACTIVE, ERROR_DISABLE } from "./types";

export function loaderOn() {
    return {
        type: LOADER_ON
    }
}

export function loaderOff() {
    return {
        type: LOADER_OFF
    }
}

export function errorOn(text) {
    return {
        type: ERROR_ACTIVE,
        payload: text
    }
}

export function errorOff() {
    return {
        type: ERROR_DISABLE
    }
}