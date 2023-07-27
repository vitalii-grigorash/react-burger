import { loaderOn, loaderOff, errorOn } from '../loading/actions';
import { showErrorDetails } from '../modal/actions';
import { BurgerIngredientsTypes, IAddIngredients, ILoadingError } from './types';
import { IIngredient } from '../../utils/types';
import { AppThunk } from '../../utils/hooks';
import * as Api from '../../utils/api';

function addIngredients(ingredients: IIngredient[]): IAddIngredients {
    return {
        type: BurgerIngredientsTypes.LOAD_INGREDIENTS_SUCCESS,
        payload: ingredients
    }
}

function loadingError(): ILoadingError {
    return {
        type: BurgerIngredientsTypes.LOAD_INGREDIENTS_ERROR
    }
}

export const loadIngredients = (): AppThunk => {
    return dispatch => {
        dispatch(loaderOn());
        Api.getIngredients()
            .then((res) => {
                console.log(res);
                dispatch(addIngredients(res.data))
                dispatch(loaderOff());
            })
            .catch((err) => {
                dispatch(errorOn(`Ошибка: ${err.message}.`));
                dispatch(loaderOff());
                dispatch(showErrorDetails('Ошибка при запросе'));
                dispatch(loadingError());
            })
    }
}