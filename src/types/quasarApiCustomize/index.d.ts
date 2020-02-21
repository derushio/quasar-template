import Logger from '@/utils/Logger';

import QQLoading from '@/types/quasarApiCustomize/QQLoading';
import QQDialog from '@/types/quasarApiCustomize/QQDialog';
import QQBottomSheet from '@/types/quasarApiCustomize/QQBottomSheet';
import QQLoadingBar from '@/types/quasarApiCustomize/QQLoadingBar';
import QQNotify from '@/types/quasarApiCustomize/QQNotify';

import QQFullScreen from '@/types/quasarApiCustomize/QQFullScreen';
import QQAppVisible from '@/types/quasarApiCustomize/QQAppVisible';

declare module 'vue/types/vue' {
    interface Vue {
        $logger: Logger;

        $qqLoading: QQLoading;
        $qqDialog: QQDialog;
        $qqBottomSheet: QQBottomSheet;
        $qqLoadingBar: QQLoadingBar;
        $qqNotify: QQNotify;

        $qqFullScreen: QQFullScreen;
        $qqAppVisible: QQAppVisible;
    }
}
