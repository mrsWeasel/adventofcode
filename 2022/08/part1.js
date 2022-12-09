const fs = require('fs')

fs.readFile('./data.txt', 'utf-8', (error, data) => {
  if (error) {
    console.log(error)
    return
  }

  // make a 2-dimensional array out of data
  const grid = data.split(/\n/).map((a) => a.split('').map((b) => [Number(b)]))
  
  let counter = 0

  const isVisibleFromLeft = (y, x, height) => {
    // left edge
    if (x === 0) return true

    for (let i = 0; i < x; i++) {
      if (grid[y][i] >= height) return false
    }

    return true
  }

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const height = grid[y][x]
      if (isVisibleFromLeft(y, x, height)) {
        counter += 1
        continue
      }
      // if (isVisibleFromRight(tree)) {
      //   counter += 1
      //   continue
      // }  
      // if (isVisibleFromTop(tree)) {
      //   counter += 1
      //   continue
      // }  
      // if (isVisibleFromBottom(tree)) {
      //   counter += 1
      // }  
    }
  }

  console.log(counter)
})
