import Vue from 'vue';

import ExtendableError from 'extendable-error';

export class QQFullScreenError extends ExtendableError {
    public constructor() {
        super('QQLoading is handling error');
    }
}

export default {
    async async(this: Vue, func: () => any): Promise<void> {
        return new Promise(
            async (resolve, reject): Promise<void> => {
                this.$q.fullscreen.request();

                try {
                    await func();

                    this.$q.fullscreen.exit();
                    resolve();
                    return;
                } catch {
                    this.$q.fullscreen.exit();
                    reject(new QQFullScreenError());
                    return;
                }
            },
        );
    },
};
