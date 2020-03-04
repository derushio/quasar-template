import '@/plugins/registerServiceWorker';

import Vue, { VNode } from 'vue';
import '@/plugins/quasar';
import { quasarApiCustomize } from '@/plugins/quasarApiCustomize';
import { loggerApiCustomize } from '@/plugins/logger';

import App from '@/App.vue';
import router from '@/router';
import store from '@/store';

Vue.config.productionTip = false;
quasarApiCustomize(Vue);
loggerApiCustomize(Vue);

new Vue({
    router,
    store,
    render: (h): VNode => h(App),
}).$mount('#app');
