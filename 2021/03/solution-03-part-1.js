const fs = require('fs')

fs.readFile('./data.txt', 'utf-8', (error, data) => {
    if (error) {
        console.log(error)
        return
    }

    const arr = data.trim().split(/\n/)
    
    let counter = new Array(12).fill(0)

    arr.map((item) => {
        for (let j = 0; j < item.length; j++) {
           Number(item[j]) && counter[j]++
        }
    })

    const g = counter.map((c) => {
        if (c > arr.length / 2)  return 1
        return 0
    })

    const e = g.map((b) => {
        if (b) return 0
        return 1
    })
    
    console.log(parseInt(g.join(''), 2) * parseInt(e.join(''), 2))
    
})



