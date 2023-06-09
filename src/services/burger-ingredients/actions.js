import { loaderOn, loaderOff, errorOn } from '../loading/actions';
import { LOAD_INGREDIENTS_SUCCESS, LOAD_INGREDIENTS_ERROR  } from './types';
import * as Api from '../../utils/api';

function addIngredients(ingredients) {
    return {
        type: LOAD_INGREDIENTS_SUCCESS,
        payload: ingredients
    }
}

function loadingError() {
    return {
        type: LOAD_INGREDIENTS_ERROR 
    }
}

export function loadIngredients() {
    return dispatch => {
        dispatch(loaderOn());
        Api.getIngredients()
            .then((res) => {
                dispatch(addIngredients(res.data))
                dispatch(loaderOff());
            })
            .catch((err) => {
                dispatch(errorOn(`Ошибка: ${err}`));
                dispatch(loaderOff());
                dispatch(loadingError());
            })
    }
}