const fs = require('fs')

fs.readFile('./data.txt', 'utf-8', (error, data) => {
    if (error) {
        console.log(error)
        return
    }
    const a = new RegExp(/a-z/)
    const b = new RegExp(/a-z/)
    const digits = data
        .replace(/${a}\n${b}/, /${a}${b}/)
        .split(/\n/)
        .map((d) => d.split(' | '))
        .flat(2)

    let count = 0

    const matchingChars = (str, comparison) => {
        count = 0
        for (let i = 0; i < comparison.length; i++) {
            if (str.includes(comparison[i])) count++
        }
        return count
    }

    const deduceDigits = (digits) => {
        const decoded = Array(10).fill('')

        digits = digits.split(' ').map((d) => d.replace(/\s+/g))

        // 1, 4, 7, 8
        for (let i = 0; i < digits.length; i++) {
            if (digits[i].length === 2) decoded[1] = digits[i]
            else if (digits[i].length === 4) decoded[4] = digits[i]
            else if (digits[i].length === 3) decoded[7] = digits[i]
            else if (digits[i].length === 7) decoded[8] = digits[i]
        }
        // 9
        for (let i = 0; i < digits.length; i++) {
            if (
                !decoded[9] &&
                digits[i].length === 6 &&
                matchingChars(digits[i], decoded[4]) === 4
            )
                decoded[9] = digits[i]
        }
        // 6
        for (let i = 0; i < digits.length; i++) {
            if (
                !decoded[6] &&
                digits[i].length === 6 &&
                matchingChars(digits[i], decoded[9]) === 5 &&
                matchingChars(digits[i], decoded[1]) === 1
            )
                decoded[6] = digits[i]
        }
        // 0
        for (let i = 0; i < digits.length; i++) {
            if (
                !decoded[0] &&
                digits[i].length === 6 &&
                matchingChars(digits[i], decoded[8]) === 6 &&
                matchingChars(digits[i], decoded[4]) === 3 &&
                matchingChars(digits[i], decoded[1]) === 2
            )
                decoded[0] = digits[i]
        }
        // 5
        for (let i = 0; i < digits.length; i++) {
            if (
                !decoded[5] &&
                digits[i].length === 5 &&
                matchingChars(digits[i], decoded[6]) === 5 &&
                matchingChars(digits[i], decoded[4]) === 3
            )
                decoded[5] = digits[i]
        }
        // 3
        for (let i = 0; i < digits.length; i++) {
            if (
                !decoded[3] &&
                digits[i].length === 5 &&
                matchingChars(digits[i], decoded[8]) === 5 &&
                matchingChars(digits[i], decoded[7]) === 3
            )
                decoded[3] = digits[i]
        }
        // 2
        for (let i = 0; i < digits.length; i++) {
            if (
                !decoded[2] &&
                digits[i].length === 5 &&
                matchingChars(digits[i], decoded[3]) === 4 &&
                matchingChars(digits[i], decoded[6]) === 4
            )
                decoded[2] = digits[i]
        }

        return decoded
    }

    const allSums = []

    for (let i = 0; i < digits.length; i += 2) {
        const deduced = deduceDigits(digits[i])
        const fourDigits = digits[i + 1].split(' ')
        let sum = []

        fourDigits.map((f) => {
            for (let j = 0; j < deduced.length; j++) {
                let charsFound = true

                if (deduced[j].length !== f.length) charsFound = false
                for (h = 0; h < f.length; h++) {
                    if (!deduced[j].includes(f[h])) charsFound = false
                }
                if (charsFound) sum.push(deduced.indexOf(deduced[j]))
            }
        })
        allSums.push(sum.map(String).join(''))
    }
    // This is part 2 solution. Part 1 got wiped out in the process...
    console.log(allSums.reduce((a, b) => Number(a) + Number(b)))
})
