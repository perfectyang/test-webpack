<template>
  <div class="">
    <!-- {{$scopedSlots}}-------- -->
    <span ><slot name="name" :ob="list.list"></slot></span>
    <span v-if="$scopedSlots.user"><slot  name="user" :ob="list.list"></slot></span>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    console.log(this.$scopedSlots.user)
  },
  methods: {
  }
}
</script>

<style lang='less' scoped>

</style>
