const fs = require('fs')

fs.readFile('./data.txt', 'utf-8', (error, data) => {
    if (error) {
        console.log(error)
        return
    }

    const boards = data.split(/\n{2}/).map((all) => all.split(/\n/)).map((board) => board.map((row) => row.trim().replace(/\s+/g, ',').split(',').map(Number)))
   

    const bingo = boards[0][0]
    const history = []

    const winningBoards = []
    
    bingo.map((n) => {
        history.push(n)
        // loop through all boards, omit bingo row in beginning
        for (let b = 1; b < boards.length; b++) {
            if (winningBoards.find(obj => obj.board === b)) continue
            
            // loop through individual board x, y    
            for (let y = 0; y < 5; y++) {
                if (winningBoards.find(obj => obj.board === b)) continue

                let row = boards[b][y].filter((i) => {
                    if (history.indexOf(i) !== -1) return i
                })
                
                if (row.length >= 5) {
                    winningBoards.push({board: b, last: n})
                    break
                } 
                let col = []

                for (let x = 0; x < 5; x++) {  
                    if (winningBoards.find(obj => obj.board === b)) continue

                    if ( history.indexOf(boards[b][x][y]) !== -1 ) col.push( boards[b][x][y] )
                    
                    if (col.length >= 5) {
                        winningBoards.push({board: b, last: n})
                        break
                    } 
                }
            }      
        }
    })
    
    
    const lastCalled = winningBoards[winningBoards.length - 1].last
    const lastBoardId = winningBoards[winningBoards.length - 1].board
    const lastWinner = boards[lastBoardId].flat()

    history.splice(history.indexOf(lastCalled) + 1, history.length - history.indexOf(lastCalled))

    const notCalled = lastWinner.filter((n) => {
        if ( !history.includes(n)) return n
    })

    console.log(lastCalled * notCalled.reduce((a, b) => a + b))
    
})



