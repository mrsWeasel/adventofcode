const fs = require('fs')

fs.readFile('./data.txt', 'utf-8', (error, data) => {
  if (error) {
    console.log(error)
    return
  }

  let octopus = data.split('\n').map((r) => r.split('').map(Number))

  let flashCounter = 0
  let flashing = []

  for (let i = 0; i < octopus[0].length; i++) {
    flashing.push(Array(octopus[0].length).fill(0))
  }

  const selectAdjacent = (x, y) => {
    adjacent = []
    for (let i = 0; i < octopus[0].length; i++) {
      adjacent.push(Array(octopus[0].length).fill(0))
    }

    const d = {
      up: [x, y - 1 ],
      upR: [x + 1, y - 1],
      right: [x + 1,  y],
      downR: [x + 1, y + 1],
      down: [x, y + 1],
      downL: [x - 1, y + 1 ],
      left: [x - 1, y],
      upLeft: [x - 1, y - 1]
    }

    for (const dir in d) {
      try {
        if (typeof octopus[d[dir][1]][d[dir][0]] !== 'undefined') {
          adjacent[d[dir][1]][d[dir][0]] = 1
        }
      } catch (error) {}
    }
    return adjacent
  }

  const flash = (f) => {
  
    f.flat().map((item) => {
      if (item) flashCounter++
    })

    let adjacentFlashing = false
    
    flashingNext = []
    for (let i = 0; i < octopus[0].length; i++) {
      flashingNext.push(Array(octopus[0].length).fill(0))
    }

    // add 1
    for (let i = 0; i < f.length; i++) {
      for (let j = 0; j < f[i].length; j++) {
        if (!f[i][j]) continue
        let adjacent = selectAdjacent(j, i)
        for (let k = 0; k < adjacent.length; k++) {
          for (let l = 0; l < adjacent[k].length; l++) {
            if (!adjacent[k][l]) continue
            octopus[k][l]++
          }
        }
      }
    }
    for (let i = 0; i < octopus.length; i++) {
      for (let j = 0; j < octopus[i].length; j++) {
        if (octopus[i][j] > 9 && !flashing[i][j]) {
          flashingNext[i][j] = 1
          flashing[i][j] = 1
          adjacentFlashing = true
        }
      }
    }
    if (adjacentFlashing) flash(flashingNext)
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
            // flash(j, i)
            flashing[i][j] = 1
          }
        }
      }

      flash(flashing)

      // Set all flashed octopuses to 0
      for (let i = 0; i < octopus.length; i++) {
        for (let j = 0; j < octopus[i].length; j++) {
          if (flashing[i][j]) {
            octopus[i][j] = 0
          }
        }
      }
      steps--

      console.log(octopus.join('\n'), '\n\n')
      flashing = []
      for (let i = 0; i < octopus[0].length; i++) {
        flashing.push(Array(octopus[0].length).fill(0))
      }
    }
  }

  simulateSteps(100)
  console.log(flashCounter)
})
