import { config } from './config';
import { IRefreshData } from '../utils/types';

const BASE_URL: string = config.baseUrl;

export interface IHeaders {
    [key: string]: any;
}

export interface IOptions {
    method: string;
    headers: IHeaders;
    body?: string;
}

const checkResponse = <T>(res: Response): Promise<T> => {
    return res.ok ? res.json() : res.json().then((err: Response) => Promise.reject(err));
}

export const requestHelper = <T>(url: string, options: IOptions): Promise<T> => {
    return fetch(`${BASE_URL}${url}`, options).then(checkResponse<T>)
}

export const refreshToken = (): Promise<IRefreshData> => {
    return fetch(`${BASE_URL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken")
        }),
    }).then(checkResponse<IRefreshData>);
};

export const fetchWithRefresh = async <T>(url: string, options: IOptions): Promise<T> => {
    try {
        const res = await fetch(`${BASE_URL}${url}`, options);
        return await checkResponse<T>(res);
    } catch (err: any) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken();
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem("accessToken", refreshData.accessToken);
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(`${BASE_URL}${url}`, options);
            return await checkResponse<T>(res);
        } else {
            return Promise.reject(err);
        }
    }
};