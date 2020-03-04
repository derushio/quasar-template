import Vue from 'vue';
import registerComponentProgrammatic from '@/plugins/registerComponentProgrammatic';

import QQLoading from '@/plugins/quasarApiCustomize/QQLoading';
import QQDialog from '@/plugins/quasarApiCustomize/QQDialog';
import QQBottomSheet from '@/plugins/quasarApiCustomize/QQBottomSheet';
import QQLoadingBar from '@/plugins/quasarApiCustomize/QQLoadingBar';
import QQNotify from '@/plugins/quasarApiCustomize/QQNotify';

import QQFullScreen from '@/plugins/quasarApiCustomize/QQFullScreen';
import QQAppVisible from '@/plugins/quasarApiCustomize/QQAppVisible';

export function quasarApiCustomize(v: typeof Vue): void {
    registerComponentProgrammatic(v, '$qqLoading', QQLoading);
    registerComponentProgrammatic(v, '$qqDialog', QQDialog);
    registerComponentProgrammatic(v, '$qqBottomSheet', QQBottomSheet);
    registerComponentProgrammatic(v, '$qqLoadingBar', QQLoadingBar);
    registerComponentProgrammatic(v, '$qqNotify', QQNotify);

    registerComponentProgrammatic(v, '$qqFullScreen', QQFullScreen);
    registerComponentProgrammatic(v, '$qqAppVisible', QQAppVisible);
}
