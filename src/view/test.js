// var func = function (params) {
//   let result = [];
//   let arr = params.split('');
//   arr.forEach(element => {
//       console.log('el', element)
//       if(element === '#') {
//         result.pop();
//         return;
//       }
//       result.push(element);
//   });
//   return result.toString();
// }
// console.log(func("ab###c"))

function findDuplicates (num) {
  const result = []
  for (let i = 0; i < num.length; i++) {
    const index = Math.abs(num[i]) - 1
    if (num[index] < 0) {
      result.push(Math.abs(num[i]))
    }
    num[index] = -num[index]
    console.log(num[index])
  }
  return result
}

const arr = [1, 1, 4,3,2,7,8,2,3]

console.log('find', findDuplicates(arr), arr)

