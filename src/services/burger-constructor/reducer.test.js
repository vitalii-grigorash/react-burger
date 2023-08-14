import { initialState as state, reducer } from './reducer';
import { selectBun, addIngredient, deleteIngredient, sortIngredients, resetIngredients } from './actions';
import { bunOne, bunTwo, ingredientOne, ingredientTwo, ingredientsData } from '../../utils/test-data';

describe('burger constructor reducer test', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(state);
    })

    it('should handle SELECT_BUN', () => {
        expect(reducer({ bun: null, ingredients: state.ingredients }, selectBun(bunOne))).toEqual({
            ...state,
            bun: bunOne
        })
    })

    it('should handle SELECT_BUN and change', () => {
        expect(reducer({ bun: bunOne, ingredients: state.ingredients }, selectBun(bunTwo))).toEqual({
            ...state,
            bun: bunTwo
        })
    })

    it('should handle ADD_INGREDIENT', () => {
        expect(reducer({ bun: state.bun, ingredients: [] }, addIngredient(ingredientOne))).toEqual({
            ...state,
            ingredients: [ingredientOne]
        })
    })

    it('should handle ADD_INGREDIENT one more', () => {
        expect(reducer({ bun: state.bun, ingredients: [ingredientOne] }, addIngredient(ingredientTwo))).toEqual({
            ...state,
            ingredients: [ingredientOne, ingredientTwo]
        })
    })

    it('should handle SORT_INGREDIENTS', () => {
        expect(reducer({ bun: state.bun, ingredients: [ingredientOne, ingredientTwo] }, sortIngredients([ingredientTwo, ingredientOne]))).toEqual({
            ...state,
            ingredients: [ingredientTwo, ingredientOne]
        })
    })

    it('should handle DELETE_INGREDIENT', () => {
        expect(reducer({ bun: state.bun, ingredients: [ingredientTwo, ingredientOne] }, deleteIngredient(ingredientTwo.uniqKey))).toEqual({
            ...state,
            ingredients: [ingredientOne]
        })
    })

    it('should handle RESET_INGREDIENTS', () => {
        expect(reducer({ bun: bunOne, ingredients: ingredientsData }, resetIngredients())).toEqual({
            ...state,
            bun: null,
            ingredients: []
        })
    })

})