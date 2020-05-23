<template>
  <div class="app">
    <h2>时间:{{timeTick}}</h2>
    <div style="height: 100px">
      <h1>{{count}}</h1>
      <h1>{{renderTxt}}</h1>
    </div>
    <button @click="renderFn">render</button>
    <button @click="start">start</button>
  </div>
</template>

<script>
import throttle from 'lodash/throttle'
let localCount = 0
let localTxt = ''
// let timeTick = 0
let queue = []
export default {
  data () {
    return {
      count: 0,
      queue: [],
      in: 0,
      type: 1,
      renderTxt: '',
      timeTick: 20,
      grapTime: 0,
      startFlag: true,
      queueTimer: null,
      setTimer: null,
      startQueue: true
    }
  },
  created () {
    this.onRender()
  },
  methods: {
    start () {
      // this.startRender()
      const timer = setInterval(_ => {
        if (this.timeTick <= 0) {
          clearInterval(timer)
          this.startQueue = true
        }
        this.timeTick -= 1
      }, 1000)
    },
    startRender () {
      console.log('初始化几次')
      this.queueTimer = setInterval(_ => {
        console.log('一直在跑')
        if (this.timeTick <= 0) {
          console.log('还剩余多少', queue)
          this.startFlag = true
          queue = []
          clearInterval(this.queueTimer)
        }
        if (this.startFlag) {
          this.startEffect()
          this.startFlag = false
          clearTimeout(this.setTimer)
          this.setTimer = setTimeout(_ => {
            this.startFlag = true
          }, this.renderTime)
        }
      })
    },
    startEffect () {
      if (queue.length) {
        const effect = queue[0]
        effect.fn()
        queue.shift()
      }
    },
    renderFn () {
      localCount += 1
      // if (this.type === 1) {
      //   this.type = 3
      // } else {
      //   this.type = 1
      // }
      this.eventEmitter.emit('testfn', this.type, localCount)
    },
    onRender () {
      const createWaitTrigger = (type, localCount) => {
        return () => {
          const txt = `渲染${type === 1 ? '单选题' : '开放题'}`
          console.log('txt', txt, 'localCount', localCount)
          this.count = localCount
          this.renderTxt = txt + localCount
          console.log('---------end-----')
        }
      }
      this.eventEmitter.on('testfn', (type, localCount) => {
        queue.push({
          question_type: type,
          fn: createWaitTrigger(type, localCount)
        })
        if (this.startQueue) {
          if (type === 1) {
            this.renderTime = 10
          } else {
            this.renderTime = 4000
          }
          this.startRender()
          this.startQueue = false
        }
      })
    }
  }
}
</script>
