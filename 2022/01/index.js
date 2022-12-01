const fs = require('fs')

fs.readFile('./data.txt', 'utf-8', (error, data) => {
  if (error) {
    console.log(error)
    return
  }

  const total = []
  const largest = []

  const calories = data
    .split(/\n{2}/)
    .map((a) => a.split(/\n/))
    .map((b) => {
      const c = b.reduce((a, b) => Number(a) + Number(b), 0)
      total.push(c)
    })

  for (let i = 0; i < 3; i++) {
    largest[i] = total.reduce((a, b) => (a > b ? a : b), 0)
    total.splice(total.indexOf(largest[i]), 1)
  }

  // ⭐️ part 1
  console.log(largest[0])

  // ⭐️⭐️ part 2
  console.log(largest.reduce((a, b) => a + b, 0))
})
