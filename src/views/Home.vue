<template lang="pug">
#Home.q-layout-padding
    .main-pane
        hello-world(msg='HelloWorld')
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import '@/components/HelloWorld.vue';

@Component
export default class Home extends Vue {}
</script>

<style lang="stylus">
@require '~@/assets/styles/entry/view.styl';

html {
    scroll-view: true;
    // static-view: true;
}

#Home .main-pane {
    main-pane(900px);
}
</style>

<style lang="stylus" scoped>
@require '~@/assets/styles/entry/variable.styl';

#Home {
    .main-pane {
    }
}
</style>
