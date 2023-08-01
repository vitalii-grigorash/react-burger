import { WsOrdersTypesProfile, ConnectionStatusProfile, IWsOrdersStateProfile, TWsOrdersActionsProfile } from './types';

const initialState: IWsOrdersStateProfile = {
    status: ConnectionStatusProfile.OFFLINE,
    connectionError: '',
    orders: null
};

export const reducer = (state = initialState, action: TWsOrdersActionsProfile): IWsOrdersStateProfile => {
    switch (action.type) {
        case WsOrdersTypesProfile.WS_STATUS_PROFILE:
            return {
                ...state,
                status: action.payload,
            }
        case WsOrdersTypesProfile.WS_ERROR_PROFILE:
            return {
                ...state,
                connectionError: action.payload
            }
        case WsOrdersTypesProfile.WS_UPDATE_ORDERS_PROFILE:
            return {
                ...state,
                orders: action.payload,
            }
        case WsOrdersTypesProfile.WS_DISCONNECT_PROFILE:
            return {
                ...state,
                connectionError: '',
                orders: null
            }
    }
    return state;
}
