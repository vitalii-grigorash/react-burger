import { initialState as state, reducer } from './reducer';
import { incrementPrice, resetPrice } from './actions';

describe('total price reducer test', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(state);
    })

    it('should handle INCREMENT_PRICE', () => {
        expect(reducer(state, incrementPrice(10))).toEqual({
            ...state,
            totalPrice: 10
        })
    })

    it('should handle INCREMENT_PRICE add price', () => {
        expect(reducer({ totalPrice: 10 }, incrementPrice(20))).toEqual({
            ...state,
            totalPrice: 30
        })
    })

    it('should handle RESET_PRICE', () => {
        expect(reducer({ totalPrice: 30 }, resetPrice())).toEqual({
            ...state,
            totalPrice: 0
        })
    })

})