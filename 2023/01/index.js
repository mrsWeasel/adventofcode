const fs = require('fs')

fs.readFile('./data.txt', 'utf-8', (error, data) => {
  if (error) {
    console.log(error)
    return
  }

  const digits = new Map()

  digits.set('one', '1')
  digits.set('two', '2')
  digits.set('three', '3')
  digits.set('four', '4')
  digits.set('five', '5')
  digits.set('six', '6')
  digits.set('seven', '7')
  digits.set('eight', '8')
  digits.set('nine', '9')

  const getDigitFromLetters = (letters) => {
    let foundDigit
    let foundIndex
    ;[...digits.keys()].forEach((key, index) => {
      if (letters.includes(key)) {
        foundDigit =
          foundIndex === undefined || index < foundIndex
            ? digits.get(key)
            : foundDigit

        foundIndex =
          foundIndex === undefined || index < foundIndex ? index : foundIndex
      }
    })

    return foundDigit
  }

  const getOnlyDigits = (string) => {
    let digitString = ''
    let letters = ''

    // get first digit
    for (let i = 0; i < string.length; i++) {
      const char = string[i]
      if (!Number.isNaN(Number(char))) {
        letters = ''
        digitString += char
        break
      }

      letters += char

      const digitFromFirstLetters = getDigitFromLetters(letters)

      if (digitFromFirstLetters) {
        letters = ''
        digitString += digitFromFirstLetters
        break
      }
    }

    // get last digit
    for (let i = string.length - 1; i >= 0; i--) {
      const char = string[i]
      if (!Number.isNaN(Number(char))) {
        letters = ''
        digitString += char
        break
      }

      letters = char + letters

      const digitFromLastLetters = getDigitFromLetters(letters)

      if (digitFromLastLetters) {
        letters = ''
        digitString += digitFromLastLetters
        break
      }
    }

    return digitString
  }

  const values = data
    .split('\n')
    .map((v) => getOnlyDigits(v))
    .map((row) => row[0] + row[row.length - 1])
    .reduce((a, b) => Number(a) + Number(b), 0)

  console.log(values)
})
