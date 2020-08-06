
// function recurse(stack, arr = []) {
//   if (!stack.length) {
//     return
//   }
//   const node = stack.pop()
//   arr.push(node)
//   return recurse(stack, arr)
// }

// let arr = [1, 2, 3, 4]
// const newArr = []

// recurse(arr, newArr)
// console.log(newArr)
const node = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: {
        val: 4,
        next: null
      }
    }
  }
}

function reverseLink (node) {
  if (node.next === null || node === null) {
    return node
  }
  const cur = reverseLink(node.next)
  node.next.next = node
  node.next = null
  return cur
}

const cur = reverseLink(node)
console.log(JSON.stringify(cur))




