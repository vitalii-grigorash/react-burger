import { IngredientDetailsActionTypes, TIngredientDetailsActions, IIngredientDetailsState } from './types';

const initialState: IIngredientDetailsState = {
    ingredient: null
}

export const reducer = (state = initialState, action: TIngredientDetailsActions): IIngredientDetailsState => {
    switch (action.type) {
        case IngredientDetailsActionTypes.ADD_MODAL_INGREDIENT_DETAILS:
            return {
                ...state,
                ingredient: action.payload
            };
        case IngredientDetailsActionTypes.DELETE_MODAL_INGREDIENT_DETAILS:
            return {
                ...state,
                ingredient: null
            };
        default:
            return state;
    }
}