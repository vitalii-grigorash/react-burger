import { initialState as state, reducer } from './reducer';
import { addIngredientDetails, deleteIngredientDetails } from './actions';
import { ingredientOne } from '../../utils/test-data';

describe('ingredient details reducer test', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(state);
    })

    it('should handle ADD_MODAL_INGREDIENT_DETAILS', () => {
        expect(reducer(state, addIngredientDetails(ingredientOne))).toEqual({
            ingredient: ingredientOne
        })
    })

    it('should handle DELETE_MODAL_INGREDIENT_DETAILS', () => {
        expect(reducer({ ingredient: ingredientOne }, deleteIngredientDetails())).toEqual({
            ingredient: null
        })
    })

})