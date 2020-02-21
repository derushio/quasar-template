import QQNotifyOptions from '@/plugins/quasarApiCustomize/QQNotifyOptions';

export default interface QQNotify {
    open: (options: QQNotifyOptions) => Promise<void>;
}
