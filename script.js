document.addEventListener("DOMContentLoaded", () => {
  // =========================================
  // 1. MODAL MANAGER (Handles all popups)
  // =========================================
  const modalMap = {
    "edit-profile-btn": "profile-modal",
    "nav-messages": "messages-modal",
    "nav-saved": "saved-modal",
    "nav-settings": "settings-modal",
  };

  // Open Modals
  Object.keys(modalMap).forEach((triggerID) => {
    const trigger = document.getElementById(triggerID);
    const modal = document.getElementById(modalMap[triggerID]);

    if (trigger && modal) {
      trigger.addEventListener("click", () => {
        // Special logic for Profile Edit (Pre-fill inputs)
        if (triggerID === "edit-profile-btn") {
          const currentName = document.getElementById("profile-name").innerText;
          const currentBio = document.getElementById("profile-bio").innerText;

          document.getElementById("edit-name").value = currentName;
          document.getElementById("edit-bio").value = currentBio;
        }
        modal.style.display = "flex";
      });
    }
  });

  // Close Modals (X button & Click Outside)
  document.querySelectorAll(".modal-overlay").forEach((modal) => {
    // Close on 'X' button
    const closeBtn = modal.querySelector(".close-modal");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
      });
    }

    // Close on background click
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.style.display = "none";
    });
  });

  // =========================================
  // 2. PROFILE SAVE LOGIC
  // =========================================
  const saveBtn = document.getElementById("save-profile-btn");

  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      const nameInput = document.getElementById("edit-name");
      const bioInput = document.getElementById("edit-bio");
      const profileName = document.getElementById("profile-name");
      const profileBio = document.getElementById("profile-bio");
      const modal = document.getElementById("profile-modal");

      if (nameInput.value.trim() !== "") {
        // Update Sidebar Profile
        profileName.innerText = nameInput.value;
        profileBio.innerText = bioInput.value;

        // Update Name on Existing Posts (Visual consistency)
        document.querySelectorAll(".post-author").forEach((el) => {
          if (el.innerText === "Alex Dev") el.innerText = nameInput.value;
        });

        modal.style.display = "none";
      }
    });
  }

  // =========================================
  // 3. CREATE POST LOGIC
  // =========================================
  const postBtn = document.getElementById("post-btn");
  const postInput = document.getElementById("post-input");
  const feedContainer = document.getElementById("feed-container");

  if (postBtn) {
    postBtn.addEventListener("click", () => {
      const text = postInput.value.trim();
      const currentName = document.getElementById("profile-name").innerText;

      if (!text) return;

      // Create new post HTML
      const newPost = document.createElement("article");
      newPost.className = "card post-card";

      // Uses your local avatar
      newPost.innerHTML = `
                <header class="post-header">
                  <img src="assets/avatar.png" class="avatar-small" />
                  <div class="post-meta">
                    <span class="post-author">${currentName}</span>
                    <span class="post-time">Just now</span>
                  </div>
                </header>
                <p class="post-content">${text}</p>
                <footer class="post-footer">
                  <button class="action-btn like-btn">❤️ <span>0</span></button>
                </footer>
            `;

      // Add to top of feed with animation
      feedContainer.prepend(newPost);
      postInput.value = "";

      // Add simple like logic to the new post
      const likeBtn = newPost.querySelector(".like-btn");
      likeBtn.addEventListener("click", function () {
        let span = this.querySelector("span");
        let count = parseInt(span.innerText);
        span.innerText = count + 1;
        this.style.color = "#ef4444"; // Turn red on like
      });
    });
  }

  // =========================================
  // 4. DARK MODE LOGIC
  // =========================================
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const body = document.body;

  // A. Check if user already chose dark mode previously
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    if (darkModeToggle) darkModeToggle.value = "on";
  }

  // B. Listen for changes in the Settings Modal
  if (darkModeToggle) {
    darkModeToggle.addEventListener("change", (e) => {
      if (e.target.value === "on") {
        body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark"); // Save preference
      } else {
        body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light"); // Save preference
      }
    });
  }
});
