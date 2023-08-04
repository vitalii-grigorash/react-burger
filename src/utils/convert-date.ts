import { IOrder, IDate } from '../utils/types';

export const converDate = (order: IOrder): IDate => {
    const date: IDate = {
        time: '',
        day: ''
    }
    const dateNow = new Date();
    const createdAt = new Date(order.createdAt);
    const timeDiff = Math.abs(dateNow.getTime() - createdAt.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)).toString();
    const lastChar = diffDays.charAt(diffDays.length - 1);
    date.time = createdAt.toLocaleTimeString().slice(0, -3);
    if (dateNow.getDate() === createdAt.getDate()) {
        date.day = 'Сегодня';
    } else if (diffDays === '1') {
        date.day = 'Вчера';
    } else if (lastChar === "1" && diffDays !== '11') {
        date.day = `${diffDays} день назад`;
    } else if (lastChar === "2" && diffDays !== '12') {
        date.day = `${diffDays} дня назад`;
    } else if (lastChar === "3" && diffDays !== '13') {
        date.day = `${diffDays} дня назад`;
    } else if (lastChar === "4" && diffDays !== '14') {
        date.day = `${diffDays} дня назад`;
    } else {
        date.day = `${diffDays} дней назад`;
    }
    return date;
}
