import { loaderOn, loaderOff, errorOn } from '../loading/actions';
import { showOrderDetails } from '../modal/actions';
import { ORDER_REQUEST_SUCCESS, ORDER_REQUEST_ERROR } from './types';
import * as Api from '../../utils/api';

function addOrderDetails(orderNumber) {

    return {
        type: ORDER_REQUEST_SUCCESS,
        payload: orderNumber
    }
}

function loadingError() {
    return {
        type: ORDER_REQUEST_ERROR
    }
}

export function createOrder(data) {
    return dispatch => {
        dispatch(loaderOn());
        Api.createOrder(data)
            .then((res) => {
                dispatch(addOrderDetails(res.order.number))
                dispatch(loaderOff());
                dispatch(showOrderDetails());
            })
            .catch((err) => {
                dispatch(errorOn(`Ошибка: ${err}`));
                dispatch(loaderOff());
                dispatch(loadingError());
            })
    }
}