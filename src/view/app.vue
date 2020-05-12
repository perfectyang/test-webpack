<template>
  <div class="app">
    <img :src="bdLogo" />
    <div>在这里测试啊测试自动打包---没test</div>
  </div>
</template>

<script>
import isEqual from 'lodash/isEqual'
import bdLogo from './bd_logo1.png'
export default {
  data () {
    return {
      bdLogo
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

<style lang='less' scoped>

</style>
