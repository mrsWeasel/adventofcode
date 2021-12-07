const fs = require('fs')

fs.readFile('./data.txt', 'utf-8', (error, data) => {
    if (error) {
        console.log(error)
        return
    }

    const crabs = data.split(',').map(Number)
    const positions = Array(crabs.reduce((a,b) => a >= b ? a : b) + 1).fill(0)
    crabs.map((c)=> positions[c]++)

    let dist = []
    
    positions.map((pos, i) => {
        
        const temp = []
        
        for (let j = 0; j < positions.length; j++) {
            // distance to position "i"
            const min = Math.min(i, j)
            const max = Math.max(j, i)

            temp.push((max - min) * positions[j])
        }
        dist.push(temp.reduce((a,b)=>a+b))
    })
    
    const smallest = dist.reduce((a,b) => a <= b ? a : b)
    console.log(smallest)
})



