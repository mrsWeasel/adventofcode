const fs = require('fs')

fs.readFile('./data.txt', 'utf-8', (error, data) => {
  if (error) {
    console.log(error)
    return
  }

  // make a 2-dimensional array out of data
  const grid = data.split(/\n/).map((a) => a.split('').map((b) => [Number(b)]))

  let counter = 0

  const isVisibleFromLeft = (y, height, length) => {
    for (let i = 0; i < length; i++) {
      if (grid[y][i] >= height) return false
    }
    return true
  }

  const isVisibleFromTop = (x, height, length) => {
    for (let i = 0; i < length; i++) {
      if (grid[i][x] >= height) return false
    }
    return true
  }

  const isVisibleFromRight = (y, x, height, length) => {
    for (let i = length - 1; i > x; i--) {
      if (grid[y][i] >= height) return false
    }
    return true
  }

  const isVisibleFromBottom = (y, x, height, length) => {
    for (let i = length - 1; i > y; i--) {
      if (grid[i][x] >= height) return false
    }
    return true
  }

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const height = grid[y][x]

      if (isVisibleFromLeft(y, height, x)) {
        counter += 1
        continue
      }
      if (isVisibleFromRight(y, x, height, grid[y].length)) {
        counter += 1
        continue
      }
      if (isVisibleFromTop(x, height, y)) {
        counter += 1
        continue
      }
      if (isVisibleFromBottom(y, x, height, grid.length)) {
        counter += 1
      }
    }
  }
  console.log(counter)
})
