const fs = require('fs')

fs.readFile('./data.txt', 'utf-8', (error, data) => {
    if (error) {
        console.log(error)
        return
    }

    const boards = data.split(/\n{2}/).map((all) => all.split(/\n/)).map((board) => board.map((row) => row.trim().replace(/\s+/g, ',').split(',').map(Number)))
   

    const bingo = boards[0][0]
    const history = []
    let found = false
    let lastCalled = undefined
    let notCalledinBoard = [] 
    
    bingo.map((n) => {
        
        history.push(n)
        
        // loop through all boards, omit bingo row in beginning
        for (let b = 1; b < boards.length; b++) {
            if (found) break
            // loop through individual board x, y    
            for (let y = 0; y < 5; y++) {
                if (found) break
                let row = boards[b][y].filter((i) => {
                    if (history.indexOf(i) !== -1) return i
                })
                
                if (row.length >= 5) {
                    console.log(row, n)
                    found = true
                    lastCalled = n
                    boards[b].flat().map((i) => {
                        if ( history.indexOf(i) === -1) notCalledinBoard.push(i)
                    })

                    break
                } 
                let col = []

                for (let x = 0; x < 5; x++) {
                    if (found) break
                    
                    if ( history.indexOf(boards[b][x][y]) !== -1 ) col.push( boards[b][x][y] )
                    
                    if (col.length >= 5) {
                        console.log(col, n, boards[b])
                        found = true
                        lastCalled = n
                        boards[b].flat().map((l) => {
                            if ( history.indexOf(i) === -1) notCalledinBoard.push(i)
                        })

                        break
                    } 
                }
            }      
        }
    })

    console.log(lastCalled * notCalledinBoard.reduce((a,b)=>a+b))
})



