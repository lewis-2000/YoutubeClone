/**
 * UI Module - Handles DOM rendering and UI updates
 * 
 * This module is responsible for all user interface rendering and DOM manipulation.
 * It converts raw data (video objects) into visual HTML elements that users interact with.
 * 
 * Data Structures Used:
 * - DOM Elements: Created with document.createElement() and inserted into the page
 * - Strings: Template literals for HTML markup (e.g., `<div>${variable}</div>`)
 * - Objects: Video data objects with properties like title, thumbnail, channel, etc.
 * - NodeList: Returned from querySelectorAll() for batch DOM updates
 * - Event Objects: Passed to event listeners containing user interaction data
 * 
 * Design Pattern: Static class with utility methods - no state, pure functions
 */

class UI {
    /**
     * Create and render a video card
     * 
     * Data Flow:
     * 1. Input: video object {title, thumbnail, channel, avatar, views, uploaded}
     * 2. Process: Create DOM element and populate with template literal
     * 3. Output: HTMLElement (DOM node) ready to insert into page
     * 
     * Template Literals Used:
     * ${video.title} - String interpolation
     * ${video.thumbnail || 'fallback'} - Nullish coalescing
     * 
     * @param {Object} video - Video data object with properties
     * @returns {HTMLElement} DOM element representing the video card
     */
    static createVideoCard(video) {
        // Create new div element in memory (not yet in DOM)
        const card = document.createElement('div');
        card.className = 'video-card';
        // Template literal combines HTML structure with video data
        card.innerHTML = `
            <div class="video-thumbnail">
                <img src="${video.thumbnail || 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22%3E%3C/svg%3E'}" 
                     alt="${video.title}" 
                     loading="lazy">
            </div>
            <div class="video-info">
                <div class="channel-avatar">
                    <img src="${video.avatar || 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22%3E%3C/svg%3E'}" 
                         alt="${video.channel}">
                </div>
                <div class="video-details">
                    <h3 class="video-title">${this.escapeHtml(video.title)}</h3>
                    <p class="video-channel">${this.escapeHtml(video.channel)}</p>
                    <p class="video-meta">${this.formatViews(video.views)} • ${video.uploaded || 'Just now'}</p>
                </div>
            </div>
        `;
        return card;
    }

    /**
     * Create and render a short card
     * 
     * Similar to createVideoCard() but optimized for short-form content
     * Simplified structure for horizontal carousel display
     * 
     * Data Structure:
     * Same video object, but rendered with fewer details for mobile-friendly display
     * 
     * @param {Object} video - Video data object
     * @returns {HTMLElement} DOM element for short card
     */
    static createShortCard(video) {
        const card = document.createElement('div');
        card.className = 'short-card';
        card.innerHTML = `
            <img src="${video.thumbnail || 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22%3E%3C/svg%3E'}" 
                 alt="${video.title}" 
                 class="short-thumbnail"
                 loading="lazy">
            <div class="short-overlay">
                <p class="short-title">${this.escapeHtml(video.title)}</p>
            </div>
        `;
        return card;
    }

    /**
     * Render video grid
     * 
     * Data Flow:
     * 1. Input: DOM element (container) and Array of video objects
     * 2. Loop through array using forEach()
     * 3. For each video object, create card element and append to container
     * 4. DOM updates trigger browser reflow/repaint
     * 
     * Data Structure:
     * - container: HTMLElement (parent div with class 'video-grid')
     * - videos: Array of Objects [{...}, {...}, ...]
     * 
     * @param {HTMLElement} container - Target DOM element
     * @param {Array} videos - Array of video objects
     */
    static renderVideoGrid(container, videos) {
        // Clear previous content (remove all child nodes)
        container.innerHTML = '';
        // Check if array is empty
        if (videos.length === 0) {
            container.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <h3>No videos found</h3>
                    <p>Try searching for something different</p>
                </div>
            `;
            return;
        }

        // Iterate through Array of video objects
        videos.forEach(video => {
            // createVideoCard returns HTMLElement, appendChild adds it to container
            container.appendChild(this.createVideoCard(video));
        });
    }

    /**
     * Render shorts container
     * 
     * Renders horizontal carousel of short videos
     * Similar to renderVideoGrid() but uses createShortCard() instead
     * 
     * Data Structure: Array of video objects
     * 
     * @param {HTMLElement} container - Target container element
     * @param {Array} videos - Array of short video objects
     */
    static renderShorts(container, videos) {
        container.innerHTML = '';
        if (videos.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <h3>No shorts available</h3>
                </div>
            `;
            return;
        }

        // Same pattern as renderVideoGrid but for shorts
        videos.forEach(video => {
            container.appendChild(this.createShortCard(video));
        });
    }

    /**
     * Show loading skeleton
     * 
     * Toggles visibility of skeleton loading screen
     * Data Structure: Boolean flag controls display state
     * 
     * @param {Boolean} show - true to display, false to hide
     */
    static showSkeleton(show = true) {
        // Query DOM for skeleton element by ID
        const skeleton = document.getElementById('skeletonLoader');
        // Only update if element exists
        if (skeleton) {
            // Ternary operator: if show is true, set 'block', else 'none'
            skeleton.style.display = show ? 'block' : 'none';
        }
    }

    /**
     * Show error message
     * 
     * Displays error message in two places:
     * 1. Error element in main content area
     * 2. Toast notification for immediate feedback
     * 
     * @param {String} message - Error message text
     */
    static showError(message = 'Failed to load videos. Please try again.') {
        const errorElement = document.getElementById('errorMessage');
        if (errorElement) {
            // Use escapeHtml to prevent XSS attacks
            errorElement.innerHTML = `<p>${this.escapeHtml(message)}</p>`;
            errorElement.style.display = 'block';
        }
        // Also show temporary toast notification
        this.showToast(message, 'error');
    }

    /**
     * Hide error message
     */
    static hideError() {
        const errorElement = document.getElementById('errorMessage');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    /**
     * Show toast notification
     * 
     * Creates temporary notification that auto-removes after 3 seconds
     * Data Structure:
     * - toast: HTMLElement (div created in memory)
     * - Timeout ID: returned by setTimeout (manages auto-removal)
     * 
     * @param {String} message - Notification text
     * @param {String} type - CSS class type (info, error, success)
     */
    static showToast(message, type = 'info') {
        // Create in-memory element
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        // Use textContent instead of innerHTML for security
        toast.textContent = message;
        // Insert into DOM at end of body
        document.body.appendChild(toast);

        // Schedule element removal after 3000ms
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    /**
     * Toggle sidebar on mobile
     */
    static toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.toggle('open');
        }
    }

    /**
     * Close sidebar on mobile
     */
    static closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.remove('open');
        }
    }

    /**
     * Format view count
     * 
     * Converts numeric view count to human-readable format
     * Example: 1500000 -> "1.5M views"
     * 
     * Data Processing:
     * - Input: Number (views)
     * - Output: formatted String
     * - Uses Number methods: toFixed() for decimal places
     * 
     * @param {Number|String} views - View count
     * @returns {String} Formatted view string
     */
    static formatViews(views) {
        // If already a string, return as-is
        if (typeof views === 'string') {
            return views;
        }
        // Convert millions (1,000,000+)
        if (views >= 1000000) {
            return `${(views / 1000000).toFixed(1)}M views`;
        }
        // Convert thousands (1,000+)
        if (views >= 1000) {
            return `${(views / 1000).toFixed(1)}K views`;
        }
        // Return raw number
        return `${views} views`;
    }

    /**
     * Escape HTML to prevent XSS attacks
     * 
     * Security measure: Converts special characters to HTML entities
     * Example: "<script>" -> "&lt;script&gt;"
     * 
     * Method: Uses browser's built-in HTML encoding via textContent/innerHTML
     * 
     * @param {String} text - Untrusted user input
     * @returns {String} Safe HTML string
     */
    static escapeHtml(text) {
        // Create temporary element
        const div = document.createElement('div');
        // textContent automatically escapes special characters
        div.textContent = text;
        // innerHTML returns the escaped version
        return div.innerHTML;
    }

    /**
     * Show/hide container with fade effect
     */
    static showContainer(selector) {
        const containers = document.querySelectorAll(
            '#videoGrid, #shortsContainer'
        );
        containers.forEach(container => {
            container.style.display = 'none';
        });

        const target = document.querySelector(selector);
        if (target) {
            target.style.display = 'grid';
        }
    }

    /**
     * Update active nav item
     */
    static setActiveNav(page) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.page === page) {
                item.classList.add('active');
                item.setAttribute('aria-current', 'page');
            } else {
                item.removeAttribute('aria-current');
            }
        });
    }
}
