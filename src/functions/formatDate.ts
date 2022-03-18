function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
}

function formatDate(date: Date) {
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join('/');
}

export function formatDateHour(date: string) {
    const newDate = new Date(date)
    const datetext = newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds();
    const formattedDate = formatDate(newDate)

    const fullDate = `${formattedDate} as ${datetext}`

    return fullDate;
}