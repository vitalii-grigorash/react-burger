import { loaderOn, loaderOff, errorOn } from '../loading/actions';
import { LOAD_INGREDIENTS_SUCCESS, LOAD_INGREDIENTS_ERROR } from './types';
import * as Api from '../../utils/api';

function addIngredients(ingredients) {

    const bun = [];
    const sauce = [];
    const topping = [];

    ingredients.forEach((i) => {
        if (i.type === 'bun') {
            bun.push(i);
        } else if (i.type === 'sauce') {
            sauce.push(i);
        } else if (i.type === 'main') {
            topping.push(i);
        }
    });

    return {
        type: LOAD_INGREDIENTS_SUCCESS,
        payload: {
            bun: bun,
            sauce: sauce,
            topping: topping
        }
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