<template>
  <VirtualList
    :list-data="data"
    :estimated-item-size="100"
    :top-load-more="true"
    :top-method="update"
    v-slot="slotProps">
    <Item :item="slotProps.item" />
  </VirtualList>
</template>

<script>
import VirtualList from './cmp/VirtualList.vue'
import Item from './cmp/Item.vue'

import faker from 'faker'

function genrateData () {
  let data = [];
  for (let id = 0; id < 50; id++) {
    data.push({
      id,
      value: faker.lorem.sentences() // 长文本
    })
  }
  return data
}

export default {
  name: 'app',
  data(){
    return {
      data: genrateData()
    }
  },
  components: {
    VirtualList,
    Item
  },
  methods: {
    update () {
      this.data.push(...genrateData())
      this.$refs.vlist.onBottomLoaded()
    }
  }
}
</script>

<style lang="less">
html{
  height: 100%;
}
body{
  height: 100%;
  margin:0;
}
#app{
  height:100%;
}

</style>
