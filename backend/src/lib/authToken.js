import jwt from "jsonwebtoken";


const TOKEN_LIFESPAN_IN_DAYS = 365;
const MILLISECONDS_IN_ONE_DAY = 24 * 60 * 60 * 1000;

export const setJwtCookie = (userId, res) => {
    const token = jwt.sign(
        { userId }, 
        process.env.JWT_SECRET,
        { expiresIn: `${TOKEN_LIFESPAN_IN_DAYS}d` }
    );

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie(
        "jwt",
        token, 
        {
            maxAge: TOKEN_LIFESPAN_IN_DAYS * MILLISECONDS_IN_ONE_DAY,
            // Prevents XSS attacks
            httpOnly: true,
            sameSite: isProduction ? "none" : "strict",
            // During development, localhost uses http. The final production app will use https instead.
            secure: isProduction
        }
    );
};