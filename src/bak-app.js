const {SyncHook} = require('tapable')

let queue = new SyncHook(['name', 'name2']); //所有的构造函数都接收一个可选的参数，这个参数是一个字符串的数组。

// 订阅
queue.tap('1', function (name, name2) {// tap 的第一个参数是用来标识订阅的函数的
    console.log(name, name2, 1);
    setTimeout(_ => {
      console.log(1)
    }, 1000)
    return false
});
queue.tap('2', function (name, name2) {
    console.log('name', name, name2)
    console.log(name, 2);
});
queue.tap('3', function (name) {
    console.log(name, 3);
});

// 发布
queue.call('webpack', 'webpack-cli', 'aaaa');// 发布的时候触发订阅的函数 同时传入参数
