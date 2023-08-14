import { ConnectionStatus, IWsOrdersState } from '../../utils/types';
import { createReducer } from '@reduxjs/toolkit';
import { wsOpenProfile, wsCloseProfile, wsMessageProfile, wsErrorProfile, wsConnectingProfile } from "./actions";

export const initialState: IWsOrdersState = {
    status: ConnectionStatus.OFFLINE,
    connectionError: '',
    orders: null
};

export const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(wsConnectingProfile, (state) => {
            state.status = ConnectionStatus.CONNECTING;
        })
        .addCase(wsOpenProfile, (state) => {
            state.status = ConnectionStatus.ONLINE;
            state.connectionError = '';
        })
        .addCase(wsCloseProfile, (state) => {
            state.status = ConnectionStatus.OFFLINE;
        })
        .addCase(wsErrorProfile, (state, action) => {
            state.connectionError = action.payload;
        })
        .addCase(wsMessageProfile, (state, action) => {
            state.orders = action.payload;
        })
})
