import { initialState as state, reducer } from './reducer';
import { addIngredients, loadingError } from './actions';
import { ingredientsData } from '../../utils/test-data';

describe('burger ingredients reducer test', () => {
    
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(state);
    })

    it('should handle LOAD_INGREDIENTS_SUCCESS', () => {
        expect(reducer(state, addIngredients(ingredientsData))).toEqual({
            ...state,
            ingredients: ingredientsData
        })
    })

    it('should handle LOAD_INGREDIENTS_ERROR', () => {
        expect(reducer(state, loadingError())).toEqual({
            ...state,
            ingredients: []
        })
    })

})