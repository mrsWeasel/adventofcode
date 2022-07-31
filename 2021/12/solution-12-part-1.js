'use strict'

// TODO: form graphs from data (instead of hardcoding)

// TEST 1
// const graph = {
//   start: ['A', 'b'],
//   A: ['start', 'b', 'c', 'end'],
//   b: ['start', 'd', 'end', 'A'],
//   c: ['A'],
//   d: ['b'],
//   end: ['A', 'b'],
// }

// TEST 2
// const graph = {
//   start: ['HN', 'dc', 'kj'],
//   dc: ['end', 'start', 'HN', 'kj', 'LN'],
//   HN: ['start', 'dc', 'kj', 'end'],
//   kj: ['start', 'sa', 'HN', 'dc'],
//   LN: ['dc'],
//   end: ['dc', 'HN'],
//   sa: ['kj'],
// }

// TEST 3
// const graph = {
//   fs: ['end', 'he', 'DX', 'pj'], 
//   end: ['fs', 'zg'],
//   he: ['DX', 'fs', 'pj', 'RW', 'WI', 'zg'],
//   DX: ['he', 'start', 'pj', 'fs'],
//   start: ['DX', 'pj', 'RW'],
//   pj: ['DX', 'zg', 'he', 'RW', 'start', 'fs'],
//   zg: ['end', 'sl', 'pj', 'RW', 'he'],
//   sl: ['zg'],
//   RW: ['he', 'pj', 'zg', 'start'],
//   WI: ['he'],
// }

// THE REAL DATA
const graph = {
  um: ['end', 'pk', 'FE', 'EZ'],
  end: ['um', 'jt', 'il'],
  FE: ['ay', 'il', 'um', 'pk', 'jt'],
  il: ['FE', 'RO', 'end', 'ay'],
  pk: ['um', 'start', 'FE', 'xc', 'ay', 'EZ'],
  start: ['pk', 'EZ', 'xc'],
  jt: ['end', 'FE', 'EZ', 'om'],
  RO: ['il'],
  xc: ['ay', 'start', 'pk', 'EZ'],
  ay: ['FE', 'xc', 'pk', 'il'],
  EZ: ['start', 'um', 'xc', 'jt', 'pk'],
  om: ['jt'],
}

// clone graph to new object to track traversing process
const visited = { ...graph }
Object.keys(visited).forEach(key => {
  visited[key] = []
})

const allPaths = []

const isSmall = (vertice) => {
  if (!vertice) return false
  if (vertice[0].match(/[a-z]+/)) return true
  return false
}

const getListIndex = (node, stack) => {
  const matches = stack.filter(n => n === node)
  if (matches.length < 1) return 0
  return matches.length - 1
}

const findAllPaths = (node, end, stack = undefined) => {
  
  if (!stack) stack = [node]
  const listIndex = getListIndex(node, stack)

  const adj = graph[node]

  if (visited[node].length <= listIndex) {
    const arr = new Array(adj.length).fill(0)
    visited[node].push(arr)
  }

  if (node === end) {
    allPaths.push([...stack])
    stack.pop()
    if (stack.length > 0) {
      return findAllPaths(stack[stack.length - 1], end, stack)
    }  
    return
  }

  for (let i = 0; i <= adj.length; i++) {

    if (!adj[i]) {
      // if there are no adjacent items left, remove node from stack
      visited[node][listIndex] = new Array(adj.length).fill(0)
      stack.pop()
    } else {
      // skip if item has been traversed in current path already
      if (visited[node][listIndex][i]) continue
      
      // mark item visited
      visited[node][listIndex][i] = 1

      // skip if (small) item is in stack already
      if (stack.indexOf(adj[i]) !== -1 && isSmall(adj[i])) continue
    
      stack.push(adj[i])
  
    }

    if (stack.length > 0) {
     return findAllPaths(stack[stack.length - 1], end, stack)
    }  

    return
  }
}

findAllPaths('start', 'end')
console.log(allPaths.length)

// Turns out that Node.js (and V8 in general) does not support Tail Call Optimization. 🙈
// So maximum call stack size will be exceeded with the actual data set. 
// However, TCO is specified in ES6 and this code will run as such on Safari. 
