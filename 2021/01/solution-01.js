const fs = require('fs')


fs.readFile('./data.txt', 'utf-8', (error, data) => {
    if (error) {
        console.log(error)
        return
    }
    
    const arr = data.trim().split(/\n/)
    

    // First part
    let counter1 = 0

    arr.forEach((val, i) => {
        Number(val) > Number(arr[i-1]) ? counter1 ++ : counter1 = counter1
    })

    console.log(counter1)

    // Second part
    let counter2 = 0

    arr.forEach((val, i) => {
        if (i > 2) {
            const windowOfThree = Number(val) + Number(arr[i-1]) + Number(arr[i-2])
            const previousWindowOfThree = Number(arr[i-1]) + Number(arr[i-2]) + Number(arr[i-3])
            windowOfThree > previousWindowOfThree ? counter2 ++ : counter2 = counter2
        }
    })

    console.log(counter2)

})



