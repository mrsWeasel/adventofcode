const fs = require('fs')

fs.readFile('./testdata.txt', 'utf-8', (error, data) => {
  if (error) {
    console.log(error)
    return
  }

  let octopus = data.split('\n').map((r) => r.split('').map(Number))

  let flashing = []
  let flashCounter = 0

  for (let i = 0; i < octopus[0].length; i++) {
    flashing.push(Array(octopus[0].length).fill(0))
  }

  const flash = (x, y) => {
    flashCounter++
    flashing[y][x] = 1
    console.log(x,y)

    const d = {
      up: { xPos: x, yPos: y - 1 },
      upR: { xPos: x + 1, yPos: y - 1 },
      right: { xPos: x + 1, yPos: y },
      downR: { xPos: x + 1, yPos: y + 1 },
      down: { xPos: x, yPos: y + 1 },
      downL: { xPos: x - 1, yPos: y + 1 },
      left: { xPos: x - 1, yPos: y },
      upLeft: { xPos: x - 1, yPos: y - 1 },
    }

    try {
      for (const dir in d) {
        if (typeof octopus[d[dir].yPos][d[dir].xPos] !== 'undefined' && !flashing[d[dir].yPos][d[dir].xPos]) {
          octopus[d[dir].yPos][d[dir].xPos]++
          console.log(octopus[d[dir].yPos][d[dir].xPos])
        }
        if (octopus[d[dir].yPos][d[dir].xPos] > 9 && !flashing[d[dir].yPos][d[dir].xPos]) {
          flash(d[dir].xPos, d[dir].yPos)
          console.log(octopus[d[dir].yPos][d[dir].xPos], 'flashing')
        }
      }
  
    } catch (error) {
      console.log(error)
    }
  }
 
  const simulateSteps = (steps) => {
    while (steps > 0) {
      // First, increase all by 1
      for (let i = 0; i < octopus.length; i++) {
        for (let j = 0; j < octopus[i].length; j++) {
          octopus[i][j]++
        }
      }
      // Then, simulate flashing if energy is > 9
      for (let i = 0; i < octopus.length; i++) {
        for (let j = 0; j < octopus[i].length; j++) {
          if (octopus[i][j] > 9) {
            flashing[i][j] = 0
          }
        }
      }

      // Set all flashed octopuses to 0
      for (let i = 0; i < octopus.length; i++) {
        for (let j = 0; j < octopus[i].length; j++) {
          if (flashing[i][j]) {
            octopus[i][j] = 0
          }
        }
      }

      steps--

      console.log(octopus.join('\n'), '\n\n', flashing.join('\n'), '\n\n')
      flashing = []
      for (let i = 0; i < octopus[0].length; i++) {
        flashing.push(Array(octopus[0].length).fill(0))
      }
    }
    // console.log(octopus)
  }

  simulateSteps(2)
})
