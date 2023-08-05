import { loaderOn, loaderOff, errorOn } from '../loading/actions';
import { showErrorDetails } from '../modal/actions';
import { UserActionTypes, ISetAuthChecked, ISetUser } from './types';
import { IUser, TLogin } from '../../utils/types';
import { AppThunk } from '../../utils/hooks';
import * as Api from '../../utils/api';

export const setAuthChecked = (value: boolean): ISetAuthChecked => ({
    type: UserActionTypes.SET_AUTH_CHECKED,
    payload: value
});

export const setUser = (user: Omit<IUser, 'password'> | null): ISetUser => ({
    type: UserActionTypes.SET_USER,
    payload: user
});

export const getUser = (): AppThunk<Promise<void>> => {
    return (dispatch) => {
        dispatch(loaderOn());
        return Api.getUser()
            .then((res) => {
                dispatch(setUser(res.user));
                dispatch(loaderOff());
            });
    };
};

export const login = (data: TLogin): AppThunk => {
    return (dispatch) => {
        dispatch(loaderOn());
        return Api.login(data)
            .then((res) => {
                localStorage.setItem("accessToken", res.accessToken);
                localStorage.setItem("refreshToken", res.refreshToken);
                dispatch(setUser(res.user));
                dispatch(setAuthChecked(true));
                dispatch(loaderOff());
            })
            .catch((err) => {
                dispatch(loaderOff());
                dispatch(showErrorDetails('Ошибка при запросе:'));
                if (err.message === 'email or password are incorrect') {
                    dispatch(errorOn('Неверное имя пользователя или пароль.'));
                } else {
                    dispatch(errorOn(`Ошибка: ${err.message}.`));
                }
            })
    };
};

export const register = (data: IUser): AppThunk => {
    return (dispatch) => {
        dispatch(loaderOn());
        return Api.register(data)
            .then((res) => {
                localStorage.setItem("accessToken", res.accessToken);
                localStorage.setItem("refreshToken", res.refreshToken);
                dispatch(setUser(res.user));
                dispatch(setAuthChecked(true));
                dispatch(loaderOff());
            })
            .catch((err) => {
                dispatch(loaderOff());
                dispatch(showErrorDetails('Ошибка при запросе:'));
                if (err.message === 'User already exists') {
                    dispatch(errorOn('Пользователь с данным e-mail уже существует.'));
                } else {
                    dispatch(errorOn(`Ошибка: ${err.message}.`));
                }
            })
    };
};

export const checkUserAuth = (): AppThunk => {
    return (dispatch) => {
        if (localStorage.getItem("accessToken")) {
            dispatch(getUser())
                .catch(() => {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    dispatch(setUser(null));
                    dispatch(loaderOff());
                })
                .finally(() => dispatch(setAuthChecked(true)));
        } else {
            dispatch(setAuthChecked(true));
        }
    };
};


export const logout = (): AppThunk => {
    return (dispatch) => {
        dispatch(loaderOn());
        return Api.logout()
            .then(() => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                dispatch(setUser(null));
                dispatch(loaderOff());
            })
            .catch((err) => {
                dispatch(errorOn(`Ошибка: ${err.message}.`));
                dispatch(loaderOff());
                dispatch(showErrorDetails('Ошибка при запросе'));
            })
    };
};
