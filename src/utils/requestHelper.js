import { config } from './config';

const BASE_URL = config.baseUrl;

function checkResponse(res) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export function requestHelper(url, options) {
    return fetch(`${BASE_URL}${url}`, options).then(checkResponse)
}

export const refreshToken = () => {
    return fetch(`${BASE_URL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken")
        }),
    }).then(checkResponse);
};

export const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(`${BASE_URL}${url}`, options);
        return await checkResponse(res);
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken();
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem("accessToken", refreshData.accessToken);
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(`${BASE_URL}${url}`, options);
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};