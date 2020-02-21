/**
 * JSON読み込みユーティルクラス
 */
export default class JSONUtil {
    /**
     * JSON.parseを行う、できなかった場合はdefaultまたはnullを返す
     */
    public static tryParse<T>(str: string, def: T | null = null): any {
        let result: any | null;

        try {
            result = JSON.parse(str);
        } catch {
            result = def;
        }

        return result;
    }

    private constructor() {
        // pass;
    }
}
