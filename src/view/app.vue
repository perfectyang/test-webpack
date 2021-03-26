<template>
  <div class="">
    <son :list="{name: 'xxx', list: ['a']}">
      <template v-slot:name="{ob}">{{ob}}dddd</template>
      <!-- <template #user="{ob}" >{{ob}}user</template> -->

    </son>
  </div>
</template>

<script>
import son from './son.vue'
export default {
  components: {
    son
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang='less' scoped>

</style>
