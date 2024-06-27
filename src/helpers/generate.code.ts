import { QueryTypes } from 'sequelize';
import moment from "moment";
import { sequelize } from '@/databases/models/index';

const CODE_LENGTH = {
    CUSTOMER: 6,
    USER: 8,
    ORDER: 24,
    RECEIPT: 24,
};

export const CODE_TYPE = {
    CUSTOMER: 'CUS',
    USER: 'USR',
    ORDER: '11',
    RECEIPT: '21',
};

export const CODE_KEY = {
    CUSTOMER: 'CUSTOMER',
    USER: 'USER',
    ORDER: 'ORDER',
    RECEIPT: 'RECEIPT',
}

interface GenerateUUIDCodeResult {
    new_code: string;
}

const generateGuuidPersonal = async (prefix: string, length_supense: number, codeTemp: string): Promise<string> => {
    try {
        const [results] = await sequelize.query(
            `CALL generate_uuid_code_personal('${prefix}', ${length_supense})`,
            { replacements: { prefix }, type: QueryTypes.RAW }
        ) as GenerateUUIDCodeResult[];
        console.log('results:', results);
        return results ? results.new_code : codeTemp;
    } catch (error) {
        console.log('Error creating guuid personal:', error);
    }
    return codeTemp;
};

const generateGuuid = async (prefix: string, codeTemp: string): Promise<string> => {
    try {
        const [results] = await sequelize.query(
            `CALL generate_uuid_code('${prefix}')`,
            { replacements: { prefix }, type: QueryTypes.RAW }
        ) as GenerateUUIDCodeResult[];
        console.log('results:', results);
        return results ? results.new_code : codeTemp;
    } catch (error) {
        console.log('Error creating guuid personal:', error);
    }
    return codeTemp;
};

const generateCode = async (type: string, id?: number) => {
    const currentTimeStamp = moment().unix();
    const currentYear = moment().format('YY');
    const currentMonth = moment().format('MM');
    const currentDay = moment().format('DD');
    const defaultCode = `${type.toUpperCase()}${id}${moment().format('YYMMDDHHmmss')}`;
    let codeTmp = defaultCode;
    let code = codeTmp;
    switch (type) {
        case 'CUSTOMER':
            codeTmp = `${CODE_TYPE[type]}${Math.random().toString(36).substr(2, CODE_LENGTH.CUSTOMER)}`;
            code = await generateGuuidPersonal(CODE_TYPE[type], 5, codeTmp);
            break;
        case 'USER':
            codeTmp = `${CODE_TYPE[type]}${Math.random().toString(36).substr(2, CODE_LENGTH.USER)}`;
            code = await generateGuuidPersonal(CODE_TYPE[type], 3, codeTmp);
            break;
        case 'ORDER':
            codeTmp = `${CODE_TYPE[type]}${currentYear}${currentMonth}${currentDay}${id ? id?.toString().padStart(6, '0') : Math.random().toString(36).substr(2, 6)}${currentTimeStamp}`;
            code = await generateGuuid(CODE_TYPE[type], codeTmp);
            break;
        case 'RECEIPT':
            codeTmp = `${CODE_TYPE[type]}${currentYear}${currentMonth}${currentDay}${id ? id?.toString().padStart(8, '0') : Math.random().toString(36).substr(2, 6)}${currentTimeStamp}`;
            code = await generateGuuid(CODE_TYPE[type], codeTmp);
            break;
        default:
            codeTmp = defaultCode;
            break;
    }
    return code;
};

export default generateCode;