export function formatDate(date: Date): string {
    const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return date.getDate() + " " + monthsOfYear[date.getMonth()] + " " + date.getFullYear();
}