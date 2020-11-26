<template>
<div>
  <button @click="goTarget">target</button>
  <list-data ref="listData" />
</div>
</template>

<script>
import listData from './list-data'
export default {
  components: {
    listData
  },
  data () {
    return {
    }
  },
  methods: {
    goTarget () {
      this.$refs.listData.target(8)
    }
  }
}
</script>

<style lang='less' scoped>

</style>
