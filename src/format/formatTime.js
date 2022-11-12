export default function formatTime(timestamp) {
    const date = new Date(timestamp * 1000)

    let hours = String(date.getHours())
    if (hours.length === 1) hours = '0'.concat(hours)

    let minutes = String(date.getMinutes())
    if (minutes.length === 1) minutes = '0'.concat(minutes)

    return `${hours}:${minutes}`
}