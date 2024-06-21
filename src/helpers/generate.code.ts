import moment from "moment";

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

const generateCode = (type: string, id?: number) => {
    const currentTimeStamp = moment().unix();
    const currentYear = moment().format('YY');
    const currentMonth = moment().format('MM');
    const currentDay = moment().format('DD');
    const defaultCode = `${type.toUpperCase()}${id}${moment().format('YYMMDDHHmmss')}`;
    let code = defaultCode;
    switch (type) {
        case 'CUSTOMER':
            code = `${CODE_TYPE[type]}${Math.random().toString(36).substr(2, CODE_LENGTH.CUSTOMER)}`;
            break;
        case 'USER':
            code = `${CODE_TYPE[type]}${Math.random().toString(36).substr(2, CODE_LENGTH.USER)}`;
            break;
        case 'ORDER':
        case 'RECEIPT':
            code = `${CODE_TYPE[type]}${currentYear}${currentMonth}${currentDay}${id ? id?.toString().padStart(6, '0') : Math.random().toString(36).substr(2, 6)}${currentTimeStamp}`;
            break;
        default:
            code = defaultCode;
            break;
    }

    return code;
};

export default generateCode;