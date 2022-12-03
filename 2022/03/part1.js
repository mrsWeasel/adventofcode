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

  data.split(/\n/).map((bp) => {
    let str = ''
    for (let i = 0; i < bp.length / 2; i++) {
      str += bp[i]
    }

    const rest = bp.replace(str, '')
    for (let i = 0; i < str.length; i++) {
      if (rest.includes(str[i])) {
        items.push(str[i])
        break
      }
    }
  })

  console.log(items.map((i) => countPriority(i)).reduce((a, b) => a + b, 0))
})
