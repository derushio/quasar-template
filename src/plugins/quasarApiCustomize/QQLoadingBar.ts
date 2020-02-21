import Vue from 'vue';

import ExtendableError from 'extendable-error';

export class QQLoadingBarError extends ExtendableError {
    public constructor() {
        super('QQLoadingBar is handling error');
    }
}

export default {
    async async(this: Vue, func: (increment: (amount?: number) => void) => any) {
        return new Promise(async (resolve, reject) => {
            this.$q.loadingBar.start();

            try {
                await func(this.$q.loadingBar.increment);

                this.$q.loadingBar.stop();
                resolve();
                return;
            } catch {
                this.$q.loadingBar.stop();
                reject(new QQLoadingBarError());
                return;
            }
        });
    },
};
