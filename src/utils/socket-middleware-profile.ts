import type { Middleware, MiddlewareAPI } from 'redux';
import { IWSOrderFeedResponse } from './types';
import { WsOrdersTypesProfile, ConnectionStatusProfile } from '../services/ws-orders-profile/types';
import type { TApplicationActions, AppDispatch, TWSActionsProfile } from './hooks';
import { checkUserAuth } from '../services/user/actions';
import { RootState } from '../services';

export const socketMiddlewareProfile = (wsActions: TWSActionsProfile): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {

        let socket: WebSocket | null = null;

        return next => (action: TApplicationActions) => {

            const { dispatch } = store;
            const { type } = action;
            const { onErrorProfile, onStatusProfile, onMessageProfile } = wsActions;

            if (type === WsOrdersTypesProfile.WS_CONNECT_PROFILE) {
                socket = new WebSocket(action.payload);
                dispatch(onStatusProfile(ConnectionStatusProfile.CONNECTING));
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch(onStatusProfile(ConnectionStatusProfile.ONLINE));
                };

                socket.onerror = () => {
                    dispatch(onErrorProfile('Ошибка подключения'));
                    dispatch(onStatusProfile(ConnectionStatusProfile.OFFLINE));
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const orders: IWSOrderFeedResponse = JSON.parse(data);
                    if (orders.success) {
                        dispatch(onMessageProfile(orders));
                    } else if (orders.message === 'Invalid or missing token') {
                        dispatch(checkUserAuth());
                    }
                };

                socket.onclose = () => {
                    dispatch(onStatusProfile(ConnectionStatusProfile.OFFLINE));
                };

                if (type === WsOrdersTypesProfile.WS_DISCONNECT_PROFILE) {
                    socket.close();
                }
            }
            next(action);
        };
    }) as Middleware;
};