import Vue from 'vue';
import QQNotifyOptions from '@/plugins/quasarApiCustomize/QQNotifyOptions';

export default {
    async open(this: Vue, options: QQNotifyOptions): Promise<void> {
        return new Promise<void>(
            async (resolve): Promise<void> => {
                this.$q.notify({
                    ...(typeof options === String.name.toLowerCase()
                        ? { message: options }
                        : (options as any)),
                    onDismiss: resolve,
                });
            },
        );
    },
};
