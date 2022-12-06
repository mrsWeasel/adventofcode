const fs = require('fs')

fs.readFile('./data.txt', 'utf-8', (error, data) => {
  if (error) {
    console.log(error)
    return
  }

  ;(() => {
    for (let i = 0; i < data.length; i += 1) {
      const chars = []
      for (let j = 0; j < 4; j++) {
        if (chars.indexOf(data[i + j]) === -1) chars.push(data[i + j])
        if (chars.length === 4) {
          // ⭐️ part 1
          console.log(i + j + 1)
          return
        }
      }
    }
  })()
})
