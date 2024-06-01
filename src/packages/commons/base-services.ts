import { FindOptions, InferAttributes, Model, ModelCtor } from 'sequelize';

export default class BaseService<T extends Model> {

    constructor(public model: ModelCtor<T>) { }

    public async getList(params: any): Promise<T[]> {
        const condition = this.parseFilter(params);
        const results = await this.model.findAll(condition);
        return results;
    }

    public async getById(id: number): Promise<T | null> {
        const result = await this.model.findByPk(id);
        return result;
    }

    public async getByCondition(params: any): Promise<T | null> {
        const condition = this.parseFilter(params);
        const result = await this.model.findOne(condition);
        return result;
    }

    public parseFilter(params: any): FindOptions<InferAttributes<T>> {
        return params as FindOptions<InferAttributes<T>>;
    }

    public parseBody(body: any): any {
        return body as any;
    }
} 