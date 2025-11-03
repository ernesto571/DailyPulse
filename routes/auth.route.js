import express from "express";
import { signup, login, logout, checkAuth, googleCallback } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import passport from "passport";
import "../config/passport.js"; // make sure passport is initialized

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check", protectRoute,checkAuth);

// Google OAuth routes
router.get("/google", passport.authenticate("google", { 
    scope: ["profile", "email"] 
}));

router.get(
    "/google/callback",
    passport.authenticate("google", { 
        failureRedirect: "/login", 
        session: false 
    }),
    googleCallback
);

export default router;