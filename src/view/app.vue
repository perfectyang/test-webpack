<template>
  <div class="app">
    <div>在这里测试啊测试自动打包---没test</div>
    <button @click="e.g=2;">click</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      e: {
        g: 1
      }
    }
  },
  watch: {
    e: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        console.log(newValue, oldValue) 
      }
    }
  },
  methods: {
  }
}
</script>

<style lang='less' scoped>

</style>
