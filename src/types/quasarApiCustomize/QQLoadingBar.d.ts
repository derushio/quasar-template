export default interface QQLoadingBar {
    async: (
        func: (increment: (amount?: number) => void) => any,
    ) => Promise<void>;
}
