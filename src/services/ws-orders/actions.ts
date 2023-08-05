import { createAction } from "@reduxjs/toolkit";
import { IWSOrderFeedResponse } from '../../utils/types';
import { WsOrdersTypes } from './types';

export const connect = createAction<string, WsOrdersTypes.WS_CONNECT>(WsOrdersTypes.WS_CONNECT);
export const disconnect = createAction(WsOrdersTypes.WS_DISCONNECT);
export const wsConnecting = createAction(WsOrdersTypes.WS_CONNECTING);
export const wsOpen = createAction(WsOrdersTypes.WS_OPEN);
export const wsClose = createAction(WsOrdersTypes.WS_CLOSE);
export const wsMessage = createAction<IWSOrderFeedResponse, WsOrdersTypes.WS_MESSAGE>(WsOrdersTypes.WS_MESSAGE);
export const wsError = createAction<string, WsOrdersTypes.WS_ERROR>(WsOrdersTypes.WS_ERROR);

export type TWSActions =
    ReturnType<typeof connect> |
    ReturnType<typeof disconnect> |
    ReturnType<typeof wsConnecting> |
    ReturnType<typeof wsOpen> |
    ReturnType<typeof wsClose> |
    ReturnType<typeof wsMessage> |
    ReturnType<typeof wsError>
;
