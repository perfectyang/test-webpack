// import isObject from 'lodash/isObject'
// // import set from 'lodash/isObject'

// function getTextsAndMap (data, prefix = '') {
//   let texts = []
//   let map = []

//   for (const [ key, value ] of Object.entries(data)) {
//     const name = prefix ? prefix + '.' + key : key
//     if (isObject(value)) {
//       const { texts: sTexts, map: sMap } = getTextsAndMap(value, name)
//       texts = texts.concat(sTexts)
//       map = map.concat(sMap)
//     } else {
//       texts.push(value)
//       map.push(name)
//     }
//   }
//   return { texts, map }
// }

// var data = [
//   {
//     question_name: '在这要要',
//     option_list: [
//       {
//         option_value: '达要要要要'
//       }
//     ],
//     get_id: 'aaa',
//     extra_logic: {
//       name: 'aaa',
//       list_name: [
//         {
//           group_name: '在这要',
//           list: [
//             {
//               name: 'aaaa'
//             },
//             {
//               name: 'aaaa',
//               options: [
//                 {
//                   txt: '在这要要',
//                   link: {
//                     obj: '达薮薮薮薮工'
//                   }
//                 }
//               ]
//             }
//           ],
//           list2: [
//             {
//               age: 'aaaa'
//             },
//             {
//               test: 'aaaa'
//             }
//           ]
//         }
//       ]
//     }
//   }
// ]



// const {texts, map} = getTextsAndMap(data)

// console.log('直实节点', texts, map)
// function recoveryByMap (src, dist, paths) {
//   paths.forEach((value, key) => {
//     console.log('原数据', src)
//     console.log('路径', value)
//     console.log('翻译后', dist)
//     console.log('dist[key]', dist[key])
//   })
//   return src
// }
// recoveryByMap(data, texts, map)
import _ from 'lodash'
// const ar = _.differenceBy([{ id: 2 }, { id: 3333 }, { id: 223 }, { id: 3333 }], [{ id: 3333 }], 'id');
// console.log('aaa', ar)

var object = { 'a': [{ 'b': { 'c': 3 } }] };
const tem = _.set(object, 'a.0.b.c', 1000);
console.log(tem === object)
// console.log(object.a[0].b.c);
// => 4
console.log(object)