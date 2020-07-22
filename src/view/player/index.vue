<template>
  <div class="">
    <div id="player"></div>
    <button @click="start">start</button>
    <button @click="stop">stop</button>
    <button @click="reStart">reStart</button>
  </div>
</template>

<script>
import {SrsPlayer} from './srs.player.js'
export default {
  data () {
    return {
      player: null
    }
  },
  mounted () {
    setTimeout(_ => {
      const instance = this.player = new SrsPlayer('player', 640, 480)
      instance.on_player_ready = function (){
        instance.set_bt(0.8)
        instance.set_mbt(1.2)
        instance.play("rtmp://srs.qdtech.ai/live/yangguowei")
      }
      instance.on_player_metadata = function (){
        // instance.set_dar(4, 3)
        console.log(instance.dump_log())
      }
      console.log(instance)
      instance.start()
    })
    
  },
  methods: {
    start () {
      console.log(this.player)
      this.player.start()
    },
    stop () {
      this.player.pause()
    },
    reStart () {
      this.player.resume()
    }
  }
}
</script>

<style lang='less' scoped>

</style>
