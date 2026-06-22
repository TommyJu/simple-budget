import jwt from "jsonwebtoken";

const TOKEN_LIFESPAN_IN_DAYS = 365;

export const createJwtToken = (userId) => {
    const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: `${TOKEN_LIFESPAN_IN_DAYS}d` }
    );

    return token;
};