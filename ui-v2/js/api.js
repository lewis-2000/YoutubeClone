/**
 * API Module - Handles all API calls to the server
 * 
 * This module provides a clean interface for communicating with the backend server.
 * It uses the Fetch API to make HTTP requests and returns Promises that resolve to
 * video data and user information in JSON format.
 * 
 * Data Structures Used:
 * - Promise: Returned from async functions, allows asynchronous handling of HTTP responses
 * - JSON Objects: Video objects have properties: {id, title, thumbnail, channel, avatar, views, uploaded, category}
 * - Arrays: Lists of video/user objects returned from the server
 * - Error Objects: Used for error handling in try-catch blocks
 * 
 * Server running on http://localhost:3000
 */

// String constant - stores the base URL for all API endpoints
const API_BASE_URL = 'http://localhost:3000/api';

/**
 * VideoAPI Class
 * Static class that encapsulates all video-related API calls
 * Uses the Class design pattern for organizing related functions
 */
class VideoAPI {
    /**
     * Fetch home page videos (trending)
     * 
     * Data Flow:
     * 1. fetch() - returns a Promise that resolves to a Response object
     * 2. response.ok - Boolean check (true if status 200-299)
     * 3. response.json() - Returns a Promise that resolves to parsed JSON Array
     * 4. Array of video objects: [{id, title, thumbnail, channel, avatar, views, uploaded}, ...]
     * 
     * @returns {Promise<Array>} Array of video objects
     */
    static async getHomeVideos() {
        try {
            // Fetch returns a Promise that resolves to Response object
            const response = await fetch(`${API_BASE_URL}/mock/home`);
            // Check if HTTP request was successful (status 200-299)
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            // Parse response body as JSON and return Promise
            return await response.json();
        } catch (error) {
            // Error handling - log and re-throw for caller to handle
            console.error('Error fetching home videos:', error);
            throw error;
        }
    }

    /**
     * Fetch shorts videos
     * 
     * Data Structure:
     * Returns same structure as getHomeVideos() but filtered for short-form content
     * Array of video objects used in carousel display
     * 
     * @returns {Promise<Array>} Array of short video objects
     */
    static async getShorts() {
        try {
            const response = await fetch(`${API_BASE_URL}/mock/shorts`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching shorts:', error);
            throw error;
        }
    }

    /**
     * Fetch subscription feed videos
     * 
     * Retrieves videos from channels the user is subscribed to
     * Data Structure: Array of video objects
     * 
     * @returns {Promise<Array>} Array of subscription video objects
     */
    static async getSubscriptionVideos() {
        try {
            const response = await fetch(`${API_BASE_URL}/mock/subscriptions`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching subscription videos:', error);
            throw error;
        }
    }

    /**
     * Fetch library/history videos
     * 
     * Retrieves user's watch history or library
     * Data Structure: Array of video objects from history
     * 
     * @returns {Promise<Array>} Array of history video objects
     */
    static async getLibraryVideos() {
        try {
            const response = await fetch(`${API_BASE_URL}/mock/library`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching library videos:', error);
            throw error;
        }
    }

    /**
     * Get all videos (unrestricted)
     * 
     * Fetches complete list of all videos from database
     * Used for search functionality to filter across entire collection
     * Data Structure: Array of all video objects in database
     * 
     * @returns {Promise<Array>} Complete array of all video objects
     */
    static async getAllVideos() {
        try {
            const response = await fetch(`${API_BASE_URL}/videos`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching all videos:', error);
            throw error;
        }
    }

    /**
     * Get video by ID
     */
    static async getVideoById(videoId) {
        try {
            const response = await fetch(`${API_BASE_URL}/videos/${videoId}`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error(`Error fetching video ${videoId}:`, error);
            throw error;
        }
    }

    /**
     * Upload a new video
     */
    static async uploadVideo(formData) {
        try {
            const response = await fetch(`${API_BASE_URL}/videos/upload`, {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Error uploading video:', error);
            throw error;
        }
    }
}

class UserAPI {
    /**
     * Get all users
     */
    static async getAllUsers() {
        try {
            const response = await fetch(`${API_BASE_URL}/users`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

    /**
     * Get user/channel by ID
     */
    static async getUserById(userId) {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error(`Error fetching user ${userId}:`, error);
            throw error;
        }
    }

    /**
     * Register a new user
     */
    static async registerUser(username, email) {
        try {
            const response = await fetch(`${API_BASE_URL}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                }),
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VideoAPI, UserAPI };
}
