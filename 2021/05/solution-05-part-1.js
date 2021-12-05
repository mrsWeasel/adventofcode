const fs = require('fs')

fs.readFile('./data.txt', 'utf-8', (error, data) => {
    if (error) {
        console.log(error)
        return
    }

    const coordinates = data.split(/\n/).map((a) => a.split(' -> ')).map((b) => b.map((c)=> c.split(',').map(Number)))

    const size = Math.max(...coordinates.flat(2)) + 1
    
    const generateGrid = (s) => {
        const g = []
        for (let i = 0; i < s; i++) {
            g.push(Array(size).fill(0))
        }
        return g
    }

    const grid = generateGrid(size)
    
    const markGridCell = (x, y) => {
        grid[y][x]++
    }

    coordinates.map((c) => {
        const x1 = c[0][0]
        const y1 = c[0][1]
        const x2 = c[1][0]
        const y2 = c[1][1]
        
        if (x1 === x2) {
            const start = Math.min(y1, y2)
            const end = Math.max(y1, y2)
           
            for (let i = start; i < end + 1; i++) {
                markGridCell(x1, i)
            }
        }
        if (y1 === y2) {
            const start = Math.min(x1, x2)
            const end = Math.max(x1, x2)

            for (let i = start; i < end + 1; i++) {
                markGridCell(i, y1)
            }
        }
       
    })
    
    const spots = grid.flat().filter((i) => {
        if (i > 1) return i
    })
    
    console.log(spots.length)
})



