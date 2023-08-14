import { initialState as state, reducer } from './reducer';
import { wsConnecting, wsOpen, wsClose, wsMessage, wsError } from "./actions";
import { ConnectionStatus } from '../../utils/types';
import { message } from '../../utils/test-data';

describe('ws orders reducer test', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(state);
    })

    it('should handle WS_CONNECTING', () => {
        expect(reducer(state, wsConnecting())).toEqual({
            ...state,
            status: ConnectionStatus.CONNECTING
        })
    })

    it('should handle WS_OPEN', () => {
        expect(reducer(state, wsOpen())).toEqual({
            ...state,
            status: ConnectionStatus.ONLINE,
            connectionError: ''
        })
    })

    it('should handle WS_CLOSE', () => {
        expect(reducer(state, wsClose())).toEqual({
            ...state,
            status: ConnectionStatus.OFFLINE
        })
    })

    it('should handle WS_ERROR', () => {
        expect(reducer(state, wsError('error message'))).toEqual({
            ...state,
            connectionError: 'error message'
        })
    })

    it('should handle WS_MESSAGE', () => {
        expect(reducer(state, wsMessage(message))).toEqual({
            ...state,
            orders: message
        })
    })

})