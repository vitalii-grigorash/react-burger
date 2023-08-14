import { initialState as state, reducer } from './reducer';
import { setAuthChecked, setUser } from './actions';
import { user } from '../../utils/test-data';

describe('user reducer test', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(state);
    })

    it('should handle SET_AUTH_CHECKED true', () => {
        expect(reducer(state, setAuthChecked(true))).toEqual({
            ...state,
            isAuthChecked: true,
        })
    })

    it('should handle SET_AUTH_CHECKED false', () => {
        expect(reducer({ user: state.user, isAuthChecked: true }, setAuthChecked(false))).toEqual({
            ...state,
            isAuthChecked: false,
        })
    })

    it('should handle SET_USER', () => {
        expect(reducer(state, setUser(user))).toEqual({
            ...state,
            user: user
        })
    })

})