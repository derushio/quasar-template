import Vue from 'vue';

import Logger from '@/utils/Logger';
(window as any).logger = new Logger();

export function loggerApiCustomize(v: typeof Vue): void {
    v.prototype.__defineGetter__('$logger', () => (window as any).logger);
}
