const fs = require('fs')

fs.readFile('./data.txt', 'utf-8', (error, data) => {
  if (error) {
    console.log(error)
    return
  }

  let num = ''
  let sum = 0

  const grid = data.split('\n').map((row) => row.split(''))

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (!Number.isNaN(Number(grid[i][j]))) {
        num += grid[i][j]

        // if we have reached the end of the number, time to look for adjacents
        if (Number.isNaN(Number(grid[i][j + 1]))) {
          const adjacentsFound = !!grid
            .slice(
              i - 1 >= 0 ? i - 1 : 0,
              i + 2 <= grid.length ? i + 2 : undefined
            )
            .flatMap((row) =>
              row.slice(
                j - num.length >= 0 ? j - num.length : 0,
                j + 2 <= row.length ? j + 2 : undefined
              )
            )
            .find((char) => char.match(/[^0-9a-zA-Z.]/g))

          if (adjacentsFound) sum += Number(num)

          num = ''
        }
      }
    }
  }
  console.log(sum)
})
