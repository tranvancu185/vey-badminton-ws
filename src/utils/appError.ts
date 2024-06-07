class AppError extends Error {
    message_code?: string;
    statusCode: number;
    status: number;
    isOperational: boolean;

    constructor(message: string, statusCode: number, message_code?: string) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') || `${statusCode}`.startsWith('5') ? 0 : 1;
        this.isOperational = true;
        this.message_code = message_code;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;