const fs = require('fs')

fs.readFile('./data.txt', 'utf-8', (error, data) => {
    if (error) {
        console.log(error)
        return
    }

    const fish = data.split(',').map(Number)

    const updateFish = (fish, days) => {
        let pool = Array(9).fill(0)
        
        // populate pool with fish 
        // (position 0 => fish that will produce more fish next etc.)
        fish.map((f) => pool[f]++)

        for (let i = 0; i < days; i++) {
            let newFish = 0
            if (pool[0] > 0) {
                newFish = pool[0]
            } 
            pool.shift()
            pool[6] += newFish
            pool.push(newFish)
        }    

        return pool
    }

    // Part 1/2
    console.log(updateFish(fish, 80).reduce((a,b) => a + b))

    // Part 2/2
    console.log(updateFish(fish, 256).reduce((a,b) => a + b))
})



