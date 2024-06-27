import { FindOptions, InferAttributes, Model, ModelCtor } from 'sequelize';

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
} 