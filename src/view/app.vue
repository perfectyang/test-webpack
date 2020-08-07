<template>
  <div class="app" ref="app">
    <div class="box-wrap" ref="boxWrap"  @mousedown.stop="handleMouseDown"
                           @mousemove.stop="handleMouseMove">
      <div class="box">
        <img src="http://dev_static.qdtech.ai/upload/decision/dg/gd/dggdza6mmvj4f4b5160b10bb8355dbdea51f0125092.png" />
      </div>
      <div
        class="area"
        :style="{
          top: modal.top + 'px',
          left: modal.left + 'px',
          width: modal.width + 'px',
          height: modal.height + 'px'
        }"
        v-show="modal.visible">
        <span class="text" v-show="modal.num > -1">
          {{modal.num}}人
        </span>
      </div>
    </div>
  </div>
</template>

<script>
function CreateArea () {
  this.visible = false
  this.top = 0
  this.left= 0
  this.width= 0
  this.height= 0
  this.num= 0
  this.press= false
}
export default {
  data () {
    return {
      selectable: true,
      modal: {
        visible: false,
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        num: 0,
        press: false
      }
    }
  },
  mounted () {
    this.$refs.app.addEventListener('mouseup', () => {
      this.handleMouseUp ()
    })
  },
  methods: {
    handleClick (e) {
      console.log()
    },
    handleMouseDown (e) {
      if (!this.selectable) return

      const { clientX, clientY } = e
      console.log('e', e)
      const wH = this.$refs.boxWrap.getBoundingClientRect()
      console.log(wH)

      this.modal.visible = true
      this.modal.num = -1
      this.modal.top = clientY - wH.y
      this.modal.left = clientX - wH.x
      console.log(this.modal)
      this.modal.width = 0
      this.modal.height = 0
      this.modal.press = true
    },
    handleMouseMove (e) {
      if (!this.selectable || !this.modal.press) return

      console.log('move', e)
      let { clientX, clientY } = e

      // if (offsetX < this.modal.left) {
      //   this.modal.left = offsetX
      // }

      // if (offsetY < this.modal.top) {
      //   this.modal.top = offsetY
      // }
      const wH = this.$refs.boxWrap.getBoundingClientRect()
      console.log('wH', wH)

      this.modal.width = Math.abs(clientX - wH.x - this.modal.left)
      this.modal.height = Math.abs(clientY -  wH.y - this.modal.top)
    },
    handleMouseUp (e) {
      if (!this.selectable || !this.modal.press) return

      this.modal.press = false

      if (this.modal.width < 10 && this.modal.height < 10) {
        this.modal.visible = false
      }

      // this.modal.num = 2

      // const { width, height } = this.$refs.heatmapWrap.getBoundingClientRect()

      // let x = this.modal.left * this.imgWidth / width
      // let y = this.modal.top * this.imgHeight / height
      // let x1 = x + this.modal.width * this.imgWidth / width
      // let y1 = y + this.modal.height * this.imgHeight / height
      // let hotspots = this.distributionSpot.filter(spot => {
      //   return spot.x >= x
      //     && spot.y >= y
      //     && spot.x <= x1
      //     && spot.y <= y1
      // })
      // this.modal.num = uniqBy(hotspots, 'userId').length
    },
  }
}
</script>

<style lang='less' scoped>
.box {
  height: 1200px;
  width: 800px;
  margin: auto;
  border: 1px solid red;

  position: relative;
}
.box-wrap {
  position: relative;
  width: 800px;
  margin: 0 auto; 
}
 

  .area {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    font-weight: bold;
    border: 2px dotted #ff9e44;
    border-radius: 4px;
    background: rgba(255,158,68,0.6);
  }

  .area .text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #fff;
  }
  .cover {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    pointer-events: none;
  }
</style>
