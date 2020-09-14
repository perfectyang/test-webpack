<template>
  <div class="app">
    <!-- {{primaryData}} -->
  ------------------------------
    <!-- {{scondaryData}} -->
    <br/>
    {{primaryTag}}
    ------------------<br/>
    {{secondaryTag}}
  </div>
</template>

<script>
import logicMixin from './logic'
export default {
  mixins: [logicMixin]
}
</script>

<style lang='less' scoped>

</style>
