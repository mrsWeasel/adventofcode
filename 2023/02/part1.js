const fs = require('fs')

fs.readFile('./data.txt', 'utf-8', (error, data) => {
  if (error) {
    console.log(error)
    return
  }

  let counter = 0

  data.split('\n').map((game, i) => {
    let gamePossible = true

    game
      .split(': ')
      .pop()
      .split('; ')
      .map((set) => set.split(', '))
      .forEach((colors) => {
        for (let i = 0; i < colors.length; i++) {
          const color = colors[i]

          if (color.includes('red') && Number(color.replace(' red', '')) > 12) {
            gamePossible = false
            break
          }

          if (
            color.includes('green') &&
            Number(color.replace(' green', '')) > 13
          ) {
            gamePossible = false
            break
          }

          if (
            color.includes('blue') &&
            Number(color.replace(' blue', '')) > 14
          ) {
            gamePossible = false
            break
          }
        }
      })
    if (gamePossible) counter += i + 1
  })

  console.log(counter)
})
