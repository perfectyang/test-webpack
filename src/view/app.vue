<template>
  <div class="app">
    <input type="file" ref="file" />
    <button @click="getFile">上传</button>
  </div>
</template>

<script>
import {fileParse} from '../api/utils'
import fetch from '../api/fetch'
export default {
  data () {
    return {
    }
  },
  methods: {
    slice (file, size = 1024 * 1024 * 5) {
      const totalSize = file.size
      let start = 0
      let end = start + size
      const chunks = []
      while (start < totalSize) {
        chunks.push(file.slice(start, end))
        start = end
        end = start + size
      }
      return chunks
    },
    // getFile () {
    //   const file = this.$refs.file.files[0]
    //   console.log(file)
    //   const LENGTH = 1024 * 1024 * 0.1
    //   let chunks = this.slice(file, LENGTH)
    //   console.log(chunks)
    //   const allBlobs = chunks.map(blob => {
    //     const form = new FormData()
    //     form.append('file', blob)
    //     return _ => fetch('/upload/', form)
    //   })
    // },
    async getFile () {
      const file = this.$refs.file.files[0]
      const result = await fileParse(file)
      console.log(result)
      const res = await fetch.post('/api/upload', {
        chunk: encodeURIComponent(result),
        filename: file.name
      })
      console.log('res', res)
    }
  }
}
</script>

<style lang='less' scoped>

</style>
