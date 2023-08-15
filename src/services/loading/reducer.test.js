import { initialState as state, reducer } from './reducer';
import { loaderOn, loaderOff, errorOn, errorOff } from './actions';

describe('ingredient details reducer test', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(state);
    })

    it('should handle LOADER_ON', () => {
        expect(reducer(state, loaderOn())).toEqual({
            ...state,
            loading: true
        })
    })

    it('should handle LOADER_OFF', () => {
        expect(reducer({ loading: true, error: state.error }, loaderOff())).toEqual({
            ...state,
            loading: false
        })
    })

    it('should handle ERROR_ACTIVE', () => {
        expect(reducer(state, errorOn('error text'))).toEqual({
            ...state,
            error: 'error text'
        })
    })

    it('should handle ERROR_DISABLE', () => {
        expect(reducer({ loading: state.loading, error: 'error text' }, errorOff())).toEqual({
            ...state,
            error: null
        })
    })

})