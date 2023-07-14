export interface IIngredient {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v?: number
}

export interface IIngredientsId {
    ingredients: string[]
}

export interface IUser {
    name: string;
    email: string;
    password: string;
} 

export type TLogin = Omit<IUser, 'name'>

export type TEmail = Pick<IUser, 'email'>

export type TResetPassword = Pick<IUser, 'password'> & { token: string; }

export interface IUserResponse {
    success: boolean;
    user: Omit<IUser, 'password'>;
}

export interface IOwner {
    createdAt: string;
    email: string;
    name: string;
    updatedAt: string;
}

export interface IOrder {
    createdAt: string;
    ingredients: IIngredient[];
    name: string;
    number: number;
    owner: IOwner;
    price: number;
    status: string;
    updatedAt: string;
    _id: string;
}

export interface IOrderDetails {
    name: string;
    order: IOrder;
    success: boolean;
}

export interface IRefreshData {
    accessToken: string;
    refreshToken: string;
    success: boolean;
}

export interface IAuthResponse extends IRefreshData {
    user: Omit<IUser, 'password'>
}

export interface IResponse {
    success: boolean;
    message: string;
}