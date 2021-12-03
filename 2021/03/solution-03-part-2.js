const fs = require('fs')

fs.readFile('./data.txt', 'utf-8', (error, data) => {
    if (error) {
        console.log(error)
        return
    }

    const arr = data.trim().split(/\n/)
    
    let i = 0
 
    const find = (items, operation) => {
        let zeros = 0
        let ones = 0

        items.map((item) => item[i] == 1 ? ones++ : zeros++)

        let t = ones >= zeros ? 1 : 0       

        if (operation === 'findRare') {
            t = ones < zeros ? 1 : 0
        }
        
        const filtered = items.filter((item) => item[i] == t ? item : null)
        i++

        if (filtered.length > 1) return find(filtered, operation)   
        return filtered
    }

    const r = parseInt(find(arr, 'findRare').join(''), 2)
    i = 0
    const c = parseInt(find(arr, 'findCommon').join(''), 2)
   
    console.log(r * c)
})