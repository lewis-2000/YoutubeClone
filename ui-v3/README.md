# StreamHub - UI v3

A modern, minimalist video platform UI built with vanilla JavaScript, CSS3, and HTML5. Designed with a card-based layout and contemporary design patterns.
@@britondalisay-a11y
## Group Members
1. Briton Musembi
2. John Hunja
3. Dianah Mwendia
4. Suheila Mohamed
5. 

## Features

### Design Highlights
- **Modern Card Layout**: Clean, organized video cards with smooth hover effects
- **Dark Mode Support**: Built-in theme toggle with system preference detection
- **Responsive Design**: Fully responsive from mobile (320px) to desktop (1920px+)
- **Smooth Animations**: Subtle transitions and animations throughout
- **Accessibility**: Semantic HTML and keyboard-friendly navigation

### Functionality
- **Tab Navigation**: Home, Trending, Subscriptions, Library, History, Likes
- **Search**: Real-time search across video titles and channels
- **Filter System**: Quick category filtering (All, Music, Gaming, Tech, Education)
- **Notifications**: Non-intrusive notification system
- **Mobile-First**: Hamburger menu and optimized mobile layout
- **Theme Toggle**: Light/Dark mode with localStorage persistence

## File Structure

```
ui-v3/
├── index.html          # Main HTML structure
├── css/
│   └── main.css       # All styling (no external dependencies)
└── js/
    └── app.js         # JavaScript logic and API integration
```

## How to Use

1. **Open the UI**:
   - In your browser, navigate to `http://localhost:3000/ui-v3/` (after starting the server)
   - Or open `index.html` directly in your browser

2. **Navigation**:
   - Use sidebar items (Desktop) or hamburger menu (Mobile) to switch between tabs
   - Search for videos using the search bar
   - Apply filters using the filter buttons

3. **Theme**:
   - Click the sun/moon icon in the navbar to toggle between light and dark modes
   - Your preference is saved locally

## API Integration

The UI connects to the backend API at `http://localhost:3000/api`. It supports the following endpoints:

- `/api/mock/home` - Home feed videos
- `/api/mock/trending` - Trending videos
- `/api/mock/subscriptions` - Subscription feed
- `/api/mock/library` - Saved videos
- `/api/mock/history` - Watch history
- `/api/mock/likes` - Liked videos

### Expected Video Object Structure

```javascript
{
  id: number,
  title: string,
  channel: string,
  thumbnail: string (URL),
  avatar: string (URL),
  views: string (e.g., "12K views"),
  uploaded: string (e.g., "2 days ago"),
  category: string (optional)
}
```

## Customization

### Colors & Theme Variables

Edit the CSS variables in `css/main.css`:

```css
:root {
    --primary: #6366f1;           /* Main brand color */
    --secondary: #ec4899;         /* Accent color */
    --accent: #f59e0b;            /* Alt accent color */
    --background: #f9fafb;        /* Page background */
    --surface: #ffffff;           /* Card background */
    --text-primary: #1f2937;      /* Main text color */
    --text-secondary: #6b7280;    /* Secondary text color */
    --border: #e5e7eb;            /* Border color */
}
```

### Layout Grid

Modify the grid columns in `css/main.css`:

```css
.video-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
}
```

## Mobile Responsiveness

- **Desktop (>768px)**: Sidebar always visible, full layout
- **Tablet (480px-768px)**: Hamburger menu, adapted grid
- **Mobile (<480px)**: Single column layout, optimized touch targets

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

## Performance

- Zero external dependencies (no libraries)
- CSS animations use GPU acceleration
- Lazy loading support for images
- Optimized scrolling performance

## Keyboard Navigation

- `Tab` - Navigate through interactive elements
- `Enter` - Activate buttons (sidebar items, filters)
- `Escape` - Close mobile sidebar
- `Ctrl/Cmd + K` - Focus search (with proper event handling)

## Future Enhancements

- [ ] Video player integration
- [ ] Comments section
- [ ] User authentication
- [ ] Playlist support
- [ ] Advanced filtering
- [ ] Video recommendations
- [ ] Watch progress tracking

## Notes

- Images default to `./assets/images/` folder
- Fallback images are provided via `onerror` handlers
- Notifications auto-dismiss after 3 seconds
- Search is case-insensitive and real-time
- Local storage used for theme preference

## Contact & Support

Built as an alternative frontend for the YouTube Clone project using the same backend API.
