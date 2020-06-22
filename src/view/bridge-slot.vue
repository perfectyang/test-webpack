<template>
<div>
  <slot v-bind:cur="{objInfo, computeReactive}"></slot>
</div>
</template>

<script>
export default {
  props: {
    objInfo: {
      type: Object,
      default: () => ({})
    },
    computeReactive: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
