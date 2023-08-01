import { WsOrdersTypes, ConnectionStatus, IWsOrdersState, TWsOrdersActions } from './types';

const initialState: IWsOrdersState = {
    status: ConnectionStatus.OFFLINE,
    connectionError: '',
    orders: null
};

export const reducer = (state = initialState, action: TWsOrdersActions): IWsOrdersState => {
    switch (action.type) {
        case WsOrdersTypes.WS_STATUS:
            return {
                ...state,
                status: action.payload,
            }
        case WsOrdersTypes.WS_ERROR:
            return {
                ...state,
                connectionError: action.payload
            }
        case WsOrdersTypes.WS_UPDATE_ORDERS:
            return {
                ...state,
                orders: action.payload,
            }
        case WsOrdersTypes.WS_DISCONNECT:
            return {
                ...state,
                connectionError: '',
                orders: null
            }
    }
    return state;
}
