import Vue from 'vue';
import QQBottomSheetOptions, {
    QQBottomSheetAction,
} from '@/plugins/quasarApiCustomize/QQBottomSheetOptions';

import ExtendableError from 'extendable-error';

export class QQBottomSheetCancelError extends ExtendableError {
    public constructor() {
        super('QQBottomSheet is canceled');
    }
}

export default {
    async open(
        this: Vue,
        options: QQBottomSheetOptions,
    ): Promise<QQBottomSheetAction> {
        return new Promise<QQBottomSheetAction>(async (resolve, reject) => {
            this.$q
                .bottomSheet(options)
                .onOk((action: QQBottomSheetAction) => {
                    resolve(action);
                })
                .onCancel(() => {
                    reject(new QQBottomSheetCancelError());
                })
                .onDismiss(() => {
                    reject(new QQBottomSheetCancelError());
                });
        });
    },
};
