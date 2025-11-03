import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = "https://newsapi.org/v2";
const NEWS_API_KEY = process.env.NEWS_API_KEY;

// Cache setup
let cache = {};
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

// 🔧 Helper: filter & clean articles
const filterArticles = (articles) => {
  if (!articles || !Array.isArray(articles)) return [];

  const seen = new Set();
  const blockedDomains = ["biztoc.com", "cloudflare", "https://static.the-independent.com", "gravatar.com"];

  return articles
    .filter((article) => {
      if (!article.title || !article.url) return false;

      // Skip images from blocked or missing URLs
      if (
        !article.urlToImage ||
        blockedDomains.some((domain) =>
          article.urlToImage.toLowerCase().includes(domain)
        )
      ) {
        return false;
      }

      // Remove duplicates by title + URL
      const key =
        article.title.trim().toLowerCase() + "|" + article.url.trim().toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);

      return true;
    })
    .map((article) => ({
      ...article,
      // fallback image if needed
      urlToImage:
        article.urlToImage ||
        "https://via.placeholder.com/300x200?text=No+Image+Available",
    }));
};

// 🔁 Cached fetch wrapper
const cachedFetch = async (url) => {
  const now = Date.now();

  if (cache[url] && now - cache[url].timestamp < CACHE_TTL) {
    console.log(`🟢 Cache hit for: ${url}`);
    return cache[url].data;
  }

  console.log(`🔵 Cache miss, fetching: ${url}`);
  const { data } = await axios.get(url);

  // Apply filtering here globally
  const filteredData = { ...data, articles: filterArticles(data.articles) };

  cache[url] = { data: filteredData, timestamp: now };
  return filteredData;
};

// ---------------------------
// 📰 Category Endpoints
// ---------------------------

// Business
export const getBusinessNews = async (req, res) => {
  try {
    const url = `${BASE_URL}/everything?q=business&sortBy=publishedAt&language=en&pageSize=100&apiKey=${NEWS_API_KEY}`;
    const data = await cachedFetch(url);
    res.json(data.articles);
  } catch (error) {
    console.error("Error fetching business news:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch business news" });
  }
};

// Sports
export const getSportsNews = async (req, res) => {
  try {
    const url = `${BASE_URL}/everything?q=sports&sortBy=publishedAt&language=en&pageSize=100&apiKey=${NEWS_API_KEY}`;
    const data = await cachedFetch(url);
    res.json(data.articles);
  } catch (error) {
    console.error("Error fetching sports news:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch sports news" });
  }
};

// Entertainment
export const getEntertainmentNews = async (req, res) => {
  try {
    const url = `${BASE_URL}/everything?q=entertainment&sortBy=publishedAt&language=en&pageSize=100&apiKey=${NEWS_API_KEY}`;
    const data = await cachedFetch(url);
    res.json(data.articles);
  } catch (error) {
    console.error("Error fetching entertainment news:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch entertainment news" });
  }
};

// Crypto
export const getCryptoNews = async (req, res) => {
  try {
    const url = `${BASE_URL}/everything?q=crypto OR cryptocurrency OR bitcoin&sortBy=publishedAt&language=en&pageSize=100&apiKey=${NEWS_API_KEY}`;
    const data = await cachedFetch(url);
    res.json(data.articles);
  } catch (error) {
    console.error("Error fetching crypto news:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch crypto news" });
  }
};

// Technology
export const getTechnologyNews = async (req, res) => {
  try {
    const url = `${BASE_URL}/everything?q=technology&sortBy=publishedAt&language=en&pageSize=100&apiKey=${NEWS_API_KEY}`;
    const data = await cachedFetch(url);
    res.json(data.articles);
  } catch (error) {
    console.error("Error fetching technology news:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch technology news" });
  }
};

// Health
export const getHealthNews = async (req, res) => {
  try {
    const url = `${BASE_URL}/top-headlines?category=health&sortBy=publishedAt&language=en&pageSize=100&apiKey=${NEWS_API_KEY}`;
    const data = await cachedFetch(url);
    res.json(data.articles);
  } catch (error) {
    console.error("Error fetching health news:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch health news" });
  }
};

// General
export const getGeneralNews = async (req, res) => {
  try {
    const url = `${BASE_URL}/everything?q=news&sortBy=publishedAt&language=en&pageSize=100&apiKey=${NEWS_API_KEY}`;
    const data = await cachedFetch(url);
    res.json(data.articles);
  } catch (error) {
    console.error("Error fetching general news:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch general news" });
  }
};

// Arts
export const getArtsNews = async (req, res) => {
  try {
    const url = `${BASE_URL}/everything?q=arts&sortBy=publishedAt&language=en&pageSize=100&apiKey=${NEWS_API_KEY}`;
    const data = await cachedFetch(url);
    res.json(data.articles);
  } catch (error) {
    console.error("Error fetching arts news:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch arts news" });
  }
};

// Top Headlines
export const getTopHeadlines = async (req, res) => {
  try {
    const url = `${BASE_URL}/everything?q=top-headlines&sortBy=publishedAt&language=en&pageSize=100&apiKey=${NEWS_API_KEY}`;
    const data = await cachedFetch(url);
    res.json(data.articles);
  } catch (error) {
    console.error("Error fetching top headlines:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch top headlines" });
  }
};

// BBC / CNN example
export const getOnlyCnnNews = async (req, res) => {
  try {
    const url = `${BASE_URL}/everything?q=bbc OR cnn&sortBy=publishedAt&language=en&pageSize=50&apiKey=${NEWS_API_KEY}`;
    const data = await cachedFetch(url);
    res.json(data.articles);
  } catch (error) {
    console.error("Error fetching specific network news:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch specific network news" });
  }
};

// Search endpoint
export const searchNews = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const url = `${BASE_URL}/everything?q=${encodeURIComponent(
      q
    )}&sortBy=publishedAt&language=en&pageSize=100&apiKey=${NEWS_API_KEY}`;

    const data = await cachedFetch(url);
    res.json(data.articles);
  } catch (error) {
    console.error("Error searching news:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to search news" });
  }
};
