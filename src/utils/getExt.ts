
export default function (filename: string) {
    const re = /\.[^\.]+$/
    return re.exec(filename) !== null
        ? re.exec(filename)![0]
        : null
}
