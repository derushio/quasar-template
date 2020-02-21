export default interface QQAppVisible {
    async: (func: () => any) => Promise<void>;
}
