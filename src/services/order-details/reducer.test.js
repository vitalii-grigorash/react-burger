import { initialState as state, reducer } from './reducer';
import { addOrderDetails, loadingError } from './actions';
import { orderOne, orderTwo } from '../../utils/test-data';

describe('order details reducer test', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(state);
    })

    it('should handle ORDER_REQUEST_SUCCESS', () => {
        expect(reducer(state, addOrderDetails(orderOne))).toEqual({
            ...state,
            order: orderOne
        })
    })

    it('should handle ORDER_REQUEST_SUCCESS select another order details', () => {
        expect(reducer({ order: orderOne }, addOrderDetails(orderTwo))).toEqual({
            ...state,
            order: orderTwo
        })
    })

    it('should handle ORDER_REQUEST_ERROR', () => {
        expect(reducer({ order: orderTwo }, loadingError())).toEqual({
            ...state,
            order: null
        })
    })

})