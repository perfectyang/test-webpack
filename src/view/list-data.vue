<template>
  <div class="layout" ref="visibleWrap">
    <div class="layout__main" id="interviewContent" @scroll="handleScroll">
      <div class="section" v-for="item in renderList" :key="item.idx" :id="item.idx">{{item.value}}</div>
    </div>
  </div>
</template>

<script>
const arr = []
let renderList = []
for (let i = 1; i < 20; i++) {
  arr.push({
    idx: i,
    value: i
  })
}
import {splitPage} from './util'
export default {
  data () {
    return {
      longList: arr,
      page: 0,
      renderList: [],
      count: 1,
      timer: null
    }
  },
  created () {
    this.renderList = this.longList.slice(-10)
    // this.socketAdd()
  },
  mounted () {
    this.goBottom()
  },
  computed: {
    visibleHeight () {
      const visibleWrap = this.$refs.visibleWrap
      const contentHeight = Math.ceil(Number.parseFloat(window.getComputedStyle(visibleWrap).height))
      return contentHeight
    }
  },
  methods: {
    socketAdd () {
      this.timer = setInterval(_ => {
        if (this.count > 15) {
          clearInterval(this.timer)
          return
        }
        this.count++
        const data = {
          idx: this.longList.length + 1,
          value: this.longList.length + 1
        }
        this.renderList.push(data)
        this.longList.push(data)
        if (this.renderList.length > 10) {
          this.renderList.shift()
        }
        this.$nextTick(_ => {
          this.goBottom()
        })
      }, 2000)
    },
    target (idx) {
      const target = idx - 5
      this.renderList = this.longList.slice(target, target + 10)
    },
    goBottom () {
      const dom = document.getElementById('interviewContent')
      dom.scrollTop = dom.scrollHeight + this.visibleHeight
    },
    nextPage () {
      const len = this.renderList.length
      const lastItem = this.renderList[len - 1]
      const realLastItem = this.longList[this.longList.length - 1]
      if (lastItem.idx === realLastItem.idx || len === this.longList.length) return
      this.renderList = this.longList.slice(0, len + 10)
    },
    prePage (e, scrollHeigh) {
      const firstItem = this.renderList[0]
      const realFirstItem = this.longList[0]
      if (firstItem.idx === realFirstItem.idx || this.renderList.length === this.longList.length) return
      const len = this.renderList.length + 10
      this.renderList = this.longList.slice(-len)
      this.$nextTick(() => {
        e.target.scrollTop = e.target.scrollHeight - scrollHeight
      })
    },
    handleScroll (e) {
      const scrollHeight = e.target.scrollHeight
      const scrollTop = e.target.scrollTop
      const contentHeight = this.visibleHeight
      if (scrollTop <= 200) {
        this.prePage()
      }
      const finalH = (scrollHeight - scrollTop) - contentHeight
      if (finalH > 400) {
        console.log('没到底')
      } else {
        this.nextPage()
        console.log('到底')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.layout {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 50px;
  top: 50px;
  background: red;
  &__main {
    height: 100%;
    overflow: auto;
  }
  .section {
    height: 200px;
    margin: 10px;
    background: pink;
  }
}
html {
  height: 100%;
  margin: 0;
  padding: 0;
}

</style>
