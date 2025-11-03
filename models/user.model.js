import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: false,
            minLength: 6
        },
        googleId: {
            type: String,
            unique: true,
            sparse: true,
        },
        bookmarks: [
            {
                source: {
                    name: {
                        type: String,
                        required: true
                    }
                },
                author: {
                    type: String,
                    default: null
                },
                title: {
                    type: String,
                    required: true
                },
                description: {
                    type: String
                },
                url: {
                    type: String,
                    required: true
                },
                urlToImage: {
                    type: String
                },
                publishedAt: {
                    type: Date,
                    required: true
                },
                
                bookmarkedAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ]
    },
    { timestamps: true }
);

// Index for faster bookmark queries
userSchema.index({ 'bookmarks.url': 1 });

const User = mongoose.model("User", userSchema);

export default User;