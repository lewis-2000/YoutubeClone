# UI v3 - Design and Data Structures Analysis

## Design Used

The ui-v3 project follows a **modern, minimalist video platform UI design** with the following key principles:

### Frontend Design (ui-v3/)
- **Component-Based Architecture**: Modular HTML structure with CSS classes for reusable components (navbar, sidebar, video cards)
- **Responsive Design**: Mobile-first approach using CSS Grid and Flexbox, with breakpoints for different screen sizes
- **Card-Based Layout**: Video content displayed in uniform cards with hover effects and action buttons
- **Dark/Light Theme System**: CSS custom properties for theming, with localStorage persistence
- **Event-Driven UI**: JavaScript handles user interactions (clicks, searches, theme toggles) with DOM manipulation

### Backend Design (server/)
- **RESTful API**: Express.js routes serving JSON data for different video categories
- **Mock Database Layer**: In-memory data simulation mimicking a real database
- **Middleware Stack**: CORS, JSON parsing, and static file serving
- **Separation of Concerns**: Routes, models, and controllers in separate files

## Data Structures Used

The project primarily uses JavaScript's built-in data structures:

### Arrays
- `allVideos[]` and `filteredVideos[]` in the frontend for storing and manipulating video data
- `mockVideos[]` in the backend for mock data storage
- Used for: video lists, DOM element collections (sidebarItems, filterBtns)

### Objects
- Video objects with properties: `{id, title, channel, views, uploaded, thumbnail, avatar, category}`
- Configuration objects for API endpoints and DOM elements
- JavaScript objects serve as hash tables for key-value storage

### No Custom Data Structure Classes
The project doesn't implement custom data structure classes, relying on JavaScript's native implementations.

## Implementation of Requested Data Structures

### Stack
**Not explicitly implemented** in the codebase. However, stacks are used conceptually:

- **Call Stack**: JavaScript's execution stack for function calls
- **Browser History**: Could be implemented using `history.pushState()` for navigation
- **Event Stack**: DOM event propagation follows a stack-like LIFO pattern

Example of stack usage in the code:
```javascript
// Function call stack when loading videos
loadVideos(tab) → fetch(url) → response.json() → renderVideos()
```

### Hash Table
**Implemented via JavaScript Objects** (which are hash tables internally):

```javascript
// Endpoint mapping - hash table for O(1) lookups
const endpointMap = {
    'Home': 'mock/home',
    'Trending': 'mock/trending',
    'Subscriptions': 'mock/subscriptions',
    'Library': 'mock/library',
    'History': 'mock/history',
    'Likes': 'mock/likes'
};

// Theme storage - localStorage acts as persistent hash table
localStorage.setItem('theme', newTheme);
const savedTheme = localStorage.getItem('theme');
```

### Sorting
**Not explicitly implemented** custom sorting algorithms. Uses JavaScript's built-in array methods:

- **Array.filter()**: For category-based filtering (O(n) time)
- **Array.forEach()**: For iterating and rendering videos
- **String operations**: For search filtering

Example sorting-like operation:
```javascript
// Search filtering (similar to sorting/filtering)
filteredVideos = allVideos.filter(video => {
    const title = (video.title || '').toLowerCase();
    const channel = (video.channel || '').toLowerCase();
    return title.includes(query) || channel.includes(query);
});
```

### Queue
**Not explicitly implemented** custom queue data structure. However, queues are used in:

- **Event Queue**: Browser's event loop for asynchronous operations
- **Promise Queue**: Fetch API requests are queued and processed asynchronously
- **Animation Queue**: CSS transitions and JavaScript animations

Example of queue-like behavior:
```javascript
// Asynchronous API calls (queued by browser)
async function loadVideos(tab) {
    const response = await fetch(url);  // Queued in event loop
    const data = await response.json(); // Processed in order
    renderVideos();                     // UI update queued
}
```

## Summary

The project uses a **client-server architecture** with:
- **Frontend**: Event-driven UI with array/object data manipulation
- **Backend**: REST API with in-memory data storage
- **Data Structures**: Relies on JavaScript's native arrays and objects (hash tables)
- **Algorithms**: Built-in methods for filtering/searching, no custom implementations of stack/queue/sorting

The design prioritizes simplicity and performance for a video platform interface, using modern web technologies without complex custom data structures. If you need implementations of these data structures added to the project, I can help create them!