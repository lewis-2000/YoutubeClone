# Youtube Clone

## Data Structures Usage

## Group members
- 

The phrase "data structures" is not written explicitly in the code, but these structures are used throughout the project:

- Arrays and objects for frontend video data: `app.js` (`videoData` object with arrays for `Home`, `Shorts`, `Subscriptions`, `Library`, `History`)
- Array operations in UI logic: `app.js` (`Object.values(...).flat().filter(...)`, `forEach(...)`)
- Object plus arrays for watch page data: `watch.js` (`mockVideo` object, `mockComments` array, `recommendedVideos` array)
- In-memory array database for videos: `server/models/mockDb.js` (`mockVideos` array, `.push(...)`, `.filter(...)`)
- In-memory array database for users: `server/models/mockUsersDb.js` (`mockUsers` array, `.push(...)`, `.find(...)`, `Object.assign(...)`)
- Array used in server config: `server/server.js` (`allowed` array for CORS origins)
- Relational table schema (structured data): `server/store/videoTable.sql` (`videos` table columns and types)

## What This Project Does

This project is a YouTube-style web app prototype with a frontend and a lightweight backend.

- Frontend pages render video feeds, a watch page, comments, and recommended videos.
- Navigation supports Home, Shorts, Subscriptions, Library, and History-style sections.
- The backend exposes routes/controllers for video and user data.
- Mock model files simulate database behavior for development and testing.
- A SQL schema is included for storing video records in a real database setup.

### Structure Notes (What and Why)

- `app.js`: Uses a nested object (`videoData`) with arrays per section so tab-based rendering can read `videoData[tabName]` directly. This keeps UI state simple and predictable.
- `watch.js`: Uses one object for the current video and arrays for comments/recommendations. This mirrors the page layout (single primary item + repeating lists).
- `server/models/mockDb.js`: Uses an array (`mockVideos`) as an in-memory store and applies `.filter(...)` for category queries. This is lightweight for mock/testing data before full DB use.
- `server/models/mockUsersDb.js`: Uses an array (`mockUsers`) with `.find(...)` and `Object.assign(...)` for lookup/update behavior similar to CRUD operations.
- `server/server.js`: Uses an array of allowed origins for CORS checks. Arrays are an easy structure for maintaining a small whitelist.
- `server/store/videoTable.sql`: Uses a relational table schema to persist structured video records (`id`, `title`, `description`, `filename`, `uploadDate`) with typed columns.
