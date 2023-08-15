import { initialState as state, reducer } from './reducer';
import {
    showOrderDetails,
    showIngredientDetails,
    showOrderFeedDetails,
    showErrorDetails,
    hideAllDetails
} from './actions';

describe('modal reducer test', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(state);
    })

    it('should handle OPEN_ORDER_DETAILS', () => {
        expect(reducer(state, showOrderDetails())).toEqual({
            ...state,
            isOrderModalOpen: true
        })
    })

    it('should handle OPEN_INGREDIENT_DETAILS', () => {
        expect(reducer(state, showIngredientDetails('modal title'))).toEqual({
            ...state,
            isIngredientModalOpen: true,
            modalTitle: 'modal title'
        })
    })

    it('should handle OPEN_ORDER_FEED_DETAILS', () => {
        expect(reducer(state, showOrderFeedDetails())).toEqual({
            ...state,
            isOrderFeedModalOpen: true
        })
    })

    it('should handle OPEN_ERROR_DETAILS', () => {
        expect(reducer(state, showErrorDetails('modal title'))).toEqual({
            ...state,
            isErrorModalOpen: true,
            modalTitle: 'modal title'
        })
    })

    it('should handle CLOSE_MODAL', () => {
        expect(reducer({
            isOrderModalOpen: true,
            isIngredientModalOpen: state.isIngredientModalOpen,
            isOrderFeedModalOpen: state.isOrderFeedModalOpen,
            isErrorModalOpen: state.isErrorModalOpen,
            modalTitle: 'modal title',
        }, hideAllDetails())).toEqual(state);
    })

})