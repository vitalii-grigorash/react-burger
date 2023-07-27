import { loaderOn, loaderOff, errorOn } from '../loading/actions';
import { showOrderDetails, showErrorDetails } from '../modal/actions';
import { resetIngredients } from '../burger-constructor/actions';
import { OrderDetailsActionTypes, IAddOrderDetails, ILoadingError } from './types';
import { AppThunk } from '../../utils/hooks';
import { IIngredientsId } from '../../utils/types';
import * as Api from '../../utils/api';

function addOrderDetails(orderNumber: number): IAddOrderDetails {
    return {
        type: OrderDetailsActionTypes.ORDER_REQUEST_SUCCESS,
        payload: orderNumber
    }
}

function loadingError(): ILoadingError {
    return {
        type: OrderDetailsActionTypes.ORDER_REQUEST_ERROR
    }
}

export function createOrder(data: IIngredientsId): AppThunk {
    return dispatch => {
        dispatch(loaderOn());
        Api.createOrder(data)
            .then((res) => {
                dispatch(addOrderDetails(res.order.number))
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