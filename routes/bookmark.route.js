import express from "express";
import { addToBookmark, getBookmarks, removeFromBookmark } from "../controllers/bookmark.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const router = express.Router();

router.get("/", protectRoute, getBookmarks);

router.post("/", protectRoute, addToBookmark);

router.delete("/:articleURL", protectRoute, removeFromBookmark);

export default router;


