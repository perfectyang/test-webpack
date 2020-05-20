<template>
  <div class="app">
    <div style="height: 100px">
      <h1>{{count}}</h1>
      <h1>{{renderTxt}}</h1>
    </div>
    <button @click="renderFn">render</button>
  </div>
</template>

<script>
import throttle from 'lodash/throttle'
let localCount = 0
let localTxt = ''
const queue = []
export default {
  data () {
    return {
      count: 0,
      queue: [],
      in: 0,
      type: 2,
      renderTxt: ''
    }
  },
  created () {
    this.onRender()
    setInterval(_ => {
      if (this.timeUp) {
        queue = []
      }
      if (queue.length) {
        const effect = queue[0]
        const curTimeLeft = parseInt(((new Date().getTime()) - effect.time) / 1000)
        if (curTimeLeft > effect.renderTime) {
          console.log('当前时间差', curTimeLeft)
          console.log('当需要渲染时间', effect.renderTime)
          effect.fn()
          queue.shift()
        }
        console.log('还剩多少', queue)
      }
    })
  },
  methods: {
    nowTime () {
      return (new Date().getTime())
    },
    renderFn () {
      localCount += 1
      if (this.type === 1) {
        this.type = 2
      } else {
        this.type = 1
      }
      this.eventEmitter.emit('testfn', this.type, localCount)
    },
    onRender () {
      this.eventEmitter.on('testfn', (type, localCount) => {
        this.in += 1
        queue.push({
          time: this.nowTime(),
          renderTime: type === 1 ? 4 : 1,
          fn: () => {
            this.count = localCount
            const txt = `渲染${type === 1 ? '单选题' : '开放题'}`
            console.log(txt)
            this.renderTxt = txt
            console.log('---------end-----')
          }
        })
      })
    }
  }
}
</script>
