const fs = require('fs')

fs.readFile('./data.txt', 'utf-8', (error, data) => {
  if (error) {
    console.log(error)
    return
  }

  const directories = {}

  let stack = ['directories']

  // construct directory structure
  data.split(/\n/).map((c) => {
    if (c.includes('cd /')) {
      stack = ['directories']
      stack.push('root')
      if (!directories['root']) {
        directories['root'] = { size: 0 }
      }
      return
    }

    if (c.includes('$ cd ..')) {
      stack.pop()
      return
    }

    if (c.includes('$ cd')) {
      const currentDir = c.replace('$ cd ', '')

      let keypath = stack.join('.')

      const parent = eval(keypath)
      if (!parent[currentDir]) {
        parent[currentDir] = { size: 0 }
      }

      stack.push(currentDir)
      return
    }

    if (c.includes('$ ls')) {
      return
    }

    if (c.includes('dir ')) {
      return
    }

    // rest of the log is just file sizes
    const size = c.split(' ')[0]

    let keypath = stack.join('.')

    const dir = eval(keypath)
    dir.size += Number(size)

    const stackCopy = [...stack]

    while (stackCopy.length > 2) {
      stackCopy.pop()
      let keypath = stackCopy.join('.')
      const dir = eval(keypath)
      dir.size += Number(size)
    }
  })

  // count sizes
  let sums = []

  const sumFn = (obj) => {
    for (key in obj) {
      if (key === 'size') {
        sums.push(obj[key])
        continue
      }
      if (Object.keys(obj).length < 1) {
        continue
      }
      sumFn(obj[key])
    }
  }

  sumFn(directories)
  

  // size of the whole directory system
  const totalSize = sums[0]

  const remove = 30000000 - (70000000 - totalSize)

  const sortedSums = sums.sort((a, b) => a - b)
    if (remove > 0) {
      for (let i = 0; i < sortedSums.length; i++) {
        if (sortedSums[i] >= remove) {
          // ⭐️⭐️ part 2
          console.log(sortedSums[i])
          break
        }
      }
    } else {
      console.log(0)
    }
    
})
