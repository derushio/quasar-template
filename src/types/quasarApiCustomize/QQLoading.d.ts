export default interface QQLoading {
    async: (func: () => any) => Promise<void>;
}
