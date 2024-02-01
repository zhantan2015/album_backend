export default function (length: number) {
    let result = ''
    while (result.length < length) {
        result += Math.random().toString(36).split('.')[1]
    }
    return result.length === length ? result : result.slice(0, length)
}