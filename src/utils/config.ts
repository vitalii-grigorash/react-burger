interface IConfig {
    baseUrl: string,
    wsUrl: string,
    wsUrlProfile: string
}

export const config: IConfig = {
    baseUrl: "https://norma.nomoreparties.space/api",
    wsUrl: 'wss://norma.nomoreparties.space/orders/all',
    wsUrlProfile: 'wss://norma.nomoreparties.space/orders'
};