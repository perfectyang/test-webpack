<template>
  <div class="layout" ref="visibleWrap">
    <div class="layout__main" id="J_listWrap" @scroll="handleScroll">
      <div class="section J_section" v-for="item in renderList" :key="item.id" :id="item.id">{{item.value}}</div>
    </div>
  </div>
</template>

<script>
const arr = []
let renderList = []
for (let i = 1; i < 100; i++) {
  arr.push({
    id: i,
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
      timer: null,
      estimatedItemSize: 200
    }
  },
  mounted () {
    // this.goBottom()
    this.start = 0
    this.end = this.start + this.visibleCount * 3
    console.log('----', this.start, this.end)
    this.renderList = this.longList.slice(this.start, this.end)
  },
  computed: {
    visibleHeight () {
      const visibleWrap = this.$refs.visibleWrap
      console.log('visibleWrap', visibleWrap)
      const contentHeight = Math.ceil(Number.parseFloat(window.getComputedStyle(visibleWrap).height))
      return contentHeight
    },
    visibleCount () {
      return Math.ceil((this.visibleHeight ) / this.estimatedItemSize)
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
      const dom = document.getElementById('J_listWrap')
      dom.scrollTop = dom.scrollHeight + this.visibleHeight
    },
    nextPage () {
      let nodes = document.getElementsByClassName('J_section')
      if (+nodes[nodes.length - 1].id !== +this.longList[this.longList.length - 1].id) {
        let preId = nodes[nodes.length - 1].id
        let mid = Math.floor(nodes.length / 2)
        this.start = +nodes[mid].id
        this.end = this.start + this.visibleCount * 3
        this.renderList = this.longList.slice(this.start, this.end)
        this.$nextTick(() => {
          document.getElementById(preId).scrollIntoView({ block: 'center'})
        })
      }
    },
    prePage (e, scrollHeigh) {
      let nodes = document.getElementsByClassName('J_section')
      if (+nodes[0].id !== +this.longList[0].id) {
        let preId = nodes[0].id
        let mid = Math.ceil(nodes.length / 2)
        this.end = +nodes[mid].id
        this.start = this.end - this.visibleCount * 3 >= 0 ? this.end - this.visibleCount * 3 : 0
        this.renderList = this.longList.slice(this.start, this.end)
        this.$nextTick(() => {
          document.getElementById(preId).scrollIntoView({ block: 'center' })
        })
      }
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
