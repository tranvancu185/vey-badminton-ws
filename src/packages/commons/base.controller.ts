import createLogger, { IProps as ILogger } from "@/utils/logger";
import loggerDiscord, { IDiscordLogger } from "@/utils/discord-logger";

import AppError from "@/utils/appError";
import CONSTANT from "@/utils/constants"

export default class BaseController {
    protected CONSTANTS = CONSTANT;

    public formatString() {
        return true;
    }

    public appError({ message, message_code, statusCode }: { message: string, message_code: string, statusCode: number }) {
        return new AppError(message, statusCode, message_code);
    }

    public createLogger({ fileName, infoLog, includeDate }: ILogger) {
        return createLogger({ fileName, infoLog, includeDate });
    }

    public parseJSON = (json: string) => {
        try {
            return JSON.parse(json);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return null;
        }
    }

    public loggerDiscord({ level, message, error, json, description, meta }: IDiscordLogger) {
        try {
            switch (level) {
                case 'error':
                    loggerDiscord.error({ message, error, json, description, meta });
                    break;
                case 'warn':
                    loggerDiscord.warn({ message, error, json, description, meta });
                    break;
                case 'info':
                    loggerDiscord.info({ message, error, json, description, meta });
                    break;
                case 'debug':
                    loggerDiscord.debug({ message, error, json, description, meta });
                    break;
                case 'verbose':
                    loggerDiscord.verbose({ message, error, json, description, meta });
                    break;
                case 'silly':
                    loggerDiscord.silly({ message, error, json, description, meta });
                    break;
                default:
                    loggerDiscord.info({ message, error, json, description, meta });
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    }
}

