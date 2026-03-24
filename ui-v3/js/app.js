// ==================== API CONFIGURATION ====================
const API_BASE_URL = 'http://localhost:3000/api';

// ==================== DOM ELEMENTS ====================
const videoGrid = document.getElementById('video-grid');
const loadingSpinner = document.getElementById('loading');
const emptyState = document.getElementById('empty-state');
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.querySelector('.sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const searchInput = document.getElementById('search-input');
const sidebarItems = document.querySelectorAll('.sidebar-item');
const filterBtns = document.querySelectorAll('.filter-btn');
const themeToggle = document.querySelector('.theme-toggle');

// ==================== STATE ====================
let currentTab = 'Home';
let allVideos = [];
let filteredVideos = [];

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    loadVideos('Home');
    loadThemePreference();
});

// ==================== EVENT LISTENERS ====================
function initializeEventListeners() {
    // Sidebar toggle
    menuToggle.addEventListener('click', toggleSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);

    // Sidebar items
    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            const tab = item.getAttribute('data-tab');
            switchTab(tab);
        });
    });

    // Search
    searchInput.addEventListener('input', handleSearch);

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
}

// ==================== SIDEBAR FUNCTIONS ====================
function toggleSidebar() {
    sidebar.classList.toggle('open');
    sidebarOverlay.classList.toggle('active');
}

function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
}

// ==================== TAB SWITCHING ====================
function switchTab(tab) {
    if (currentTab === tab) return;

    currentTab = tab;

    // Update active state
    sidebarItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-tab') === tab) {
            item.classList.add('active');
        }
    });

    // Close sidebar on mobile
    if (window.innerWidth <= 768) {
        closeSidebar();
    }

    // Load videos
    loadVideos(tab);
}

// ==================== API FUNCTIONS ====================
async function loadVideos(tab) {
    try {
        showLoading(true);
        
        // Map tab names to API endpoints
        const endpointMap = {
            'Home': 'mock/home',
            'Trending': 'mock/trending',
            'Subscriptions': 'mock/subscriptions',
            'Library': 'mock/library',
            'History': 'mock/history',
            'Likes': 'mock/likes'
        };

        const endpoint = endpointMap[tab] || 'mock/home';
        const url = `${API_BASE_URL}/${endpoint}`;
        
        console.log(`Loading videos from: ${url}`);
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log(`Loaded ${data.length} videos for ${tab}`, data);
        
        allVideos = Array.isArray(data) ? data : [];
        filteredVideos = [...allVideos];
        renderVideos();
    } catch (error) {
        console.error(`Error loading ${tab} videos:`, error);
        console.error(`Full error details:`, {
            message: error.message,
            stack: error.stack,
            tab: tab
        });
        
        // Show error message
        showLoading(false);
        showEmptyState(true);
        
        // Update error message if elements exist
        const emptyH3 = emptyState.querySelector('h3');
        const emptyP = emptyState.querySelector('p');
        
        if (emptyH3) emptyH3.innerText = 'Unable to load videos';
        if (emptyP) emptyP.innerText = `Error: ${error.message}. Make sure the backend server is running at ${API_BASE_URL}`;
    }
}

// ==================== RENDER FUNCTIONS ====================
function renderVideos() {
    videoGrid.innerHTML = '';
    showLoading(false);
    showEmptyState(false);

    if (filteredVideos.length === 0) {
        showEmptyState(true);
        return;
    }

    filteredVideos.forEach(video => {
        const videoCard = createVideoCard(video);
        videoGrid.appendChild(videoCard);
    });
}

function createVideoCard(video) {
    const card = document.createElement('div');
    card.className = 'video-card';

    // Ensure video data is valid
    if (!video || typeof video !== 'object') {
        return card;
    }

    const playSvg = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
        </svg>
    `;

    const likeSvg = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
    `;

    const shareSvg = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
        </svg>
    `;

    // Extract data with fallbacks
    const title = video.title || 'Untitled Video';
    const channel = video.channel || 'Unknown Channel';
    const thumbnail = video.thumbnail || '/assets/images/1.jpg';
    const avatar = video.avatar || '/assets/images/2.jpg';
    const views = video.views || '0 views';
    const uploaded = video.uploaded || 'Recently';

    card.innerHTML = `
        <img src="${sanitizeAttr(thumbnail)}" 
             alt="${sanitizeAttr(title)}" 
             class="video-thumbnail"
             onerror="this.src='../assets/images/1.jpg'">
        <div class="video-content">
            <div class="video-header">
                <img src="${sanitizeAttr(avatar)}" 
                     alt="${sanitizeAttr(channel)}" 
                     class="video-avatar"
                     onerror="this.src='../assets/images/2.jpg'">
                <div class="video-info">
                    <div class="video-title">${sanitizeText(title)}</div>
                    <div class="video-channel">${sanitizeText(channel)}</div>
                    <div class="video-stats">
                        <span>${sanitizeText(views)}</span>
                        <span>${sanitizeText(uploaded)}</span>
                    </div>
                </div>
            </div>
            <div class="video-actions">
                <button class="video-action-btn" title="Play">
                    ${playSvg}
                    <span>Play</span>
                </button>
                <button class="video-action-btn" title="Like">
                    ${likeSvg}
                    <span>Like</span>
                </button>
                <button class="video-action-btn" title="Share">
                    ${shareSvg}
                </button>
            </div>
        </div>
    `;

    // Add click handler for the entire card
    card.querySelector('.video-thumbnail').addEventListener('click', () => {
        handleVideoClick(video);
    });

    // Add action button handlers
    const playBtn = card.querySelector('.video-action-btn:nth-child(1)');
    const likeBtn = card.querySelector('.video-action-btn:nth-child(2)');
    const shareBtn = card.querySelector('.video-action-btn:nth-child(3)');

    playBtn.addEventListener('click', () => handleVideoClick(video));
    likeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        likeBtn.style.backgroundColor = 'rgba(236, 72, 153, 0.1)';
        likeBtn.style.color = '#ec4899';
    });
    shareBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showNotification('Video link copied to clipboard!');
    });

    return card;
}

// ==================== SEARCH & FILTER ====================
function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();

    if (query === '') {
        filteredVideos = [...allVideos];
    } else {
        filteredVideos = allVideos.filter(video => {
            const title = (video.title || '').toLowerCase();
            const channel = (video.channel || '').toLowerCase();
            return title.includes(query) || channel.includes(query);
        });
    }

    renderVideos();
}

// ==================== UTILITY FUNCTIONS ====================
function showLoading(show) {
    if (show) {
        loadingSpinner.classList.add('active');
    } else {
        loadingSpinner.classList.remove('active');
    }
}

function showEmptyState(show) {
    if (show) {
        emptyState.classList.add('active');
    } else {
        emptyState.classList.remove('active');
    }
}

function sanitizeText(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .slice(0, 100);
}

function sanitizeAttr(attr) {
    // Safe string for HTML attributes (like src, alt)
    if (!attr || typeof attr !== 'string') return '';
    return attr.replace(/"/g, '&quot;').replace(/'/g, '&#x27;').slice(0, 500);
}

function handleVideoClick(video) {
    // Simulate video player
    const message = `Playing: ${video.title} by ${video.channel}`;
    showNotification(message);
    console.log('Video clicked:', video);
    
    // You can add navigation to a watch page here
    // window.location.href = `/pages/watch.html?id=${video.id}`;
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background-color: #6366f1;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==================== THEME TOGGLE ====================
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
}

// ==================== ANIMATIONS ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style);

// ==================== RESPONSIVE HANDLING ====================
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && sidebar.classList.contains('open')) {
        closeSidebar();
    }
});
