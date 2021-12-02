const fs = require('fs')

fs.readFile('./data.txt', 'utf-8', (error, data) => {
    if (error) {
        console.log(error)
        return
    }

    const arr = data.trim().split(/\n/)
    
    const commands = []
    arr.map((item)=>{
        commands.push(item.split(' '))
     })

    let x = 0
    let y = 0
    let aim = 0

    move = (dir, amount) => {
        amount = Number(amount)
        
        if (dir === 'forward') {
            return x += amount 
        }

        if (dir === 'up') {
            return y -= amount
        }

        if (dir === 'down') {
            return y += amount
        }
       
    }

    moveWithAim = (dir, amount) => {
        amount = Number(amount)

        if (dir === 'forward') {
            x += amount
            y += amount * aim
            return
        }

        if (dir === 'up') {
            return aim -= amount
        }

        if (dir === 'down') {
            return aim += amount
            
        }

    }

    resetCoordinates = () => {
        x = 0
        y = 0
        aim = 0
    }

    // First part
    commands.forEach((item)=> {
        move(item[0], item[1])
    })

    console.log(x * y)

    // Second part
    resetCoordinates()
    commands.forEach((item)=> {
        moveWithAim(item[0], item[1])
    })
 
    console.log(x * y)
})



