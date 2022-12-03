const fs = require('fs')

fs.readFile('./data.txt', 'utf-8', (error, data) => {
  if (error) {
    console.log(error)
    return
  }

  const items = []

  const countPriority = (letter) => {
    if (letter === letter.toLowerCase()) {
      return letter.charCodeAt(0) - 96
    }
    return letter.charCodeAt(0) - 38
  }

  const bps = data.split(/\n/)

  for (let i = 0; i < bps.length; i += 3) {
    try {
      for (let j = 0; j < bps[i].length; j++) {
        const item = bps[i][j]
        if (bps[i + 1].includes(item) && bps[i + 2].includes(item)) {
          items.push(item)
          break
        }
      }
    } catch (e) {}
  }

  console.log(items.map((i) => countPriority(i)).reduce((a, b) => a + b, 0))
})
