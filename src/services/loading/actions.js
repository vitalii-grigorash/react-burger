import { LOADER_ON, LOADER_OFF, ERROR_ACTIVE } from "./types";

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