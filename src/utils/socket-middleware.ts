import type { Middleware, MiddlewareAPI } from 'redux';
import { IWSOrderFeedResponse } from './types';
import { WsOrdersTypes, ConnectionStatus } from '../services/ws-orders/types';
import type { TApplicationActions, TWSActions, AppDispatch } from './hooks';
import { RootState } from '../services';

export const socketMiddleware = (wsActions: TWSActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {

        let socket: WebSocket | null = null;

        return next => (action: TApplicationActions) => {

            const { dispatch } = store;
            const { type } = action;
            const { onError, onStatus, onMessage } = wsActions;

            if (type === WsOrdersTypes.WS_CONNECT) {
                socket = new WebSocket(action.payload);
                dispatch(onStatus(ConnectionStatus.CONNECTING));
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch(onStatus(ConnectionStatus.ONLINE));
                };

                socket.onerror = () => {
                    dispatch(onError('Ошибка подключения'));
                    dispatch(onStatus(ConnectionStatus.OFFLINE));
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const orders: IWSOrderFeedResponse = JSON.parse(data);
                    dispatch(onMessage(orders));
                };

                socket.onclose = () => {
                    dispatch(onStatus(ConnectionStatus.OFFLINE));
                };

                if (type === WsOrdersTypes.WS_DISCONNECT) {
                    socket.close();
                }
            }
            next(action);
        };
    }) as Middleware;
};