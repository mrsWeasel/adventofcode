const fs = require('fs')

fs.readFile('./data.txt', 'utf-8', (error, data) => {
  if (error) {
    console.log(error)
    return
  }

  let cards = []

  // setup cards
  data.split('\n').map((_, index) => {
    cards.push({ id: index + 1, amount: 1 })
  })

  data.split('\n').map((d, index) => {
    const id = index + 1

    // Clean up data
    row = (id + ' | ' + d.replace(/Card [0-9]+:\s+/, ''))
      .split(' | ')
      .map((col) => col.split(' ').filter((num) => num))

    // count how many copies of current cards there are
    const amountCurrentCard = cards.find((c) => c.id === id)?.amount

    // for each winning game, one new card copy is gained
    const amountWonCards = row[2].filter(
      (num) => row[1].indexOf(num) !== -1
    )?.length

    // play as many times as needed
    for (let i = 1; i <= amountWonCards; i++) {
      cardToAdd = cards.find((c) => c.id === id + i)
      if (cardToAdd) cardToAdd.amount += amountCurrentCard
    }
  })

  const totalCards = cards.reduce((a, b) => a + Number(b.amount), 0)

  // Part 2 ⭐️⭐️
  console.log(totalCards)
})
