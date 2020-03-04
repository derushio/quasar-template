import Vue from 'vue';

import ExtendableError from 'extendable-error';

export class QQAppVisibleError extends ExtendableError {
    public constructor() {
        super('QQAppVisible is handling error');
    }
}

export default {
    async async(this: Vue, func: () => any): Promise<void> {
        return new Promise(async (resolve, reject) => {
            this.$q.appVisible = true;

            try {
                await func();

                this.$q.appVisible = false;
                resolve();
                return;
            } catch {
                this.$q.appVisible = false;
                reject(new QQAppVisibleError());
                return;
            }
        });
    },
};
