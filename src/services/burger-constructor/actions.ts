import { IIngredient } from '../../utils/types';

import {
    BurgerConstructorActionTypes,
    ISelectBun,
    IAddIngredient,
    IDeleteIngredient,
    ISortIngredients,
    IResetIngredients
} from './types';

export function selectBun(bun: IIngredient): ISelectBun {
    return {
        type: BurgerConstructorActionTypes.SELECT_BUN,
        payload: bun
    }
}

export function addIngredient(ingredient: IIngredient): IAddIngredient {
    return {
        type: BurgerConstructorActionTypes.ADD_INGREDIENT,
        payload: ingredient
    }
}

export function deleteIngredient(uniqKey: string): IDeleteIngredient {
    return {
        type: BurgerConstructorActionTypes.DELETE_INGREDIENT,
        payload: uniqKey
    }
}

export function sortIngredients(sortedIngredients: IIngredient[]): ISortIngredients {
    return {
        type: BurgerConstructorActionTypes.SORT_INGREDIENTS,
        payload: sortedIngredients
    }
}

export function resetIngredients(): IResetIngredients {
    return {
        type: BurgerConstructorActionTypes.RESET_INGREDIENTS
    }
}
