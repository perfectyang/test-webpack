<template>
  <div class="app">
    在这里
    {{mergeData}}
  </div>
</template>

<script>
import firstData from '../mock-data/page-1.json'
import secondData from '../mock-data/page-2.json'
export default {
  name: 'app',
  data () {
    return {
      firstData,
      secondData,
      temData: []
    }
  },
  computed: {
    mergeData () {
      return this.mergeDataFn(this.firstData, this.secondData)
    }
  },
  methods: {
    mergeDataFn (first, second) {
      console.log(first, second)
      this.temData = []
      this.filterEachQs(second, (qs) => {
        if (qs) {
          this.temData.push(qs)
        }
      })
      console.log('没有匹配的', this.temData)
      return first.concat(this.temData)
    },
    filterEachQs (data, callback) {
      data.forEach(qs => {
        this.handleLgoic(qs, callback)
      })
    },
    handleLgoic (qs, callback) {
      const type = +qs.question_type
      if ([6, 14].includes(type)) { // 矩阵和追问题
        qs.extra_logic = qs.extra_logic.filter(exlogic => !exlogic.question.match)
        if (qs.extra_logic.length) {
          callback(qs)
        } else {
          callback('')
        }
      } else if (type === 8) { // 组合题里面的
        qs.random_combination.question_group = qs.random_combination.question_group.filter(qg => {
          qg.group_list = qg.group_list.filter(glq => !glq.question.match)
          return qg.group_list.length > 0
        })
        if (qs.random_combination.question_group.length > 0) {
          callback(qs)
        } else {
          callback('')
        }
      } else { // 正常的普通题
        if (!qs.match) {
          callback(qs)
        } else {
          callback('')
        }
      }
    }
  }
}
</script>

<style lang='less' scoped>

</style>
