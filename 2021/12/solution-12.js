const graph = {
  start: ['A', 'b'],
  A: ['start', 'b', 'c', 'end'],
  b: ['start', 'd', 'end', 'A'],
  c: ['A'],
  d: ['b'],
  end: ['A', 'b'],
}

// TODO make this dynamic
const visited = {
  start: [[0, 0]],
  A: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
  b: [[0, 0, 0, 0]],
  c: [[0]],
  d: [[0]],
  end: [[0, 0]],
}

const allPaths = []

const isSmall = (vertice) => {
  if (!vertice) return false
  if (vertice.match(/[a-z]+/)) return true
  return false
}

const getListIndex = (node, stack) => {
  const matches = stack.filter(n => n === node)
  if (matches.length < 1) return 0
  return matches.length - 1
}

const findAdjacents = (node) => {
  return graph[node]
}

let done = false

const findAllPaths = (node, end, removedLast = undefined, stack = undefined) => {
  
  if (!stack) stack = [node]
  const listIndex = getListIndex(node, stack)

  const adj = findAdjacents(node)

  // TODO make this universal (loop through adjacents instead of referencing directly)
  if (stack.length === 1 && visited[node][listIndex][0] && visited[node][listIndex][1]) {
    done = true
    return
  }

  if (node === end) {
    allPaths.push([...stack])
    visited[node][listIndex] = new Array(adj.length).fill(0)
    removedLast = stack.pop()
    if (stack.length > 0) findAllPaths(stack[stack.length - 1], end, removedLast, stack)
  }

  for (i = 0; i <= adj.length; i++) {
    if (done) return
    const curr = adj[i]

    if (!curr) {
      // if there are no adjacent items left, remove node from stack
      visited[node][listIndex] = new Array(adj.length).fill(0)
      removedLast = stack.pop()
    } else {
      // skip if item has been traversed in current path already
      if (isSmall(curr) && visited[node][listIndex][i]) continue
      
      // mark item visited
      visited[node][listIndex][i] = 1

      // skip if item is the last removed one 
      if (curr === removedLast) continue

      // skip if item is in stack already
      if (isSmall(curr) && stack.indexOf(curr) !== -1) continue

      // if (i < adj.length) {
        stack.push(curr)
        removedLast = undefined
      // } 
    }

    if (stack.length > 0 && allPaths.length < 18) findAllPaths(stack[stack.length - 1], end, removedLast, stack)
  }
}

findAllPaths('start', 'end')
console.log(allPaths, allPaths.length)
