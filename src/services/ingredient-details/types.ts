import { IIngredient } from '../../utils/types';

export enum IngredientDetailsActionTypes {
    ADD_MODAL_INGREDIENT_DETAILS = 'ADD_MODAL_INGREDIENT_DETAILS',
    DELETE_MODAL_INGREDIENT_DETAILS = 'DELETE_MODAL_INGREDIENT_DETAILS'
}

export interface IAddIngredientDetails {
    readonly type: IngredientDetailsActionTypes.ADD_MODAL_INGREDIENT_DETAILS;
    readonly payload: IIngredient;
}

export interface IDeleteIngredientDetails {
    readonly type: IngredientDetailsActionTypes.DELETE_MODAL_INGREDIENT_DETAILS;
}

export type TIngredientDetailsActions =
    IAddIngredientDetails |
    IDeleteIngredientDetails
    ;

export interface IIngredientDetailsState {
    ingredient: IIngredient | null
}