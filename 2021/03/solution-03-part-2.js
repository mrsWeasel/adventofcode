const fs = require('fs')

fs.readFile('./data.txt', 'utf-8', (error, data) => {
    if (error) {
        console.log(error)
        return
    }

    const arr = data.trim().split(/\n/)
    
    let i = 0
    const o = (items) => {
        let zeros = 0
        let ones = 0

        items.map((item) => {
            item[i] == 1 ? ones++ : zeros++ 
        })

        const m = ones >= zeros ? 1 : 0

        const filtered = items.filter((item) => {
            if (item[i] == m) return item
        })
        
        i++
        
        if (filtered.length > 1) return o(filtered)   
        return filtered
    }

    let y = 0
    const s = (items) => {
        let zeros = 0
        let ones = 0

        items.map((item) => {
            item[y] == 1 ? ones++ : zeros++ 
        })
      
        const l = ones < zeros ? 1 : 0

        const filtered = items.filter((item) => {
            if (item[y] == l) return item
        })
        
        y++
        
        if (filtered.length > 1) return s(filtered)   
        return filtered
    }

    console.log(parseInt(o(arr).join(''), 2) * parseInt(s(arr).join(''), 2))
})