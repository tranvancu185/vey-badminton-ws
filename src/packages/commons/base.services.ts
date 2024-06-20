import { FindOptions, InferAttributes, Model, ModelCtor } from 'sequelize';
import createLogger, { IProps as ILogger } from "@/utils/logger";
import loggerDiscord, { IDiscordLogger } from "@/utils/discord-logger";

import AppError from "@/utils/appError";
import CONSTANT from "@/utils/constants"

export default class BaseService<T extends Model> {
    protected CONSTANTS = CONSTANT;

    constructor(public model: ModelCtor<T>) { }

    public async getList(params: any): Promise<T[]> {
        const condition = this.parseFilter(params);
        const results = await this.model.findAll(condition);
        return results;
    }

    public async getById(id: any): Promise<T | null> {
        const result = await this.model.findByPk(id);
        return result;
    }

    public async getByCondition(params: any): Promise<T | null> {
        const condition = this.parseFilter(params);
        const result = await this.model.findOne(condition);
        return result;
    }

    public async insert(body: any): Promise<T> {
        const result = await this.model.create(this.parseBody(body));
        return result;
    }

    public async updateById(id: any, body: any): Promise<T | null> {
        const condition = this.parseFilter({ user_id: id });
        const result = await this.model.update(condition, body);
        return result ? this.getById(id) : null;
    }

    public async deleteById(id: any): Promise<boolean> {
        const result = await this.model.destroy({ where: { user_id: id } });
        return result > 0;
    }

    public parseFilter(params: any): FindOptions<InferAttributes<T>> {
        return params as FindOptions<InferAttributes<T>>;
    }

    public parseBody(body: any): any {
        return body as any;
    }

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