import User from "../models/user.model.js";

// Add article to bookmark (embedded)
export const addToBookmark = async (req, res) => {
  try {
    const { source, author, title, url, publishedAt, description, urlToImage, content } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if article already bookmarked by this user
    const existingBookmark = user.bookmarks.find(
      bookmark => bookmark.url === url
    );
    
    if (existingBookmark) {
      return res.status(400).json({ message: "Article already bookmarked" });
    }

    // Add article data directly to user's bookmarks
    user.bookmarks.push({
      source,
      author,
      title,
      description,
      url,
      urlToImage,
      publishedAt,
      bookmarkedAt: new Date()
    });
    
    await user.save();
    
    res.status(201).json(user.bookmarks);
  } catch (err) {
    console.error("Add to bookmark error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get user's bookmarks (embedded - no population needed)
export const getBookmarks = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.bookmarks);
  } catch (err) {
    console.error("Get bookmarks error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Remove article from bookmark using URL (embedded)
export const removeFromBookmark = async (req, res) => {
  try {
    const { articleURL } = req.params;
    const userId = req.user._id;

    // Decode the URL parameter
    const decodedURL = decodeURIComponent(articleURL);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if bookmark exists and remove it
    const initialLength = user.bookmarks.length;
    user.bookmarks = user.bookmarks.filter(
      bookmark => bookmark.url !== decodedURL
    );

    if (user.bookmarks.length === initialLength) {
      return res.status(404).json({ message: "Bookmark not found" });
    }

    await user.save();

    res.json({ 
      message: "Bookmark removed successfully", 
      bookmarks: user.bookmarks 
    });
  } catch (err) {
    console.error("Remove from bookmark error:", err);
    res.status(500).json({ error: err.message });
  }
};