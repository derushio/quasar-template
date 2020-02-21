import QQBottomSheetOptions, {
    QQBottomSheetAction,
} from '@/plugins/quasarApiCustomize/QQBottomSheetOptions';

export default interface QQBottomSheet {
    open: (options: QQBottomSheetOptions) => Promise<QQBottomSheetAction>;
}
