import Vue from 'vue';

export default {
    async async(this: Vue, func: () => any) {
        return new Promise(async (resolve, reject) => {
            this.$q.loading.show();

            try {
                await func();

                this.$q.loading.hide();
                resolve();
                return;
            } catch (e) {
                this.$q.loading.hide();
                reject(e);
                return;
            }
        });
    },
};
