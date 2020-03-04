/**
 * ランダムユーティルクラス
 */
export default class RandomUtil {
    /**
     * startからend(含む)までの整数乱数を生成する, startのみの場合は指定数の乱数を生成する
     */
    public static rand(start: number, end?: number): number {
        if (end == null) {
            return Math.floor(Math.random() * start);
        }
        return Math.floor(Math.random() * (end + 1 - start) + start);
    }

    protected constructor() {
        // pass;
    }
}
