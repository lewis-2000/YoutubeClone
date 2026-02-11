// models/mockDb.js

let mockVideos = [];

// Helper to generate a random number
const rand = (max) => Math.floor(Math.random() * max) + 1;

// 1. GENERATE TRENDING (HOME) - 15 Videos
for (let i = 1; i <= 15; i++) {
  mockVideos.push({
    id: i,
    title: `Trending Video #${i}: Exploring the Future of Tech`,
    channel: `TechChannel ${i}`,
    views: `${rand(999)}K`,
    uploaded: `${i}h ago`,
    type: "video",
    category: "trending",
    thumbnail: `https://picsum.photos/seed/home${i}/300/170`,
    avatar: `https://i.pravatar.cc/50?u=home${i}`,
  });
}

// 2. GENERATE SUBSCRIPTIONS - 15 Videos
for (let i = 1; i <= 15; i++) {
  mockVideos.push({
    id: i + 15,
    title: `Subscribed Content: Daily Vlog Day ${i + 100}`,
    channel: `Creator ${i}`,
    views: `${rand(50)}K`,
    uploaded: `${i}d ago`,
    type: "video",
    category: "subscription",
    thumbnail: `https://picsum.photos/seed/sub${i}/300/170`,
    avatar: `https://i.pravatar.cc/50?u=sub${i}`,
  });
}

// 3. GENERATE HISTORY (YOU) - 15 Videos
for (let i = 1; i <= 15; i++) {
  mockVideos.push({
    id: i + 30,
    title: `Rewatch: Learning SQL Part ${i}`,
    channel: `Database Academy`,
    views: `${rand(5)}M`,
    uploaded: `${i}mo ago`,
    type: "video",
    category: "history",
    thumbnail: `https://picsum.photos/seed/hist${i}/300/170`,
    avatar: `https://i.pravatar.cc/50?u=hist${i}`,
  });
}

// 4. GENERATE SHORTS - 15 Shorts
for (let i = 1; i <= 15; i++) {
  mockVideos.push({
    id: i + 45,
    title: `Amazing Short #${i}! #shorts`,
    channel: `ShortsMaster`,
    views: `${rand(10)}M`,
    type: "short",
    category: "shorts",
    thumbnail: `https://picsum.photos/seed/short${i}/200/350`, // Taller aspect ratio for shorts
    avatar: `https://i.pravatar.cc/50?u=short${i}`,
  });
}

const mockDb = {
  query: async (sql, params) => {
    const queryStr = sql.toLowerCase();

    // Filtering logic
    if (queryStr.includes("where category = ?")) {
      const filtered = mockVideos.filter((v) => v.category === params[0]);
      return [filtered];
    }

    return [mockVideos]; // Default return all
  },
};

module.exports = mockDb;
