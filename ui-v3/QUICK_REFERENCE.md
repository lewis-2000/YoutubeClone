# UI v3 Quick Reference

## Getting Started in 30 Seconds

1. Start your backend server:
   ```bash
   npm install
   npm start
   ```

2. Open the UI:
   - Navigate to `http://localhost:3000/ui-v3/`
   - Or directly open `/ui-v3/index.html` in your browser

3. Enjoy! The UI will automatically fetch videos from the backend.

## Key Components

### Navbar
- **Logo**: Click to go home
- **Search**: Type to find videos in real-time
- **Notifications Bell**: Shows notification count
- **Theme Toggle**: Switch between light/dark modes
- **Avatar**: User profile (customize with your image)

### Sidebar
- **Navigation Items**: Home, Trending, Subscriptions, Library, History, Likes
- **Mobile**: Hidden by default, toggle with hamburger menu
- **Active State**: Blue highlight on current tab

### Video Cards
- **Hover Effect**: Card lifts up with shadow
- **Actions**:
  - **Play**: Opens notification (can be linked to watch page)
  - **Like**: Toggles like state with visual feedback
  - **Share**: Copies link to clipboard

### Filter Bar
- Quick filter buttons for content categories
- Horizontal scroll on mobile devices

## Common Customizations

### Change Color Scheme

In `css/main.css`, modify the `:root` variables:

```css
:root {
    --primary: #ff6b6b;        /* Change primary color */
    --secondary: #4ecdc4;      /* Change secondary */
}
```

### Adjust Grid Size

More/fewer columns:
```css
.video-grid {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
}
```

### Change Font

```css
body {
    font-family: 'Georgia', serif;  /* Replace default font */
}
```

### Modify Animation Speed

```css
:root {
    --transition: all 0.5s ease;  /* Slower transitions */
}
```

## Troubleshooting

### Videos Not Loading?

**Problem**: Empty grid, loading spinner stuck
**Solution**:
1. Check backend is running: `npm start`
2. Verify API URL in `js/app.js`: `http://localhost:3000/api`
3. Check browser console for errors (F12)
4. Ensure mock routes are set up in backend

### Images Not Showing?

**Problem**: Image placeholders instead of thumbnails
**Solution**:
1. Verify image paths: `./assets/images/1.jpg`, etc.
2. Check file exists in `/assets/images/` folder
3. Fallback to default: `./assets/images/1.jpg`
4. Clear browser cache (Ctrl+Shift+Delete)

### Search Not Working?

**Problem**: Search input exists but doesn't filter videos
**Solution**:
1. Check JavaScript console for errors
2. Ensure HTML `id="search-input"` matches JavaScript selector
3. Verify videos are loaded first (check `allVideos` array in console)

### Theme Not Persisting?

**Problem**: Dark mode resets on refresh
**Solution**:
1. Check localStorage is enabled (not in incognito mode)
2. Verify theme is being saved: `localStorage.getItem('theme')`
3. Clear localStorage and reload: Open DevTools > Application > Storage > Clear All

### Mobile Sidebar Not Closing?

**Problem**: Sidebar stuck open
**Solution**:
1. Click overlay to close
2. Check window resize event listeners
3. Verify CSS media queries are correct

## API Response Examples

### Get Home Videos
```
GET http://localhost:3000/api/mock/home
Response: [
  {
    id: 1,
    title: "Building a Game Engine",
    channel: "SolsticeMara",
    thumbnail: "./assets/images/1.jpg",
    avatar: "./assets/images/2.jpg",
    views: "12K views",
    uploaded: "2 days ago"
  },
  ...
]
```

## Performance Tips

1. **Optimize Images**: Use compression for thumbnails
2. **Lazy Load**: Add `loading="lazy"` to images (modern browsers)
3. **Limit Grid**: Use pagination for 100+ videos
4. **Cache Data**: Implement service worker for offline support

## Keyboard Shortcuts (Ready to Implement)

```javascript
// Add to app.js to enable keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
});
```

## File Size Reference

- `index.html`: ~4KB
- `css/main.css`: ~12KB
- `js/app.js`: ~8KB
- **Total**: ~24KB (uncompressed)

## Browser DevTools Tips

1. **Inspect Videos**:
   ```javascript
   console.log(allVideos);  // See loaded videos
   console.log(filteredVideos);  // See filtered results
   ```

2. **Toggle Theme**:
   ```javascript
   document.documentElement.setAttribute('data-theme', 'dark');
   ```

3. **Reload Videos**:
   ```javascript
   loadVideos('Home');
   ```

## Advanced: Adding New Tabs

1. Add sidebar item in HTML:
   ```html
   <button class="sidebar-item" data-tab="MyTab">
       <svg>...</svg>
       <span>My Tab</span>
   </button>
   ```

2. Add API endpoint map in `js/app.js`:
   ```javascript
   const endpointMap = {
       'MyTab': 'api/my-endpoint',
   };
   ```

3. Ensure backend has the endpoint

## Advanced: Custom Video Actions

Replace video action handlers in `createVideoCard()`:

```javascript
playBtn.addEventListener('click', () => {
    // Navigate to watch page
    window.location.href = `/pages/watch.html?id=${video.id}`;
});
```

## CSS Class Reference

- `.navbar` - Top navigation bar
- `.sidebar` - Left sidebar navigation
- `.video-grid` - Main video grid container
- `.video-card` - Individual video card
- `.filter-bar` - Category filter buttons
- `.loading` - Loading spinner container
- `.empty-state` - No results message

## Variables & Constants

- `API_BASE_URL` - Backend API base URL
- `currentTab` - Currently active tab
- `allVideos` - All fetched videos
- `filteredVideos` - Search/filter results

## Testing Checklist

- [ ] Videos load on page open
- [ ] Tab switching works
- [ ] Search filters videos
- [ ] Theme toggle works
- [ ] Mobile sidebar toggles
- [ ] Images load or fallback gracefully
- [ ] No console errors
- [ ] LocalStorage persists theme
- [ ] Responsive on 320px, 768px, 1080px widths
