const fs = require('fs')

fs.readFile('./data.txt', 'utf-8', (error, data) => {
    if (error) {
        console.log(error)
        return
    }

    const subsystem = data.split('\n')

    let closing = []

    let points = []

    const getPoints = (chars) => {
        let total = 0
        chars.map((c) => {
            total = 5 * total
            if (c === ')') total += 1
            if (c === ']') total += 2
            if (c === '}') total += 3
            if (c === '>') total += 4
        })
        points.push(total)
    }

    const isOpening = (c) => {
        if (c === '(' || c === '{' || c === '<' || c === '[') return true
        return false
    }

    const recordExpectedClosing = (o) => {
        if (o === '(') closing.push(')')
        if (o === '{') closing.push('}')
        if (o === '<') closing.push('>')
        if (o === '[') closing.push(']')
    }

    const validateClosing = (o) => {
        if (o === closing[closing.length - 1]) return true
        return false
    }

    subsystem.map((s) => {
        let v = false
        for (let i = 0; i < s.length; i++) {
            if (isOpening(s[i])) recordExpectedClosing(s[i])
            else {
                v = validateClosing(s[i])
                if (!v) break
                closing.pop()
            }
        }

        if (v) getPoints(closing.reverse())
        closing = []
    })

    const sortNumeric = (a, b) => a - b
    const sortedPoints = points.sort(sortNumeric)
    console.log(sortedPoints[(sortedPoints.length - 1) / 2])
})
