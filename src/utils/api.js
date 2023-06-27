import { requestHelper, fetchWithRefresh } from './requestHelper';

export const getIngredients = () => {
    return requestHelper('/ingredients', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const createOrder = (data) => {
    return fetchWithRefresh(`/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: localStorage.getItem('accessToken')
        },
        body: JSON.stringify(data)
    })
}

export const login = (data) => {
    return requestHelper(`/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const register = (data) => {
    return requestHelper(`/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const logout = () => {
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

export const sendEmail = (data) => {
    return requestHelper(`/password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const resetPassword = (data) => {
    return requestHelper(`/password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const getUser = () => {
    return fetchWithRefresh('/auth/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: localStorage.getItem('accessToken')
        }
    })
}

// для смены логина или пароля в профиле пользователя
// export const changeUser = (data) => {
//     return requestHelper('/auth/user', {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json',
//             authorization: localStorage.getItem('accessToken')
//         },
//         body: JSON.stringify(data)
//     })
// }