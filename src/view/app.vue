<template>
  <!-- <div style="height: 100%;"> -->
    <!-- <home />
    {{testArr}}
    {{badBoy}}
    <button @click="changeTheme(0)">green</button>
    <button @click="changeTheme(1)">red</button>
    <button @click="changeTheme(2)">yellow</button>
    <button @click="change">test</button> -->
    
  <!-- </div> -->
  <div id="app">
    <!-- <editor /> -->
    <parsejs />
  </div>
</template>

<script>
import home from './home.vue'
import editor from './editor.vue'
import parsejs from './parsejs.vue'
export default {
  name: 'badBoy',
  components: {
    home,
    editor,
    parsejs
  },
  data () {
    return {
      theme: [
        'green',
        'red',
        'yellow'
      ],
      testArr: [
        {name: 'a'},
        '在这里'
      ]
    }
  },
  mounted () {
  },
  beforeCreate () {
  },
  methods: {
    remove () {
    },
    changeTheme (idx) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = `./theme-${this.theme[idx]}.css`
      link.dataset.theme = this.theme[idx]
      document.head.appendChild(link)
    },
    change () {
      console.log(this.testArr)
      this.testArr[0].name = 'aaa'
    }
  }
}
</script>

<style lang='less' scoped>
* {
  margin: 0;
  padding: 0;
  height: 100%;
}
body, html {
  height: 100%;
}
</style>
