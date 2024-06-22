import jwt from "jsonwebtoken";
import 'dotenv/config';

export const generateAccessToken = (email: any) => {
    return jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '2d' });
};

export const verifyAccessToken = (token: string) => {
    try {
        const response = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
        return { success: true, user: response }
    } catch (error) {
        return { success: false, error };
    }
};