export default function formatDate(timestamp) {
    const date = new Date(timestamp * 1000)

    let day = String(date.getDate())
    if (day.length === 1) day = '0'.concat(day)

    let month = String(date.getMonth() + 1)
    if (month.length === 1) month = '0'.concat(month)

    let year = String(date.getFullYear())

    return `${day}.${month}.${year}`
}