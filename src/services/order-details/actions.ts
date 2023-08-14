import { loaderOn, loaderOff, errorOn } from '../loading/actions';
import { showOrderDetails, showErrorDetails } from '../modal/actions';
import { resetIngredients } from '../burger-constructor/actions';
import { OrderDetailsActionTypes, IAddOrderDetails, ILoadingError } from './types';
import { AppThunk } from '../../utils/hooks';
import { IIngredientsId } from '../../utils/types';
import { IOrder } from '../../utils/types';
import * as Api from '../../utils/api';

export function addOrderDetails(order: IOrder): IAddOrderDetails {
    return {
        type: OrderDetailsActionTypes.ORDER_REQUEST_SUCCESS,
        payload: order
    }
}

export function loadingError(): ILoadingError {
    return {
        type: OrderDetailsActionTypes.ORDER_REQUEST_ERROR
    }
}

export function createOrder(data: IIngredientsId): AppThunk {
    return dispatch => {
        dispatch(loaderOn());
        Api.createOrder(data)
            .then((res) => {
                console.log(res);
                dispatch(addOrderDetails(res.order));
                dispatch(loaderOff());
                dispatch(showOrderDetails());
                dispatch(resetIngredients());
            })
            .catch((err) => {
                dispatch(errorOn(`Ошибка: ${err.message}.`));
                dispatch(loaderOff());
                dispatch(showErrorDetails('Ошибка при запросе'));
                dispatch(loadingError());
            })
    }
}

export function getOrder(orderNumber: string): AppThunk {
    return dispatch => {
        dispatch(loaderOn());
        Api.getOrder(orderNumber)
            .then((res) => {
                dispatch(addOrderDetails(res.orders[0]));
                dispatch(loaderOff());
            })
            .catch((err) => {
                dispatch(errorOn(`Ошибка: ${err.message}.`));
                dispatch(loaderOff());
                dispatch(showErrorDetails('Ошибка при запросе'));
                dispatch(loadingError());
            })
    }
}