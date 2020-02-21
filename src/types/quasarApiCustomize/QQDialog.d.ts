import { VueConstructor } from 'vue';
import { QDialogOptions } from 'quasar';
import QQDialogSize from '@/plugins/quasarApiCustomize/QQDialogSize';

export default interface QQDialog {
    open: (
        options: QDialogOptions,
        handleError?: boolean,
        def?: any,
    ) => Promise<any> & { ok: () => void };
    alert: (
        options: string | QDialogOptions,
    ) => Promise<void> & { ok: () => void };
    confirm: (
        options: string | QDialogOptions,
    ) => Promise<boolean> & { ok: () => void };
    prompt: (
        options: string | QDialogOptions,
        handleError?: boolean,
    ) => Promise<string> & { ok: () => void };
    component: (
        component: VueConstructor,
        optionsProps: QDialogOptions & { props?: any },
        size?: QQDialogSize,
        needCard?: boolean,
    ) => Promise<any> & { ok: () => void };
}
