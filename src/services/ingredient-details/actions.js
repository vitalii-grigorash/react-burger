import { ADD_MODAL_INGREDIENT_DETAILS, DELETE_MODAL_INGREDIENT_DETAILS } from './types';

export function addIngredientDetails(ingredient) {
    return {
        type: ADD_MODAL_INGREDIENT_DETAILS,
        payload: ingredient
    }
}

export function deleteIngredientDetails() {
    return {
        type: DELETE_MODAL_INGREDIENT_DETAILS
    }
}