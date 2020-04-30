<template>
  <div style="height: 800px;">
      <div style="height: 600px;">
        <div id="container" class="container"></div>
      </div>
  </div>
</template>


<script>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
export default {
  data () {
    return {
    }
  },
  mounted () {
    console.log('monaco.editor-------', monaco.editor)
    monaco.editor.create(document.getElementById('container'), {
      value: 'console.log("Hello, world")',
      width: '100%',
      height: '100vh',
      language: 'javascript',
      minimap: {
        enable: false,  // 小地图
      },
    })
  },
  methods: {
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body, html {
  height: 100%;
}
.container {
  height: 100%;
}
</style>
