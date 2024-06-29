// src/models/product.model.ts

import { DataTypes, Model, ModelAttributes } from 'sequelize';

import { sequelize } from '@/databases/models/index'; // Import sequelize instance

interface ProductAttributes {
    product_id: number;
    product_sku: string;
    product_barcode: string;
    product_name: string;
    product_manufactor_name: string | null;
    product_description?: string | null;
    product_properties?: string | null; // JSON string
    product_price: number;
    product_config?: number;
    product_type?: number;
    product_brand_id?: number | null;
    product_status: number;
    product_created_at: number;
    product_updated_at: number;
    product_deleted_at?: number | null;
    product_availability?: number | null;
    product_rating?: number | null;
}

class Product extends Model<ProductAttributes> implements ProductAttributes {
    public product_id!: number;
    public product_sku!: string;
    public product_barcode!: string;
    public product_name!: string;
    public product_manufactor_name!: string;
    public product_description!: string | null;
    public product_properties!: string | null;
    public product_price!: number;
    public product_config!: number;
    public product_type!: number;
    public product_brand_id!: number | null;
    public product_status!: number;
    public product_created_at!: number;
    public product_updated_at!: number;
    public product_deleted_at!: number | null;
    public product_availability!: number | null;
    public product_rating!: number | null;

    // Getter & setter cho product_properties (JSON)
    public get product_properties_object(): any {
        return this.product_properties ? JSON.parse(this.product_properties) : null;
    }

    public set product_properties_object(value: any) {
        this.product_properties = value ? JSON.stringify(value) : null;
    }
}

const productAttributes: ModelAttributes<Product, ProductAttributes> = {
    product_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    product_sku: {
        type: DataTypes.STRING,
        allowNull: false,
        index: true // index cho product_sku
    },
    product_barcode: {
        type: DataTypes.STRING,
        allowNull: false,
        index: true // index cho product_barcode
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    product_manufactor_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    product_description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    product_properties: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    product_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_config: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    product_type: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    product_brand_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    product_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    product_created_at: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_updated_at: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_deleted_at: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    product_availability: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    product_rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
};

Product.init(productAttributes, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    paranoid: true, // Sử dụng soft delete
});

export default Product;
