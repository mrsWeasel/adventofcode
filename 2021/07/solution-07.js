const fs = require('fs')

fs.readFile('./data.txt', 'utf-8', (error, data) => {
    if (error) {
        console.log(error)
        return
    }

    const crabs = data.split(',').map(Number)
    const positions = Array(crabs.reduce((a,b) => a >= b ? a : b) + 1).fill(0)
    crabs.map((c)=> positions[c]++)

    const dist = []
    const gas = []

    const adder = (min, max) => {
        const diff = max - min
        let sum = 0
        for (let i = 0; i < diff + 1; i++) {
            sum += i
        }
        return sum
    }
    
    positions.map((pos, i) => {
        
        const tempDist = []
        const tempGas = []
        
        for (let j = 0; j < positions.length; j++) {
            // distance to position "i"
            const min = Math.min(i, j)
            const max = Math.max(j, i)

            tempDist.push((max - min) * positions[j])
            tempGas.push(positions[j] * adder(min, max))
            
        }
        dist.push(tempDist.reduce((a,b)=>a+b))
        gas.push(tempGas.reduce((a,b)=>a+b))
       
    })

    // Part 1
    const smallestDist = dist.reduce((a,b) => a <= b ? a : b)
    console.log(smallestDist)
    
    // Part 1
    const smallestGasConsumption = gas.reduce((a,b) => a <= b ? a : b)
    console.log(smallestGasConsumption)
})



