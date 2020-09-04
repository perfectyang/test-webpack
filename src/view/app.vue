<template>
  <div class="app">
    {{primaryData}}
  ------------------------------
    <!-- {{scondaryData}} -->
  </div>
</template>

<script>
import dataOne from '../data-merge/test.json'
import dataTwo from '../data-merge/test2.json'
export default {
  data () {
    return {
      primaryData: JSON.parse(JSON.stringify(dataOne.data.pages[0].questions)),
      scondaryData: JSON.parse(JSON.stringify(dataTwo.data.pages[0].questions))
    }
  },
  created () {
    this.matchQs()
  },
  methods: {
    matchQs () {
      this.recurse(this.primaryData, this.goToMatch)
    },
    loopQs (data, target) {
      let idx = 0
      const len = data.length
      while (idx < len) {
        const atgs = data[idx]
        if (atgs.question_name === target.question_name && !atgs.match) {
          this.markTAgs(target, atgs)
          break
        }
        idx++
      }
    },
    goToMatch (qs) {
      console.log('主项目', qs.question_name, qs.define_label_name)
      const secondQs = this.seeAllData(this.scondaryData, qs)
      // 所有相同的题型
      const sameQsType = secondQs.filter(cur => cur.question_type === qs.question_type)
      if (qs.define_label_name) { // 有标签的
        const allQsTags = sameQsType.filter(cur => cur.define_label_name === qs.define_label_name)
        if (allQsTags.length === 1 && !allQsTags[0].match) {
          // 只有一个标签，就默认匹配上了
          this.markTAgs(qs, allQsTags[0])
        } else if (allQsTags.length > 1) {
          // 有两个标签及以上的,就去匹配第一个遇到题目相同的
          this.loopQs(allQsTags, qs)
        }
      } else { // 没有标签,就去匹配第一个遇到题目相同的
        this.loopQs(sameQsType, qs)
      }
    },
    markTAgs (targetQs, tem) {
      this.$set(tem, 'match', JSON.stringify(targetQs))
      this.$set(targetQs, 'match', JSON.stringify(tem))
    },
    seeAllData (data, targetQs) {
      const len = data.length
      let i = 0
      const pickAllData = []
      while (i < len) {
        const qs = data[i]
        const type = +qs.question_type
        switch (type) {
          case 6:
          case 14:
            qs.extra_logic.forEach(exLogicQs => {
              const tem = exLogicQs.question
              pickAllData.push(tem)
            })
            break
          case 8:
            qs.random_combination.question_group.forEach(qg => {
              qg.group_list.forEach(glq => {
                const tem = glq.question
                pickAllData.push(tem)
              })
            })
            break
          default:
            pickAllData.push(qs)
            break
        }
        i++
      }
      console.log('总的次项目题目', pickAllData)
      return pickAllData
    },
    recurse (data, callback) {
       data.forEach(qs => {
        const type = +qs.question_type
        if ([6, 14].includes(type)) { // 矩阵和追问题
          qs.extra_logic.forEach(exLogicQs => {
            callback(exLogicQs.question)
          })
        } else if (type === 8) { // 组合题里面的
          qs.random_combination.question_group.forEach(qg => {
            qg.group_list.forEach(glq => {
              callback(glq.question)
            })
          })
        } else { // 正常的普通题
          callback(qs)
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>

</style>
