import express from "express";
import {
  getBusinessNews,
  getSportsNews,
  getEntertainmentNews,
  getCryptoNews,
  getTechnologyNews,
  getHealthNews,
  getGeneralNews,
  getArtsNews,
  getTopHeadlines,
  searchNews,
  getOnlyCnnNews
} from "../controllers/news.controller.js";

const router = express.Router();

router.get("/business", getBusinessNews);
router.get("/sports", getSportsNews);
router.get("/entertainment", getEntertainmentNews);
router.get("/crypto", getCryptoNews);
router.get("/technology", getTechnologyNews);
router.get("/health", getHealthNews);
router.get("/general", getGeneralNews);
router.get("/arts", getArtsNews);
router.get("/top-headlines", getTopHeadlines);
router.get("/daily-pulse", getOnlyCnnNews);
router.get("/news", getOnlyCnnNews);

// search by keyword
router.get("/search", searchNews)

export default router;