const fs = require("fs");

fs.readFile("./data.txt", "utf-8", (error, data) => {
  if (error) {
    console.log(error)
    return
  }

  const subsystem = data.split('\n')

  const closing = []

  let points = 0

  const getPoints = (c) => {
    if (c === ')') points += 3
    if (c === '}') points += 1197
    if (c === '>') points += 25137
    if (c === ']') points += 57
  }

  const isOpening = (c) => {
    if (c === '(' || c === '{' || c === '<' || c === '[') return true
    return false
  }

  const recordExpectedClosing = (o) => {
    if (o === '(') closing.push(')')
    if (o === '{') closing.push('}')
    if (o === '<') closing.push('>')
    if (o === '[') closing.push(']')
  }

  const validateClosing = (o) => {
    if (o === closing[closing.length - 1]) return true
    return false
  }

  subsystem.map((s) => {
      for (let i = 0; i < s.length; i++) {
          if (isOpening(s[i])) recordExpectedClosing(s[i])
          else {
              let v = validateClosing(s[i])  
              if (v) {
                  closing.pop()
              } else {
                  console.log(`expected ${closing[closing.length - 1]} but found ${s[i]} instead`)
                  getPoints(s[i])
                  break
              }
          }    
      }
  })
  console.log(points)
})  