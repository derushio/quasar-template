/**
 * 配列ユーティルクラス
 */
export default class ArrayUtil {
    /**
     * startからend(含む)までの配列を生成
     * startだけの場合はその数の配列を生成
     */
    public static range(start: number, end?: number): number[] {
        if (end == null) {
            end = start;
            start = 0;
        } else {
            end += 1;
        }

        return [...Array(end).keys()].slice(start);
    }

    protected constructor() {
        // pass;
    }
}
