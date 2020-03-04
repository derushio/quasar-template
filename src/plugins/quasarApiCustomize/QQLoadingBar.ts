import Vue from 'vue';

import ExtendableError from 'extendable-error';

export class QQLoadingBarError extends ExtendableError {
    public constructor() {
        super('QQLoadingBar is handling error');
    }
}

export default {
    async async(
        this: Vue,
        func: (increment: (amount?: number) => void) => any,
    ): Promise<void> {
        return new Promise(
            async (resolve, reject): Promise<void> => {
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
            },
        );
    },
};
