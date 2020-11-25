<template>
  <div class="app">
    <!-- 我去掉注释 -->
    <!-- <p v-for="(item, idx) in mergeData" :key="idx">{{item.name}}</p> -->
    <button @click="setItem">set</button>
    <button @click="getItem">get</button>
  </div>
</template>

<script>
import dataJson from './compare.json'
import localforage from 'localforage'
export default {
  name: 'app',
  data () {
    return {
      primary: dataJson.primary,
      scondary: dataJson.scondary,
      mergeData: {},
      count: 1
    }
  },
  created () {
    this.mergeData = this.transformSort(this.primary, this.scondary)
  },
  methods: {
    transformSort (primary, scondary) {
      console.log(primary, scondary)
      return primary.concat(scondary)
    },
    setItem () {
      this.count++
      localforage.setItem('id' + this.count, {name: 'xxx' + this.count}).then(rs => {
        console.log('往下走')
        localforage.getItem('id' + this.count).then(rs => {
          console.log(rs)
        })
      })
    },
    async getItem () {
      const value = await localforage.getItem('id' + this.count)
      console.log('valu', value)
    }
  }
}
</script>

<style lang='less' scoped>

</style>
