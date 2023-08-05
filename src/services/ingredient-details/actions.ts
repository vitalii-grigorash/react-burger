import { IngredientDetailsActionTypes, IAddIngredientDetails, IDeleteIngredientDetails } from './types';
import { IIngredient } from '../../utils/types';

export function addIngredientDetails(ingredient: IIngredient): IAddIngredientDetails {
    return {
        type: IngredientDetailsActionTypes.ADD_MODAL_INGREDIENT_DETAILS,
        payload: ingredient
    }
}

export function deleteIngredientDetails(): IDeleteIngredientDetails {
    return {
        type: IngredientDetailsActionTypes.DELETE_MODAL_INGREDIENT_DETAILS
    }
}