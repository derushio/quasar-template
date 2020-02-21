<template lang="pug">
q-card.sample-dialog
    q-card-section
        span.block {{ text }}
        q-input(v-model='input')
    q-separator
    q-card-actions(align='right')
        q-btn(flat color='warning' @click='$emit("cancel")') CANCEL
        q-btn(flat color='positive' @click='$emit("ok", input)') OK
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { QCard, QCardSection, QCardActions, QInput, QSeparator } from 'quasar';

@Component({
    components: {
        QCard,
        QCardSection,
        QCardActions,
        QInput,
        QSeparator,
    },
})
export default class SampleDialog extends Vue {
    @Prop({ type: String, default: 'text' })
    protected text!: string;

    protected input = '';
}
Vue.component('SampleDialog', SampleDialog);
</script>

<style lang="stylus" scoped>
@require '~@/assets/styles/entry/variable.styl';

.sample-dialog {
}
</style>
