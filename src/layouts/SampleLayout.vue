<template lang="pug">
.sample-layout
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SampleLayout extends Vue {}
Vue.component('SampleLayout', SampleLayout);
</script>

<style lang="stylus" scoped>
@require '~@/assets/styles/entry/variable.styl';

.sample-layout {
}
</style>
