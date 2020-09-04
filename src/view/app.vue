<template>
  <div class="app">
    aaa
    <!-- <video width="100%" v-if="show" ref="video" class="hero-video-actual" :autoplay="autoplay" loop webkit-playsinline playsinline>
      <source src="http://test_static.qdtech.ai/upload/question/decision/cv/ql/cvqllhic6v21ea3ccf98e68a87ac0f2967e63d2a401.mp4" type="video/mp4">
    </video> -->
  </div>
</template>

<script>
import {Howl, Howler} from 'howler'
export default {
  data () {
    return {
      list: [],
      autoplay: false,
      show: false
    }
  },
  methods: {
  },
  mounted () {
    var sound = new Howl({
      src: ['http://dev_static.qdtech.ai/upload/decision/81/wf/81wfq5x92uf342f051db6f0a888f63a777903779a60.mp3']
    })
    sound.play()
    Howler.volume(1
    )
  }
}
</script>

<style lang='less' scoped>

</style>
