import { ConnectionStatus, IWsOrdersState } from '../../utils/types';
import { createReducer } from '@reduxjs/toolkit';
import { wsOpen, wsClose, wsMessage, wsError, wsConnecting } from "./actions";

export const initialState: IWsOrdersState = {
    status: ConnectionStatus.OFFLINE,
    connectionError: '',
    orders: null
};

export const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(wsConnecting, (state) => {
            state.status = ConnectionStatus.CONNECTING;
        })
        .addCase(wsOpen, (state) => {
            state.status = ConnectionStatus.ONLINE;
            state.connectionError = '';
        })
        .addCase(wsClose, (state) => {
            state.status = ConnectionStatus.OFFLINE;
        })
        .addCase(wsError, (state, action) => {
            state.connectionError = action.payload;
        })
        .addCase(wsMessage, (state, action) => {
            state.orders = action.payload;
        })
})
