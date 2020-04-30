<template>
  <div class="transform">
    <textarea class="transform__content" v-model="html"></textarea>
    <button @click="transformJs">transform</button>
    <div class="show-js" v-text="realHtml"></div>
  </div>
</template>

<script>
import {transformJs} from '../api/common.js'
export default {
  data () {
    return {
      html: '',
      realHtml: ''
    }
  },
  methods: {
    transformJs () {
      transformJs({
        data: this.html
      }).then(rs => {
        console.log(rs)
        this.realHtml = rs.data
      })
    }
  }
}
</script>

<style lang='less'>
.transform {
  margin: 0 auto;
  &__content {
    width: 80%;
    height: 400px;
    outline: none;
    margin: 10px;
    border: none;
  }
}
.show-js {
  width: 80%;
  height: 400px;
}
</style>
