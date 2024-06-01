export interface IBaseResponse<T> {
    status: number;
    message: string;
    data: T | null;
}

export interface IBaseFilterParams {
    code?: string;
    page?: number;
    pageSize?: number;
    sort?: string;
    filter?: any;
    limit?: number;
    offset?: number;
    orderBy?: string[] | [string, string][];
    exclude?: string | string[];
    include?: any | any[]; // Bạn có thể cần định nghĩa rõ hơn kiểu dữ liệu của include
}