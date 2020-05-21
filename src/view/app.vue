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
      grapTime: 0
    }
  },
  created () {
    this.onRender()
    setInterval(_ => {
      if (this.timeTick <= 0) {
        this.grapTime = 0
        queue = []
      }
      if (queue.length) {
        const effect = queue[0]
        const curTimeLeft = parseInt(((new Date().getTime()) - effect.time) / 1000)
        let targetTime = effect.renderTime + this.grapTime
        // if (effect.question_type === 3) {
        //   targetTime = effect.renderTime + this.grapTime
        // }
        console.log('时间间隔', this.grapTime, )
        console.log('当前时间差', curTimeLeft)
        console.log('当需要渲染时间', effect.renderTime)
        if (curTimeLeft >= targetTime) {
          effect.fn()
          console.log('this.grapTime', this.grapTime)
          // if (effect.question_type === 3) {
          //   this.grapTime += effect.renderTime
          // }
          this.grapTime += effect.renderTime
          queue.shift()
        }
        console.log('还剩多少', queue)
      }
    })
  },
  methods: {
    start () {
      const timer = setInterval(_ => {
        if (this.timeTick <= 0) {
          clearInterval(timer)
        }
        this.timeTick -= 1
      }, 1000)
    },
    nowTime () {
      return (new Date().getTime())
    },
    renderFn () {
      localCount += 1
      if (this.type === 1) {
        this.type = 3
      } else {
        this.type = 1
      }
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
        const renderTime = type === 1 ? 0 : 1
        queue.push({
          time: this.nowTime(),
          question_type: type,
          renderTime,
          fn: createWaitTrigger(type, localCount)
        })
      })
    }
  }
}
</script>
