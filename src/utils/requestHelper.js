import { config } from './config';

const BASE_URL = config.baseUrl;

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(res.status);
}

export function requestHelper(url, options) {
    return fetch(`${BASE_URL}${url}`, options).then(checkResponse)
}