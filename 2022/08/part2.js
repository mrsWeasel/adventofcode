const fs = require('fs')

fs.readFile('./data.txt', 'utf-8', (error, data) => {
  if (error) {
    console.log(error)
    return
  }

  // make a 2-dimensional array out of data
  const grid = data.split(/\n/).map((a) => a.split('').map((b) => [Number(b)]))

  let highest = 0

  const move = (x, y, to, grid) => {
    try {
      switch (to) {
        case 'LEFT':
          return grid[y][x - 1]
        case 'RIGHT':
          return grid[y][x + 1]
        case 'UP':
          return grid[y - 1][x]
        case 'DOWN':
          return grid[y + 1][x]
        default:
      }
    } catch (e) {
      return null
    }
  }

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      let height = grid[y][x]

      const counter = {
        left: 0,
        right: 0,
        up: 0,
        down: 0,
      }

      while (true) {
        const left = move(x - counter.left, y, 'LEFT', grid)
        if (!left) break
        counter.left++
        if (left >= height) break
      }

      while (true) {
        const right = move(x + counter.right, y, 'RIGHT', grid)
        if (!right) break
        counter.right++
        if (right >= height) break
      }

      while (true) {
        const up = move(x, y - counter.up, 'UP', grid)
        if (!up) break
        counter.up++
        if (up >= height) break
      }

      while (true) {
        const down = move(x, y + counter.down, 'DOWN', grid)
        if (!down) break
        counter.down++
        if (down >= height) break
      }

      const score = counter.left * counter.right * counter.up * counter.down

      if (score > highest) highest = score
    }
  }

  console.log(highest)
})
