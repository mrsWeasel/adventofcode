const fs = require('fs')

fs.readFile('./data.txt', 'utf-8', (error, data) => {
  if (error) {
    console.log(error)
    return
  }

  let counter = 0

  const shape = (s) => {
    if (s === 'A' || s === 'X') return 'ROCK'
    if (s === 'B' || s === 'Y') return 'PAPER'
    if (s === 'C' || s === 'Z') return 'SCISSORS'
  }

  const outcome = (o) => {
    /* X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win. */
    if (o === 'X') return 'LOSE'
    if (o === 'Y') return 'DRAW'
    if (o === 'Z') return 'WIN'
  }

  const handleRound = (a, b) => {
    const elf = shape(a)
    const self = shape(b)

    const win = () => {
      counter += 6
    }

    const draw = () => {
      counter += 3
    }

    switch (self) {
      case 'ROCK':
        counter += 1
        if (elf === 'SCISSORS') win()
        if (elf === self) draw()
        break
      case 'PAPER':
        counter += 2
        if (elf === 'ROCK') win()
        if (elf === self) draw()
        break
      case 'SCISSORS':
        counter += 3
        if (elf === 'PAPER') win()
        if (elf === self) draw()
        break
      default:
    }
  }

  handleRoundByOutcome = (a, b) => {
    const elf = shape(a)
    const self = outcome(b)

    const playRock = () => {
      counter += 1
    }

    const playPaper = () => {
      counter += 2
    }

    const playScissors = () => {
      counter += 3
    }

    switch (self) {
      case 'LOSE':
        if (elf === 'ROCK') playScissors()
        if (elf === 'PAPER') playRock()
        if (elf === 'SCISSORS') playPaper()
        break
      case 'DRAW':
        counter += 3
        if (elf === 'ROCK') playRock()
        if (elf === 'PAPER') playPaper()
        if (elf === 'SCISSORS') playScissors()
        break
      case 'WIN':
        counter += 6
        if (elf === 'ROCK') playPaper()
        if (elf === 'PAPER') playScissors()
        if (elf === 'SCISSORS') playRock()
        break
      default:
    }
  }

  data.split(/\n/).map((line) => handleRound(line[0], line[2]))
  // ⭐️ part 1
  console.log(counter)
  counter = 0

  data.split(/\n/).map((line) => handleRoundByOutcome(line[0], line[2]))
  // ⭐️⭐️ part 2
  console.log(counter)
})
