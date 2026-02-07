const videoData = {
  Home: [
    {
      id: 1,
      title: "Building a Game Engine with Vulkan",
      channel: "SolsticeMara",
      views: "12K views",
      uploaded: "2 days ago",
      thumbnail: "./assets/images/1.jpg",
    },
    {
      id: 2,
      title: "Express.js Crash Course",
      channel: "Dev Simplified",
      views: "98K views",
      uploaded: "1 week ago",
      thumbnail: "./assets/images/2.jpg",
    },
  ],
  Shorts: [
    {
      id: 3,
      title: "Why Vulkan Forces Better Architecture",
      channel: "Low Level Graphics",
      views: "34K views",
      uploaded: "3 days ago",
      thumbnail: "./assets/images/3.jpg",
    },
  ],
  Subscriptions: [
    {
      id: 4,
      title: "Understanding ECS the Right Way",
      channel: "Engine Talk",
      views: "67K views",
      uploaded: "5 days ago",
      thumbnail: "./assets/images/4.jpg",
    },
  ],
  Library: [
    {
      id: 5,
      title: "C++ Memory Management Explained",
      channel: "CodeCraft",
      views: "21K views",
      uploaded: "4 days ago",
      thumbnail: "./assets/images/5.jpg",
    },
  ],
  History: [
    {
      id: 6,
      title: "Intro to Vulkan Shaders",
      channel: "Graphics Deep Dive",
      views: "8K views",
      uploaded: "6 days ago",
      thumbnail: "./assets/images/6.jpg",
    },
  ],
};

// Tab switching logic
const sidebarItems = document.querySelectorAll(".sidebar-item");

sidebarItems.forEach((item) => {
  item.addEventListener("click", () => {
    // Remove active class from all
    sidebarItems.forEach((i) => i.classList.remove("active"));
    // Add active class to clicked one
    item.classList.add("active");

    // Get tab name
    const tabName = item.textContent.trim();

    // Render videos for this tab
    if (videoData[tabName]) {
      renderVideos(videoData[tabName]);
    } else {
      videoGrid.innerHTML = "<p>No videos available for this tab.</p>";
    }
  });
});

// Mobile Sidebar Switching Logic
const mobileSidebar = document.querySelector(".mobile-sidebar");
const menuBtn = document.querySelector(".menu-btn");
const mobileItems = document.querySelectorAll(".mobile-item");
const subItems = document.querySelectorAll(".sub-item");
const layout = document.querySelector(".layout");

menuBtn.addEventListener("click", () => {
  console.log("Menu button clicked");
  mobileSidebar.classList.toggle("open");

  // Optional: Close sidebar when clicking outside
  if (mobileSidebar.classList.contains("open")) {
    document.addEventListener("click", outsideClickListener);
  } else {
    document.removeEventListener("click", outsideClickListener);
  }
});

function outsideClickListener(event) {
  if (
    !mobileSidebar.contains(event.target) &&
    !menuBtn.contains(event.target)
  ) {
    mobileSidebar.classList.remove("open");
    document.removeEventListener("click", outsideClickListener);
  }
}

// Tab switching
mobileItems.forEach((item) => {
  item.addEventListener("click", () => {
    mobileItems.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");

    const tabName = item.textContent.trim();
    if (videoData[tabName]) {
      renderVideos(videoData[tabName]);
    } else {
      videoGrid.innerHTML = "<p>No videos available for this tab.</p>";
    }

    mobileSidebar.classList.remove("open"); // close after selection
  });
});

// Subscriptions filtering
subItems.forEach((sub) => {
  sub.addEventListener("click", () => {
    const channelName = sub.querySelector("span").textContent.trim();
    const filtered = Object.values(videoData)
      .flat()
      .filter((v) => v.channel === channelName);
    renderVideos(filtered.length ? filtered : []);
    mobileSidebar.classList.remove("open");
  });
});

// Subscriptions scrollable list (optional: filter by channel)
subItems.forEach((sub) => {
  sub.addEventListener("click", () => {
    const channelName = sub.textContent.trim();

    // Filter videos by channel
    const filtered = Object.values(videoData)
      .flat()
      .filter((v) => v.channel === channelName);

    renderVideos(filtered.length ? filtered : []);
  });
});

// Video rendering logic
const videoGrid = document.getElementById("video-grid");

function renderVideos(videos) {
  videoGrid.innerHTML = "";

  videos.forEach((video) => {
    const card = document.createElement("div");
    card.className = "video-card";

    card.innerHTML = `
      <div class="thumbnail">
        <img src="${video.thumbnail}" alt="${video.title}" />
      </div>

      <div class="video-info">
        <div class="channel-avatar"></div>
        <div class="video-text">
          <h4>${video.title}</h4>
          <p>${video.channel}</p>
          <p>${video.views} • ${video.uploaded}</p>
        </div>
      </div>
    `;

    card.addEventListener("click", () => {
      console.log("Clicked video:", video.id);
      Later: window.location.href = `/pages/watch.html?v=${video.id}`;
    });

    videoGrid.appendChild(card);
  });
}

// Initial render
renderVideos(videoData.Home);
