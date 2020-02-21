<template lang="pug">
q-card.$__VUE_NAME__$
    q-card-section
        q-input(v-model='text')
    q-separator
    q-card-actions(align='right')
        q-btn(flat color='warning' @click='$emit("cancel")') CANCEL
        q-btn(flat color='positive' @click='$emit("ok", text)') OK
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
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
export default class $__CLASS_NAME__$ extends Vue {
    protected text = '';
}
Vue.component('$__CLASS_NAME__$', $__CLASS_NAME__$);
</script>

<style lang="stylus" scoped>
@require '~@/assets/styles/entry/variable.styl';

.$__VUE_NAME__$ {
}
</style>
