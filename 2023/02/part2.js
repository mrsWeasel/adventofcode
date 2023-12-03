const fs = require('fs')

fs.readFile('./data.txt', 'utf-8', (error, data) => {
  if (error) {
    console.log(error)
    return
  }

  let counter = 0

  data.split('\n').map((game, i) => {
    let minRed = 0
    let minGreen = 0
    let minBlue = 0

    game
      .split(': ')
      .pop()
      .split('; ')
      .map((set) => set.split(', '))
      .forEach((colors) => {
        for (let i = 0; i < colors.length; i++) {
          const red = Number(colors[i].replace(' red', '')) ?? 0
          const green = Number(colors[i].replace(' green', '')) ?? 0
          const blue = Number(colors[i].replace(' blue', '')) ?? 0

          if (red > minRed) minRed = red

          if (green > minGreen) minGreen = green

          if (blue > minBlue) minBlue = blue
        }
      })
    counter += minRed * minGreen * minBlue
  })

  console.log(counter)
})
