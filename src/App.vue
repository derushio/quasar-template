<template lang="pug">
#app
    q-layout(view='lhr Lpr lFr')
        q-header.bg-primary.text-white(elevated)
            q-toolbar
                q-btn(flat round dense icon='menu' @click='drawer = !drawer')
                q-btn(stretch flat): q-toolbar-title {{ appName }}
        q-drawer(overlay elevated content-class='bg-grey-3' v-model='drawer')
        .outer-drawer(v-if='drawer' @click='drawer = false')

        q-page-container
            q-page(padding)
                router-view
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
    QLayout,
    QHeader,
    QToolbar,
    QToolbarTitle,
    QDrawer,
    QPageContainer,
    QPage,
    QBtn,
} from 'quasar';

@Component({
    components: {
        QLayout,
        QHeader,
        QToolbar,
        QToolbarTitle,
        QDrawer,
        QPageContainer,
        QPage,
        QBtn,
    },
})
export default class App extends Vue {
    public appName = process.env.APP_NAME;
    protected drawer = false;
}
</script>

<style lang="stylus">
@require '~@/assets/styles/entry/app.styl';

#app {
    background-color: transparent;
    position: relative;
}

.outer-drawer {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: fixed;
    z-index: $drawer-outside;
}
</style>
