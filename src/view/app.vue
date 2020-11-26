<template>
<div>
  <button @click="goTarget">target</button>
  <!-- <list-data ref="listData" /> -->
  <div style="height: 700px;">
  <VirtualList :list-data="data" :estimatedItemSize="200" v-slot="slotProps">
    <Item :item="slotProps.item" />
  </VirtualList>
  </div>
</div>
</template>

<script>
import listData from './list-data'
import VirtualList from './cmp/VirtualList'
import Item from './cmp/Item'
import faker from 'faker'
let data = [];
for (let id = 0; id < 1000; id++) {
  data.push({
    id,
    value: faker.lorem.sentences() // 长文本
  })
}
console.log('data ', data)
export default {
  components: {
    listData,
    VirtualList,
    Item
  },
  data () {
    return {
      data
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
