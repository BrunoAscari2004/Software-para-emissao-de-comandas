import { format } from 'date-fns';

export default class DateUtils {
    static getFormattedDate(date?: Date | string): string {
        return format(new Date(date ?? Date.now()), 'yyyy-MM-dd');
    }

    static getFormattedDatetimeLocal(date?: Date | string): string {
        return format(new Date(date ?? Date.now()), "yyyy-MM-dd'T'HH:mm");
    }
}
