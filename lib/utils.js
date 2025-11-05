import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        // Set cookie with proper options
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",            
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        console.log("✅ JWT token generated and cookie set for user:", userId);
        return token;
    } catch (error) {
        console.error("❌ Error generating token:", error);
        throw new Error("Token generation failed");
    }
};