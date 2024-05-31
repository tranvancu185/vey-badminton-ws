export interface IBaseResponse<T> {
    status: number;
    message: string;
    data: T;
}

export interface IDiscordLogger {
    level?: 'error' | 'warn' | 'info' | 'debug' | 'verbose' | 'silly';
    message: string;
    error?: Error;
    json?: any;
    description?: string;
    meta?: { [key: string]: string | number | Date };
}