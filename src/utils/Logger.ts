export enum LOG_LEVEL {
    NONE,
    LOG,
    INFO,
    DEBUG,
    WARN,
    ERROR,
}

export default class Logger {
    public history = [] as Array<{
        time: string;
        level: string;
        message: any;
        optionalParams: any[];
    }>;

    protected logLevel = LOG_LEVEL.ERROR;
    protected historyNum = 50;

    public constructor(logLevel: LOG_LEVEL = LOG_LEVEL.ERROR, historyNum = 50) {
        this.logLevel = logLevel;
        this.historyNum = historyNum;
    }

    public log(message?: any, ...optionalParams: any[]): void {
        if (this.logLevel >= LOG_LEVEL.LOG) {
            window.console.log(message, ...optionalParams);
            this.logger(LOG_LEVEL.LOG, message, optionalParams);
        }
    }

    public info(message?: any, ...optionalParams: any[]): void {
        if (this.logLevel >= LOG_LEVEL.INFO) {
            window.console.info(message, ...optionalParams);
            this.logger(LOG_LEVEL.INFO, message, optionalParams);
        }
    }

    public debug(message?: any, ...optionalParams: any[]): void {
        if (this.logLevel >= LOG_LEVEL.DEBUG) {
            window.console.debug(message, ...optionalParams);
            this.logger(LOG_LEVEL.DEBUG, message, optionalParams);
        }
    }

    public table(...tabularData: any[]): void {
        if (this.logLevel >= LOG_LEVEL.DEBUG) {
            window.console.table(tabularData);
            this.logger(LOG_LEVEL.DEBUG, tabularData);
        }
    }

    public warn(message?: any, ...optionalParams: any[]): void {
        if (this.logLevel >= LOG_LEVEL.WARN) {
            window.console.warn(message, ...optionalParams);
            this.logger(LOG_LEVEL.WARN, message, optionalParams);
        }
    }

    public error(message?: any, ...optionalParams: any[]): void {
        if (this.logLevel >= LOG_LEVEL.ERROR) {
            window.console.error(message, ...optionalParams);
            this.logger(LOG_LEVEL.ERROR, message, optionalParams);
        }
    }

    protected logger(
        level: LOG_LEVEL,
        message?: any,
        ...optionalParams: any[]
    ): void {
        this.history.unshift({
            time: new Date().toString(),
            level: LOG_LEVEL[level],
            message,
            optionalParams,
        });
        this.history = this.history.slice(0, this.historyNum);
    }
}
