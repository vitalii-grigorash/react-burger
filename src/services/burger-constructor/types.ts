import { IIngredient } from '../../utils/types';

export enum BurgerConstructorActionTypes {
    SELECT_BUN = 'SELECT_BUN',
    ADD_INGREDIENT = 'ADD_INGREDIENT',
    DELETE_INGREDIENT = 'DELETE_INGREDIENT',
    SORT_INGREDIENTS = 'SORT_INGREDIENTS',
    RESET_INGREDIENTS = 'RESET_INGREDIENTS'
}

export interface ISelectBun {
    readonly type: typeof BurgerConstructorActionTypes.SELECT_BUN;
    readonly payload: IIngredient;
}

export interface IAddIngredient {
    readonly type: typeof BurgerConstructorActionTypes.ADD_INGREDIENT;
    readonly payload: IIngredient;
}

export interface IDeleteIngredient {
    readonly type: typeof BurgerConstructorActionTypes.DELETE_INGREDIENT;
    readonly payload: string;
}

export interface ISortIngredients {
    readonly type: typeof BurgerConstructorActionTypes.SORT_INGREDIENTS;
    readonly payload: IIngredient[];
}

export interface IResetIngredients {
    readonly type: typeof BurgerConstructorActionTypes.RESET_INGREDIENTS;
}

export type TBurgerConstructorActions =
    ISelectBun |
    IAddIngredient |
    IDeleteIngredient |
    ISortIngredients |
    IResetIngredients
;

export interface IBurgerConstructorState {
    bun: IIngredient | null,
    ingredients: IIngredient[]
}