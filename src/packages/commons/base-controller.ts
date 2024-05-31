import { IDiscordLogger } from "./base-interfaces";
import loggerDiscord from "@/configs/logger/discord-logger";

export default class BaseController<T> {
    public formatString() {
        return true;
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

