import dataOne from '../mock-data/test.json'
import dataTwo from '../mock-data/test2.json'
import optionSource from '../mock-data/opt-source.json'
import trim from 'lodash/trim'
import { v1 } from 'uuid'
export default {
  data () {
    return {
      dataOne: dataOne,
      dataTwo: dataTwo,
      questions: optionSource.data.pages[0].questions,
      optionSource: optionSource.data.source_option,
      primaryTag: '',
      secondaryTag: ''
    }
  },
  created () {
    this.matchQs()
  },
  computed: {
    primaryData () {
      return this.dataOne.data.pages[0].questions.concat(...this.questions)
    },
    primaryOptionSource () {
      return this.dataOne.data.source_option.concat(...this.optionSource)
    },
    scondaryData () {
      return this.dataTwo.data.pages[0].questions.concat(...this.questions)
    },
    scondaryOptionSource () {
      return this.dataTwo.data.source_option.concat(...this.optionSource)
    }
  },
  methods: {
    matchQs () {
      this.initOptions(this.primaryData, this.primaryOptionSource)
      this.initOptions(this.scondaryData, this.scondaryOptionSource)
      this.findSameTags(this.primaryData, 'primaryTag')
      this.findSameTags(this.scondaryData, 'secondaryTag')
      this.forEachQs(this.primaryData, this.goToMatch)
    },
    findSameTags (data, name) {
      const markObj = {}
      const repeatTags = []
      this.forEachQs(data, (qs) => {
        if (qs.define_label_name) {
          if (markObj[qs.define_label_name]) {
            repeatTags.push(qs.define_label_name)
          } else {
            markObj[qs.define_label_name] = true
          }
        }
      })
      this[name] = repeatTags.join(',')
      console.log('有重复的吗', repeatTags)
    },
    initOptions (data, optionSource) {
      console.log('datatakkA', data)
      // 初始化主次项目的选项来源
      this.forEachQs(data, (qs) => {
        qs.question_identity = v1()
        // 重置选项
        qs.option_list.forEach(opt => {
          opt.option_identity = v1()
        })
        if (qs.source.isExist) { // 有选项来源
          const findOptList = optionSource.find(cur => cur.question_id === qs.question_id)
          if (findOptList) {
            qs.option_list.push(...findOptList.option_list)
          }
          qs.option_list.forEach(curOpt => {
            if (curOpt.source_list) {
              curOpt.source_list.forEach(sl => {
                this.forEachQs(data, (lookQs) => {
                  if (sl.question_id === lookQs.question_id) {
                    lookQs.option_list.forEach(lopt => {
                      if (lopt.option_id === sl.option_id) {
                        sl.option_identity = lopt.option_identity
                      }
                    })
                  }
                })
              })
            }
          })
          // 重置选项来源
          qs.source.isExist = false
        }
      })
    },
    setMatch (first, second) {
      // 标记题目已匹配的
      this.$set(second, 'match', JSON.stringify(first))
      this.$set(first, 'match', JSON.stringify(second))
    },
    // 标记题目
    markTagsQs (firstQs, secondQs) {
      if (firstQs.option_list && firstQs.option_list.length) {
        // 目标题目有选项
        this.loopOpts(firstQs, secondQs)
      }
      if (firstQs.question_type === 15) { // 选项分组题
        // 1. 非预设分组（主）可以和预设或非预设合并，customized_config选项配置不用调整
        // 2. 预设分组（主）不能和非预设分组（次）合并，但可以和同为预设分组的分组题合并，
        if (+firstQs.customized_config.option_group_type === 1
            || (+firstQs.customized_config.option_group_type === 2
                && +secondQs.customized_config.option_group_type === 2)) {
          // 标记题目已匹配的
          this.setMatch(firstQs, secondQs)
        }
      } else {
        // 标记题目已匹配的
        this.setMatch(firstQs, secondQs)
      }
    },
    markTagsOpt (firstOpt, secondOpt) {
      // 标记选项已匹配的
      this.setMatch(firstOpt, secondOpt)
    },
    loopQs (data, target) { // 遍历
      let idx = 0
      const len = data.length
      while (idx < len) {
        const atgs = data[idx]
        if (trim(String(atgs.question_name)) === trim(String(target.question_name)) && !target.match && !atgs.match) {
          this.markTagsQs(target, atgs)
          break
        }
        idx++
      }
    },
    loopOpts (targetQs, secondQs) {
      const targetOptList = targetQs.option_list
      const secondOptList = secondQs.option_list
      let idx = 0
      const len = targetOptList.length
      while (idx < len) {
        const tOpt = targetOptList[idx]
        const findOpt = secondOptList.find(cur => trim(String(cur.option_value)) === trim(String(tOpt.option_value)))
        if (findOpt && !findOpt.match && !tOpt.match) {
          this.markTagsOpt(tOpt, findOpt)
          break
        }
        idx++
      }
      // 次项目剩余的选项没有匹配上的, 则挂在主项目,跟option_list同级的
      const leftOpts = secondOptList.filter(cur => !cur.match)
      if (leftOpts.length) {
        this.$set(targetQs, 'secondQs_left_option_list', leftOpts)
      }
    },
    goToMatch (qs) {
      console.log('主项目', qs.question_name, qs.define_label_name)
      if (qs.question_type === 8) { // 组合题，就去匹配第一个题目, 特殊处理
        const combinationQs = this.scondaryData.filter(cur => cur.question_type === 8)
        this.loopQs(combinationQs, qs)
      }
      const secondQs = this.flattenAllQs(this.scondaryData)
      // 所有相同的题型
      const sameQsType = secondQs.filter(cur => cur.question_type === qs.question_type)
      if (qs.define_label_name) { // 有标签的
        const allQsTags = sameQsType.filter(cur => cur.define_label_name === qs.define_label_name)
        if (allQsTags.length === 1 && !allQsTags[0].match && !qs.match) {
          // 只有一个标签，就默认匹配上了
          this.markTagsQs(qs, allQsTags[0])
        } else if (allQsTags.length > 1) {
          // 有两个标签及以上的,就去匹配第一个遇到题目相同的
          this.loopQs(allQsTags, qs)
        }
      } else { // 没有标签,就去匹配第一个遇到题目相同的
        this.loopQs(sameQsType, qs)
      }
    },
    flattenAllQs (data) {
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
      return pickAllData
    },
    forEachQs (data, callback) { // 递归遍历所有的子题目
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