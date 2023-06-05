import { requestHelper } from './requestHelper';

export const getIngredients = () => {
    return requestHelper('/ingredients', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const createOrder = (data) => {
    return requestHelper(`/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}