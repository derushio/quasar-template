import Vue from 'vue';

import {
    Quasar,
    QLayout,
    QHeader,
    QDrawer,
    QPageContainer,
    QPage,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    Loading,
    Dialog,
    BottomSheet,
    LoadingBar,
    Notify,
    AppFullscreen,
    AppVisibility,
} from 'quasar';
import langJa from 'quasar/lang/ja';

Vue.use(Quasar, {
    lang: langJa,
    config: {},
    components: {
        QLayout,
        QHeader,
        QDrawer,
        QPageContainer,
        QPage,
        QToolbar,
        QToolbarTitle,
        QBtn,
        QIcon,
        QList,
        QItem,
        QItemSection,
        QItemLabel,
    },
    directives: {
    },
    plugins: {
        Loading, Dialog, BottomSheet, LoadingBar, Notify,
        AppFullscreen, AppVisibility,
    },
});
