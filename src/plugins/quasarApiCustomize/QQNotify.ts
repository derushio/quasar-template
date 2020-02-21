import Vue from 'vue';
import QQNotifyOptions from '@/plugins/quasarApiCustomize/QQNotifyOptions';

export default {
    async open(this: Vue, options: QQNotifyOptions) {
        return new Promise<void>(async resolve => {
            this.$q.notify({
                ...(typeof options === String.name.toLowerCase()
                    ? { message: options }
                    : (options as any)),
                onDismiss: resolve,
            });
        });
    },
};
