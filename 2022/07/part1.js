const fs = require('fs')

fs.readFile('./data.txt', 'utf-8', (error, data) => {
  if (error) {
    console.log(error)
    return
  }

  const directories = {}

  let stack = []

  // construct directory structure
  data.split(/\n/).map((c) => {
    console.log(c)
    if (c.includes('cd /')) {
      stack = []
      stack.push('root')
      if (!directories['root']) {
        directories['root'] = {}
      }

      return
    }

    if (c.includes('cd ..')) {
      stack.pop()
      return
    }

    if (c.includes('cd')) {
      const currentDir = c.replace('$ cd ', '')

      let keypath = 'directories.' + stack.join('.')

      const parent = eval(keypath)
      if (!parent[currentDir]) {
        parent[currentDir] = {}
      }

      stack.push(currentDir)
      return
    }
  })

  console.log(directories)
})
