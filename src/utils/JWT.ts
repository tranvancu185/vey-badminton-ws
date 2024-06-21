import jwt from 'jsonwebtoken';

const createJWTToken = async (payload: any, public_key: string, private_key: string) => {
    try {
        const accessToken = await jwt.sign(payload, private_key, {
            algorithm: 'RS256',
            expiresIn: '2 days'
        });

        const refreshToken = await jwt.sign(payload, private_key, {
            algorithm: 'RS256',
            expiresIn: '7 days'
        });

        jwt.verify(accessToken, public_key, (err, decoded) => {
            console.log('decoded', decoded);
            if (err) {
                throw err;
            }
        });
        return { accessToken, refreshToken };
    } catch (error) {
        throw error;
    }
};

export default createJWTToken;