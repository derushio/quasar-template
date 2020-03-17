import ArrayUtil from '@/utils/ArrayUtil';

describe('ArrayUtil', () => {
    it('range(5)', () => {
        expect(ArrayUtil.range(5)).toEqual([0, 1, 2, 3, 4]);
    });

    it('range(1, 5)', () => {
        expect(ArrayUtil.range(1, 5)).toEqual([1, 2, 3, 4, 5]);
    });
});
