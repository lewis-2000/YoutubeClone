/**
 * App Module - Main application logic and controller
 * 
 * This is the central coordinator that:
 * 1. Manages application state (current page)
 * 2. Handles user interactions (click, search, navigation)
 * 3. Orchestrates data flow from API to UI
 * 
 * Data Structures Used:
 * - Object: App instance stores state properties (currentPage)
 * - String: Page names ('home', 'shorts', 'subscriptions', 'library')
 * - Event Listeners: Functions bound to DOM elements
 * - Closures: Inner functions capturing outer scope
 * - Promises: From async API calls
 * 
 * Design Pattern: MVC-style controller with Singleton pattern
 */

class App {
    /**
     * Constructor - Initialize application
     * Data Structures:
     * - this.currentPage: String tracking active page
     * - this.init(): Method call to initialize
     */
    constructor() {
        this.currentPage = 'home';
        this.init();
    }

    /**
     * Initialize application - called once on startup
     * Sets up event listeners and loads initial page
     */
    init() {
        this.setupEventListeners();
        this.loadPage('home');
    }

    /**
     * Setup all event listeners
     * Data Structures:
     * - NodeList: From querySelectorAll()
     * - Event Object: Passed to handlers
     * - Closure: handleSearch captures outer variables
     */
    setupEventListeners() {
        // ========== NAVIGATION ITEMS ==========
        // NodeList from querySelectorAll returns array-like object
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                // Data attribute: data-page="home" accessed via dataset.page
                const page = e.currentTarget.dataset.page;
                this.loadPage(page);
                UI.closeSidebar();
            });
        });

        // ========== MENU TOGGLE (Mobile) ==========
        document.getElementById('menuToggle').addEventListener('click', () => {
            UI.toggleSidebar();
        });

        // ========== SEARCH FUNCTIONALITY ==========
        // HTMLElement references for reuse
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');

        // Closure: captures searchInput, searchBtn, and this
        const handleSearch = () => {
            const query = searchInput.value.trim();
            if (query) {
                this.search(query);
            }
        };

        searchBtn.addEventListener('click', handleSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });

        // ========== CLOSE SIDEBAR ON OUTSIDE CLICK ==========
        document.addEventListener('click', (e) => {
            const sidebar = document.getElementById('sidebar');
            const menuToggle = document.getElementById('menuToggle');
            // contains() checks if element is descendant
            if (
                sidebar &&
                !sidebar.contains(e.target) &&
                !menuToggle.contains(e.target)
            ) {
                UI.closeSidebar();
            }
        });

        // ========== NOTIFICATION BUTTON ==========
        document.getElementById('notificationBtn').addEventListener('click', () => {
            UI.showToast('No new notifications', 'info');
        });

        // ========== PROFILE BUTTON ==========
        document.getElementById('profileBtn').addEventListener('click', () => {
            UI.showToast('Profile feature coming soon', 'info');
        });
    }


    /**
     * Load page content
     * 
     * Async function manages entire page load flow:
     * 1. Update state
     * 2. Show loading
     * 3. Fetch from API (Promise)
     * 4. Render data
     * 5. Hide loading
     * 
     * Data Flow:
     * String (page name) -> Promise (API call) -> Array (videos) -> DOM (rendered)
     * 
     * @param {String} page Page name: 'home', 'shorts', 'subscriptions', 'library'
     */
    async loadPage(page) {
        // Update state - String variable
        this.currentPage = page;
        UI.setActiveNav(page);
        UI.showSkeleton(true);
        UI.hideError();

        try {
            let videos = [];

            // Switch statement with Array results from different API calls
            switch (page) {
                case 'home':
                    // Await Promise - waits for Array response
                    videos = await VideoAPI.getHomeVideos();
                    UI.showContainer('#videoGrid');
                    // Render Array into HTML grid
                    UI.renderVideoGrid(document.getElementById('videoGrid'), videos);
                    break;

                case 'shorts':
                    videos = await VideoAPI.getShorts();
                    UI.showContainer('#shortsContainer');
                    // Different render for carousel layout
                    UI.renderShorts(document.getElementById('shortsContainer'), videos);
                    break;

                case 'subscriptions':
                    videos = await VideoAPI.getSubscriptionVideos();
                    UI.showContainer('#videoGrid');
                    UI.renderVideoGrid(document.getElementById('videoGrid'), videos);
                    break;

                case 'library':
                    videos = await VideoAPI.getLibraryVideos();
                    UI.showContainer('#videoGrid');
                    UI.renderVideoGrid(document.getElementById('videoGrid'), videos);
                    break;

                default:
                    console.warn(`Unknown page: ${page}`);
            }

            // Attach click handlers to newly rendered video cards
            this.attachVideoClickHandlers();

            // Hide loading skeleton with 500ms delay
            setTimeout(() => {
                UI.showSkeleton(false);
            }, 500);

        } catch (error) {
            // Handle API errors, network failures
            console.error(`Error loading ${page} page:`, error);
            UI.showError(`Failed to load ${page}. Check if server is running.`);
            UI.showSkeleton(false);
        }
    }


    /**
     * Search videos
     * 
     * Data Structures & Operations:
     * - allVideos: Array from API
     * - Array.filter(): creates new Array with matching items
     * - String.toLowerCase(): for case-insensitive search
     * - String.includes(): checks substring existence
     * 
     * Example filter:
     * allVideos = [{title: "JavaScript"}, {title: "Python"}]
     * filtered = allVideos.filter(v => v.title.toLowerCase().includes("java"))
     * Result: [{title: "JavaScript"}]
     * 
     * @param {String} query Search term from user
     */
    async search(query) {
        UI.showSkeleton(true);
        UI.hideError();

        try {
            // Fetch Array of all videos from database
            const allVideos = await VideoAPI.getAllVideos();
            
            // Array.filter() returns new Array with matching items only
            // Checks title and channel against search query
            const filtered = allVideos.filter(video =>
                video.title.toLowerCase().includes(query.toLowerCase()) ||
                video.channel.toLowerCase().includes(query.toLowerCase())
            );

            UI.showContainer('#videoGrid');
            // Render filtered Array of videos
            UI.renderVideoGrid(document.getElementById('videoGrid'), filtered);
            this.attachVideoClickHandlers();

            // User feedback if no results
            if (filtered.length === 0) {
                UI.showToast('No results found for: ' + query, 'info');
            }

            UI.showSkeleton(false);
        } catch (error) {
            console.error('Search error:', error);
            UI.showError('Search failed. Please try again.');
            UI.showSkeleton(false);
        }
    }


    /**
     * Attach click handlers to video cards
     * 
     * Data Structures:
     * - NodeList: From querySelectorAll() - array-like
     * - HTMLElement: Individual card elements
     * - Event Object: Passed to click handler
     */
    attachVideoClickHandlers() {
        // Get all video cards - returns NodeList (array-like structure)
        // querySelectorAll syntax: '.class' for class, '#id' for id, selector1, selector2
        const videoCards = document.querySelectorAll('.video-card, .short-card');
        
        // forEach works on NodeList like on Array
        videoCards.forEach(card => {
            card.addEventListener('click', () => {
                // querySelector finds first matching element
                // ?. optional chaining: returns undefined if not found
                const title = card.querySelector('.video-title, .short-title')?.textContent || 'Video';
                
                // Show temporary notification with truncated title
                UI.showToast('Playing: ' + title.substring(0, 30), 'info');
                // In real app: navigate to video player page
            });
        });
    }
}

/**
 * DOM Ready Event
 * 
 * Waits for HTML to fully parse before running JavaScript
 * Critical: ensures all DOM elements exist before querying
 * 
 * Event: DOMContentLoaded (native browser event)
 * Creates: Single App instance (Singleton pattern)
 */
// Initialize when page fully loads
document.addEventListener('DOMContentLoaded', () => {
    // Create single App instance
    // Constructor calls init() automatically
    new App();
    
    // Console logging for debugging
    console.log('YouTube Clone UI v2 - Ready');
    console.log('Server: http://localhost:3000');
});
