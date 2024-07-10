export function formatDate(date: Date): string {
    const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return date.getDate() + " " + monthsOfYear[date.getMonth()] + " " + date.getFullYear();
}

export function formatDuration(ms: number): string {
    if (ms < 60e3) return "just now";
    ms /= 60e3;
    if (ms < 60) return Math.floor(ms) + " minutes ago";
    ms /= 60;
    if (ms < 24) return Math.floor(ms) + " hours ago";
    ms /= 24;
    if (ms < 30.5) return Math.floor(ms) + " days ago";
    if (ms < 365) return Math.floor(ms / 30.5) + " months ago";
    ms /= 365;
    return Math.floor(ms) + " years ago";
}