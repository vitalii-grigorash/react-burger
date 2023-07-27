import { IIngredient } from '../../utils/types';

export enum BurgerIngredientsTypes {
    LOAD_INGREDIENTS_SUCCESS = 'LOAD_INGREDIENTS_SUCCESS',
    LOAD_INGREDIENTS_ERROR = 'LOAD_INGREDIENTS_ERROR'
}

export interface IAddIngredients {
    readonly type: typeof BurgerIngredientsTypes.LOAD_INGREDIENTS_SUCCESS;
    payload: IIngredient[];
}

export interface ILoadingError {
    readonly type: typeof BurgerIngredientsTypes.LOAD_INGREDIENTS_ERROR;
}

export type TBurgerIngredientsActions =
    IAddIngredients |
    ILoadingError
;

export interface IBurgerIngredientsState {
    ingredients: IIngredient[]
}