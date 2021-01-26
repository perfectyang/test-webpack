const _ = require('lodash')
var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 2, name: [{
  age: 111
}] }];
const ret = _.differenceWith(objects, [{ 'x': 1, 'y': 2 }, {'x':2, 'y':2, name: [
  {
    age: 222
  }
]}], _.isEqual)
console.log('ret', JSON.stringify(ret, 2))