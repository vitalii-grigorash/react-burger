import { IIngredient, IOrder, IUser, IWSOrderFeedResponse } from './types';

export const ingredientsData: IIngredient[] = [
    {
        "_id": "643d69a5c3f7b9001cfa093c",
        "name": "Краторная булка N-200i",
        "type": "bun",
        "proteins": 80,
        "fat": 24,
        "carbohydrates": 53,
        "calories": 420,
        "price": 1255,
        "image": "https://code.s3.yandex.net/react/code/bun-02.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
        "__v": 0
    },
    {
        "_id": "643d69a5c3f7b9001cfa0941",
        "name": "Биокотлета из марсианской Магнолии",
        "type": "main",
        "proteins": 420,
        "fat": 142,
        "carbohydrates": 242,
        "calories": 4242,
        "price": 424,
        "image": "https://code.s3.yandex.net/react/code/meat-01.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
        "__v": 0
    },
    {
        "_id": "643d69a5c3f7b9001cfa093e",
        "name": "Филе Люминесцентного тетраодонтимформа",
        "type": "main",
        "proteins": 44,
        "fat": 26,
        "carbohydrates": 85,
        "calories": 643,
        "price": 988,
        "image": "https://code.s3.yandex.net/react/code/meat-03.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
        "__v": 0
    }
]

export const ingredientOne: IIngredient = {
    "_id": "643d69a5c3f7b9001cfa093e",
    "name": "Филе Люминесцентного тетраодонтимформа",
    "type": "main",
    "uniqKey": "ll6p7vfw",
    "proteins": 44,
    "fat": 26,
    "carbohydrates": 85,
    "calories": 643,
    "price": 988,
    "image": "https://code.s3.yandex.net/react/code/meat-03.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
    "__v": 0
}

export const ingredientTwo: IIngredient = {
    "_id": "643d69a5c3f7b9001cfa0941",
    "name": "Биокотлета из марсианской Магнолии",
    "type": "main",
    "uniqKey": "ll6o0wl7",
    "proteins": 420,
    "fat": 142,
    "carbohydrates": 242,
    "calories": 4242,
    "price": 424,
    "image": "https://code.s3.yandex.net/react/code/meat-01.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
    "__v": 0
}

export const bunOne: IIngredient = {
    "_id": "643d69a5c3f7b9001cfa093c",
    "name": "Краторная булка N-200i",
    "type": "bun",
    "uniqKey": "ll6o0gpn",
    "proteins": 80,
    "fat": 24,
    "carbohydrates": 53,
    "calories": 420,
    "price": 1255,
    "image": "https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v": 0
}

export const bunTwo: IIngredient = {
    "_id": "643d69a5c3f7b9001cfa093d",
    "name": "Флюоресцентная булка R2-D3",
    "type": "bun",
    "uniqKey": "ll6o0wl6",
    "proteins": 44,
    "fat": 26,
    "carbohydrates": 85,
    "calories": 643,
    "price": 988,
    "image": "https://code.s3.yandex.net/react/code/bun-01.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
    "__v": 0
}

export const orderOne: IOrder = {
    "createdAt": "2023-08-13T09:21:29.356Z",
    "ingredients": [
        {
            "_id": "643d69a5c3f7b9001cfa093c",
            "name": "Краторная булка N-200i",
            "type": "bun",
            "proteins": 80,
            "fat": 24,
            "carbohydrates": 53,
            "calories": 420,
            "price": 1255,
            "image": "https://code.s3.yandex.net/react/code/bun-02.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
            "__v": 0
        },
        {
            "_id": "643d69a5c3f7b9001cfa0941",
            "name": "Биокотлета из марсианской Магнолии",
            "type": "main",
            "proteins": 420,
            "fat": 142,
            "carbohydrates": 242,
            "calories": 4242,
            "price": 424,
            "image": "https://code.s3.yandex.net/react/code/meat-01.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
            "__v": 0
        },
        {
            "_id": "643d69a5c3f7b9001cfa093c",
            "name": "Краторная булка N-200i",
            "type": "bun",
            "proteins": 80,
            "fat": 24,
            "carbohydrates": 53,
            "calories": 420,
            "price": 1255,
            "image": "https://code.s3.yandex.net/react/code/bun-02.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
            "__v": 0
        }
    ],
    "name": "Space флюоресцентный бургер",
    "number": 16599,
    "owner": {
        "createdAt": "2023-06-26T14:59:18.578Z",
        "email": "vitalii.grigorash@yandex.ru",
        "name": "Виталий",
        "updatedAt": "2023-07-27T12:53:58.875Z"
    },
    "price": 2056,
    "status": "done",
    "updatedAt": "2023-08-13T09:21:29.585Z",
    "_id": "64d8a09982e277001bfa8bdf"
}

export const orderTwo: IOrder = {
    "createdAt": "2023-08-01T11:22:00.919Z",
    "ingredients": [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0943",
        "643d69a5c3f7b9001cfa093f",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa093c"
    ],
    "name": "Бессмертный space люминесцентный краторный бургер",
    "number": 15453,
    "status": "done",
    "updatedAt": "2023-08-01T11:22:01.077Z",
    "_id": "64c8ead882e277001bfa622e"
}

export const user: Omit<IUser, 'password'> | null = {
    "email": "vitalii.grigorash@yandex.ru",
    "name": "Виталий"
}

export const message: IWSOrderFeedResponse = {
    "success": true,
    "total": 16231,
    "totalToday": 99,
    "orders": [
        {
            "createdAt": "2023-08-13T09:42:31.713Z",
            "ingredients": [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa0943",
                "643d69a5c3f7b9001cfa093d"
            ],
            "name": "Space флюоресцентный бургер",
            "number": 16604,
            "status": "done",
            "updatedAt": "2023-08-13T09:42:31.906Z",
            "_id": "64d8a58782e277001bfa8bf4"
        },
        {
            "createdAt": "2023-08-13T09:30:31.975Z",
            "ingredients": [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa0943",
                "643d69a5c3f7b9001cfa0945",
                "643d69a5c3f7b9001cfa093d"
            ],
            "name": "Space антарианский флюоресцентный бургер",
            "number": 16602,
            "status": "done",
            "updatedAt": "2023-08-13T09:30:32.279Z",
            "_id": "64d8a2b782e277001bfa8beb"
        },
        {
            "createdAt": "2023-08-13T09:21:29.356Z",
            "ingredients": [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa0943",
                "643d69a5c3f7b9001cfa093d"
            ],
            "name": "Space флюоресцентный бургер",
            "number": 16599,
            "status": "done",
            "updatedAt": "2023-08-13T09:21:29.585Z",
            "_id": "64d8a09982e277001bfa8bdf"
        }
    ]
}