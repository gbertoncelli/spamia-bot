import { addDays, format } from "date-fns";
import { it } from 'date-fns/locale/it'

export function today() {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
}

export function tomorrow() {
    const date = today();
    return addDays(date, 1);
}

export function formatDate(date) {
    return format(date, 'EEEE d LLLL', {
        locale: it
    })
} 