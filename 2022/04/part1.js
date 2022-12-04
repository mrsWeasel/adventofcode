const fs = require('fs')

fs.readFile('./data.txt', 'utf-8', (error, data) => {
  if (error) {
    console.log(error)
    return
  }

  const isRangeFullyContained = (ranges) => {
    const first = ranges[0].split('-')
    const second = ranges[1].split('-')

    if (
      Number(first[0]) >= Number(second[0]) &&
      Number(first[1]) <= Number(second[1])
    )
      return true
    if (
      Number(second[0]) >= Number(first[0]) &&
      Number(second[1]) <= Number(first[1])
    )
      return true

    return false
  }

  let counter = 0

  data.split(/\n/).map((pair) => {
    const ranges = pair.split(',')
    if (isRangeFullyContained(ranges)) counter++
  })

  console.log(counter)
})
