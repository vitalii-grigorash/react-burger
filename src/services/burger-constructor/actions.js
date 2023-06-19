import { SELECT_BUN, ADD_INGREDIENT, DELETE_INGREDIENT, SORT_INGREDIENTS, RESET_INGREDIENTS } from './types';

export function selectBun(bun) {
    return {
        type: SELECT_BUN,
        payload: bun
    }
}

export function addIngredient(ingredient) {
    return {
        type: ADD_INGREDIENT,
        payload: ingredient
    }
}

export function deleteIngredient(uniqKey) {
    return {
        type: DELETE_INGREDIENT,
        payload: uniqKey
    }
}

export function sortIngredients(sortedIngredients) {
    return {
        type: SORT_INGREDIENTS,
        payload: sortedIngredients
    }
}

export function resetIngredients() {
    return {
        type: RESET_INGREDIENTS
    }
}
