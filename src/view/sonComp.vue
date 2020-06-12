<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    clickHandler () {
      alert(111)
    }
  },
  render (_c) {
    return _c('div', {
      'class': {
        foo: true,
        bar: false
      },
      style: {
        color: 'red',
        fontSize: '14px'
      },
      domProps: {
        innerHTML: '在这里'
      },
      on: {
        click: this.clickHandler
      },
    })
  }
}
</script>

<style lang='less' scoped>

</style>
