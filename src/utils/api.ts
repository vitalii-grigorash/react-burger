import { requestHelper, fetchWithRefresh } from './requestHelper';
import {
    TEmail,
    IIngredientsId,
    TLogin,
    IUser,
    TResetPassword,
    IOrderDetails,
    IAuthResponse,
    IResponse,
    IUserResponse,
    IIngredientResponse
} from './types';

export const getIngredients = (): Promise<IIngredientResponse> => {
    return requestHelper('/ingredients', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const createOrder = (data: IIngredientsId): Promise<IOrderDetails> => {
    return fetchWithRefresh(`/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: localStorage.getItem('accessToken')
        },
        body: JSON.stringify(data)
    })
}

export const login = (data: TLogin): Promise<IAuthResponse> => {
    return requestHelper(`/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const register = (data: IUser): Promise<IAuthResponse> => {
    return requestHelper(`/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const logout = (): Promise<IResponse> => {
    return requestHelper(`/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken')
        })
    })
}

export const sendEmail = (data: TEmail): Promise<IResponse> => {
    return requestHelper(`/password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const resetPassword = (data: TResetPassword): Promise<IResponse> => {
    return requestHelper(`/password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const getUser = (): Promise<IUserResponse> => {
    return fetchWithRefresh('/auth/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: localStorage.getItem('accessToken')
        }
    })
}

export const changeUser = (data: IUser): Promise<IUserResponse> => {
    return fetchWithRefresh('/auth/user', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            authorization: localStorage.getItem('accessToken')
        },
        body: JSON.stringify(data)
    })
}