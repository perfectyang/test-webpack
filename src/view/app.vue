<template>
  <div class="app">
    <img src="./bg.jpg" />
    <div class="back">1111</div>
    <div>在这里测试啊测试自动打包---没test</div>
  </div>
</template>

<script>
import isEqual from 'lodash/isEqual'
export default {
  data () {
    return {
    }
  },
  created () {
    const obj = [{
      name: '111',
      list: [
        {
          value: '在这里'
        }
      ]
    }, {
      name: '111',
      list: [
        {
          value: '在这里'
        }
      ]
    }]
    const obj2 = [{
      name: '111',
      list: [
        {
          value: '在这里'
        }
      ]
    }, {
      name: '111',
      list: [
        {
          value: '在这里'
        }
      ]
    }]
    console.log(isEqual(obj, obj2))
  },
  methods: {
  }
}
</script>

<style lang='less'>
.back {
  background: url('./bd_logo1.png');
  width: 200px;
  height: 200px;
}
body {
  background: url('./4.jpg');
}
</style>
