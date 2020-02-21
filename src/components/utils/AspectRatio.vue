<template lang="pug">
.aspect-ratio
    .ratio(ref='ratio')
        .frame
            slot

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class AspectRatio extends Vue {
    @Prop({ type: Number })
    protected ratio?: number;

    protected mounted() {
        this.changeRatio();
    }

    protected updated() {
        this.changeRatio();
    }

    protected changeRatio() {
        if (this.ratio == null) {
            return;
        }
        const el = this.$refs.ratio as HTMLElement;
        el.style.paddingTop = `${(1 / this.ratio) * 100}%`;
    }
}
Vue.component('AspectRatio', AspectRatio);
</script>

<style lang="stylus" scoped>
@require '~@/assets/styles/entry/_variable.styl';

.aspect-ratio
    .ratio
        position: relative;

    .frame
        position: absolute;
        left: 0; top: 0;
        width: 100%; height: 100%;

        & > *
            overflow: hidden;
</style>
