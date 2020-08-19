<template>
  <div class="app">
    <div>在这里测试啊测试自动打包---没test</div>
    {{list}}
    <div>
      <button @click="add">添加</button>
      <button @click="modify">修改</button>
    </div>
  </div>
</template>

<script>
const sub = {
  name: 'sub'
}
const testObj = {
  name: 'prent',
  id: '',
  sub
}

const f = (target, id) => {
  return () => {
      target[id] = Math.random() * 100 + 1
      return JSON.parse(JSON.stringify(target))
      // return target
  }
}

const factoryObj = f({
  name: 'prent',
  id: '',
  sub
}, 'id')


export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    add () {
      this.list.push(factoryObj())
    },
    modify () {
      const lastItem = this.list[this.list.length - 1]
      lastItem.id = '99999'
      lastItem.sub.name = '更改'
    },
  }
}
</script>

<style lang='less' scoped>

</style>
