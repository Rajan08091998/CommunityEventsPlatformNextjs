export const baseUrl = process.env.NEXT_PUBLIC_API_URL

export const formatDateTime = (dateTime: string) => {
    const [date, time] = dateTime.split('T');
    const [year, month, day] = date.split('-');
    const [hour, minute] = time.split(':');
    return `${year}/${month}/${day}  Time: ${hour}:${minute}`;
}
