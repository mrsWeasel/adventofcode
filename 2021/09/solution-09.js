const fs = require("fs");

fs.readFile("./data.txt", "utf-8", (error, data) => {
  if (error) {
    console.log(error)
    return
  }
  
  const grid = data.split(/\n/).map((a) => a.split('').map(Number))
  let risk = 0

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const curr = grid[i][j]
      //adjacent items
      const left = grid[i] ? grid[i][j-1] : undefined
      const right = grid[i] ? grid[i][j+1] : undefined
      const up = grid[i-1] ? grid[i-1][j] : undefined
      const down = grid[i+1] ? grid [i+1][j] : undefined
      
      if ((curr < left || left === undefined) && (curr < right || right === undefined) && (curr < up || up === undefined) && (curr < down || down === undefined) ) {
        risk += (1+curr)
      }
    }
  }

  // Part 1 (I just left this as it was before solving part 2)
  console.log(risk, '(part one solution)')

  const state = []
  
  for (let i = 0; i < grid[0].length; i++) {
    state.push(Array(grid[0].length))
  }

  const sizes = []
  let size = []

  const selectAllAdjacent = (grid, x, y) => {
    if (state[y][x] || grid[y][x] > 8) return
    const dir = {
      up : { xPos : x, yPos: y - 1 },
      right : { xPos : x + 1, yPos : y },
      down : { xPos : x, yPos: y + 1},
      left : { xPos : x - 1, yPos : y },
    }
    state[y][x] = 1
    size.push(grid[y][x])

    try {
      const x = dir.up.xPos
      const y = dir.up.yPos
      if (grid[y][x] < 9 && grid[y][x] !== undefined && !state[y][x]) selectAllAdjacent(grid, x, y)
    } catch (error) {
      
    }
    try {
      const x = dir.right.xPos
      const y = dir.right.yPos 
      if (grid[y][x] < 9 && grid[y][x] !== undefined && !state[y][x]) selectAllAdjacent(grid, x, y)
    } catch (error) {
      
    }
    try {
      const x = dir.down.xPos
      const y = dir.down.yPos
      if (grid[y][x] < 9 && grid[y][x] !== undefined && !state[y][x]) selectAllAdjacent(grid, x, y)
    } catch (error) {
      
    }
    try {
      const x = dir.left.xPos
      const y = dir.left.yPos
      if (grid[y][x] < 9 && grid[y][x] !== undefined && !state[y][x]) selectAllAdjacent(grid, x, y)
    } catch (error) {
      
    }

  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const curr = grid[i][j]
      selectAllAdjacent(grid, j, i)
      if (size.length > 0) sizes.push(size.length)
      size = []
    }
  }
  
  const sortNumeric = (a, b) => b - a
  const sortedSizes = (sizes.sort(sortNumeric))

  console.log(sortedSizes[0] * sortedSizes[1] * sortedSizes[2], '(part two solution)')
})
