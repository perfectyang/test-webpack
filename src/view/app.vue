<i18n>
  
</i18n>
<template>
  <div class="app">

    <i18n path="中果要" tag="p">
      <span >{{ changeLimit }}</span>
      <a :href="changeUrl">{{ $t('change') }}</a>
    </i18n>
    aaaa-----
    <!-- <div :id="type | filterType">在这里测试啊测试自动打包---没test</div> -->
    <bridge-slot :objInfo="whichComp(type)" :computeReactive="computeWhich()" v-slot:default="slotProps">
     <div>
       {{slotProps.cur.objInfo.name}}<br>
       {{slotProps.cur.objInfo.age}}<br>

       {{slotProps.cur.computeReactive.run}}<br>

       {{curInfo.name}}<br>

     </div>
    </bridge-slot> 
    <bridge-slot :objInfo="whichComp(type)" :computeReactive="computeWhich()" v-slot:default="slotProps">
     <div>
       {{slotProps.cur.objInfo.name}}<br>
       {{slotProps.cur.objInfo.age}}<br>

       {{slotProps.cur.computeReactive.run}}<br>

       {{curInfo.name}}<br>

     </div>
    </bridge-slot> 
    <!-- <div>{{whichComp(type).name}}</div>
    <div>{{whichComp(type).age}}</div> -->
    <button @click="selectType">click</button>
    <div id="testBlock"></div>
    <div id="testBlock1">1111</div>
  </div>
</template>

<script>
import bridgeSlot from './bridge-slot.vue'
import Vue from 'vue'
let vm = null
export default {
  components: {
    bridgeSlot
  },
  data (vm) {
    vm = vm
    return {
      changeUrl: '/change',
      refundUrl: '/refund',
      changeLimit: 15,
      refundLimit: 30,
      type: 1,
      curInfo: {
        name: 'from parent'
      }
    }
  },
  filters: {
    filterType (val) {
      console.log('aaa')
      return val + 'good'
    }
  },
  methods: {
    computeWhich () {
      return {
        run: 'run'
      }
    },
    selectType () {
      this.type = 2
    },
    whichComp (type) {
      console.log('初')
      const obj = {
        1: {name: 'aa', age: 111},
        2: {name: 'aa2222', age: 222222}
      }
      return obj[type]
    }
  },
  mounted () {
    console.log('this', this)
    const SubVue = Vue.extend({
      template: '<div>在这果要要222b</div>',
      data () {
        return {
          name: '在这里'
        }
      }
    })
    const sub = new SubVue({
      // template: '<div>在这果要要</div>',
      data () {
        return {
          // name: '真的',
          age: 111
        }
      }
    })
    console.log('sub', sub, SubVue.options)
    sub.$mount('#testBlock')
    console.log('aaaa---', this.$mount('#testBlock1'))
  }
}

console.log('vm', vm)
</script>

<style lang='less' scoped>

</style>
