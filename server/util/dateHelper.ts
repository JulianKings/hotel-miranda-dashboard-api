import moment from "moment";

export function getDateString(date: Date): string
{
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
}