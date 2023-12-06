const fs = require('fs')

fs.readFile('./data.txt', 'utf-8', (error, data) => {
  if (error) {
    console.log(error)
    return
  }
  const seeds = []
  const allValues = []
  let convertedValue = 0
  let conversionDoneInCategory = false

  // Clean up data
  const almanac = data
    .replace(/\n+|\r\n|\r+/, '\n')
    .split('\n')
    .filter((d) => d)

  // Gather seeds and remove
  almanac.map((line, index) => {
    if (index === 1) {
      line.split(' ').forEach((line) => seeds.push(line))
    }
  })

  while (seeds.length > 0) {
    convertedValue = Number(seeds[0])

    // Go through lines of almanac
    almanac.map((line, index) => {
      if (index < 2) return

      // Start of new category (heading)
      if (line.includes(':')) {
        conversionDoneInCategory = false
      } else {
        // If conversion already happened in same category, don't do it again
        if (conversionDoneInCategory) return

        const numbers = line.split(' ')
        const destination = Number(numbers[0])
        const source = Number(numbers[1])
        const length = Number(numbers[2])

        // If current converted value is in range, update it
        if (convertedValue >= source && convertedValue < source + length) {
          convertedValue = convertedValue + destination - source
          conversionDoneInCategory = true
        }
      }
    })

    seeds.shift()
    allValues.push(convertedValue)
  }

  const smallestLocation = allValues.reduce((a, b) => (b < a ? b : a))

  // Part 1 ⭐️
  console.log(smallestLocation)
})
