<template>
  <div class="js-babel">
    <button @click="handle">compiler</button>
    <textarea v-model="code"></textarea>
    <div>{{jsCode}}</div>
  </div>
</template>

<script>
// import {transformCode} from './es5.js'
export default {
  data () {
    return {
      code: '',
      jsCode: ''
    }
  },
  methods: {
    transformCode () {},
    handle () {
      this.jsCode = this.transformCode(this.code)
    }
  }
}
</script>

<style lang='less' scoped>

</style>
