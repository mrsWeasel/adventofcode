const fs = require('fs')

fs.readFile('./data.txt', 'utf-8', (error, data) => {
  if (error) {
    console.log(error)
    return
  }

  let counter = 0

  let accumulatedPoints = 0
  let winningNumbers = []

  data.split('\n').map((row) =>
    row
      // Clean up data first
      .replace(/Card [0-9]+:\s+/, '')
      .split(' | ')
      .map((half) =>
        half
          .replace(/\s+/, ' ')
          .split(' ')
          .filter((num) => num)
      )
      .map((half, index) => {
        if (index === 0) {
          console.log(half)
          half.forEach((num) => winningNumbers.push(num))
        } else {
          half.forEach((num) => {
            if (winningNumbers.indexOf(num) === -1) return

            if (accumulatedPoints) {
              accumulatedPoints = accumulatedPoints * 2
            } else {
              accumulatedPoints = 1
            }
          })
          counter += accumulatedPoints
          accumulatedPoints = 0
          winningNumbers = []
        }
      })
  )

  // Part 1 ⭐️
  console.log(counter)
})
