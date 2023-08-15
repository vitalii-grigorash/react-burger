import { initialState as state, reducer } from './reducer';
import { wsConnectingProfile, wsOpenProfile, wsCloseProfile, wsMessageProfile, wsErrorProfile } from "./actions";
import { ConnectionStatus } from '../../utils/types';
import { message } from '../../utils/test-data';

describe('ws orders profile reducer test', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(state);
    })

    it('should handle WS_CONNECTING', () => {
        expect(reducer(state, wsConnectingProfile())).toEqual({
            ...state,
            status: ConnectionStatus.CONNECTING
        })
    })

    it('should handle WS_OPEN', () => {
        expect(reducer(state, wsOpenProfile())).toEqual({
            ...state,
            status: ConnectionStatus.ONLINE,
            connectionError: ''
        })
    })

    it('should handle WS_CLOSE', () => {
        expect(reducer(state, wsCloseProfile())).toEqual({
            ...state,
            status: ConnectionStatus.OFFLINE
        })
    })

    it('should handle WS_ERROR', () => {
        expect(reducer(state, wsErrorProfile('error message'))).toEqual({
            ...state,
            connectionError: 'error message'
        })
    })

    it('should handle WS_MESSAGE', () => {
        expect(reducer(state, wsMessageProfile(message))).toEqual({
            ...state,
            orders: message
        })
    })

})