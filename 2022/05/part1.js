const fs = require('fs')

fs.readFile('./data.txt', 'utf-8', (error, data) => {
  if (error) {
    console.log(error)
    return
  }

  const cranes = []

  data
    .split(/\n{2}/)[0]
    .split(/\n/)
    .reverse()
    .map((line) => {
      let index = 0

      for (let i = 0; i < line.length; i += 4) {
        if (cranes.length <= index) cranes.push([])
        if (line[i] === '[') {
          cranes[index].push(`${line[i]}${line[i + 1]}${line[i + 2]}`)
        }

        index += 1
      }
    })

  const instructions = data.split(/\n{2}/)[1].split(/\n/)

  instructions.map((line) => {
    const splittedInstructions = line.split(' ')
    const move = Number(splittedInstructions[1])
    const from = Number(splittedInstructions[3]) - 1
    const to = Number(splittedInstructions[5]) - 1

    for (let i = 0; i < move; i++) {
      const crane = cranes[from].pop()
      cranes[to].push(crane)
    }
  })
  cranes.map((c) => {
    const crane = c[c.length - 1]
    if (crane) console.log(crane.replace('[', '').replace(']', ''))
  })
})
