export default function DateDisplay(date: Date): string{
    return date.toLocaleTimeString() + " " + date.toLocaleDateString()
}