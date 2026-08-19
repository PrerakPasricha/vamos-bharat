/**
 * Vamos Bharat - Main Application Controller (Clean Desktop Web Platform)
 */

const App = {
  activeCategoryTab: "restaurants",
  activeFilterState: "all",

  init() {
    console.log("Initializing Vamos Bharat Desktop Tourism & Safety Portal...");

    // Initialize subsystems
    if (window.Router) window.Router.init();
    if (window.AIAssistant) window.AIAssistant.init();
    if (window.SOSSystem) window.SOSSystem.init();
    if (window.TranslationSystem) window.TranslationSystem.init();

    // Render Components
    this.renderHome();
    this.renderWishlistBadge();
    this.bindGlobalEvents();
  },

  bindGlobalEvents() {
    // Notification Bell
    const notifBtn = document.getElementById("notification-bell-btn");
    const notifModal = document.getElementById("notifications-modal");
    const closeNotifBtn = document.getElementById("close-notif-btn");

    if (notifBtn && notifModal) {
      notifBtn.addEventListener("click", () => {
        notifModal.classList.remove("hidden");
        notifModal.classList.add("flex");
        this.renderNotificationsList();
      });
    }

    if (closeNotifBtn && notifModal) {
      closeNotifBtn.addEventListener("click", () => {
        notifModal.classList.add("hidden");
        notifModal.classList.remove("flex");
      });
    }

    // Search bar input filter
    const searchInput = document.getElementById("global-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.handleSearch(e.target.value.trim());
      });
    }

    // Profile form saving
    const profileForm = document.getElementById("profile-settings-form");
    if (profileForm) {
      profileForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleProfileSave();
      });
    }

    // Wishlist change listener
    window.addEventListener("wishlist-updated", () => {
      this.renderWishlistBadge();
      if (window.Router && window.Router.currentView === "wishlist-view") {
        this.renderWishlist();
      }
      this.renderFamousPlaces(this.activeFilterState); // Re-render heart states
    });

    this.updateUserProfileHeader();
  },

  updateUserProfileHeader() {
    const profile = window.StorageManager ? window.StorageManager.getUserProfile() : { name: "Alex Morgan" };
    const greetingElem = document.getElementById("header-user-greeting");
    if (greetingElem) {
      greetingElem.innerText = profile.name;
    }
  },

  // 1. Render Home View Sections (Clean & Uncluttered)
  renderHome() {
    this.renderFamousPlaces();
    this.renderStatePills();
    this.renderRecommendations();
  },

  // Famous Places 3-Column Desktop Grid
  renderFamousPlaces(filterState = "all") {
    const container = document.getElementById("famous-places-carousel");
    if (!container || !window.APP_DATA) return;

    let items = window.APP_DATA.monuments;
    if (filterState !== "all") {
      items = items.filter(m => m.state.toLowerCase().includes(filterState.toLowerCase()) || m.city.toLowerCase().includes(filterState.toLowerCase()) || m.id.includes(filterState.toLowerCase()));
    }

    if (items.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-12 text-center text-slate-400 bg-white rounded-3xl border border-slate-200 shadow-xs">
          <span class="text-4xl block mb-2">🏛️</span>
          <p class="text-sm font-bold text-slate-700">No monuments found for state "${filterState}".</p>
          <button class="mt-3 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition" onclick="window.App.filterByState('all', null)">View All Monuments</button>
        </div>
      `;
      return;
    }

    container.innerHTML = "";

    items.forEach(monument => {
      const isSaved = window.StorageManager ? window.StorageManager.isWishlisted(monument.id) : false;
      const card = document.createElement("div");
      card.className = "monument-desktop-card bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs flex flex-col justify-between group";
      
      card.innerHTML = `
        <div>
          <!-- Monument Photo with Overlays -->
          <div class="relative cursor-pointer overflow-hidden h-56" onclick="window.Router.navigateTo('monument-detail-view', { monumentId: '${monument.id}' })">
            <img src="${monument.image}" alt="${monument.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
            
            <!-- Top Badges -->
            <div class="absolute top-3 left-3 right-3 flex items-center justify-between">
              <span class="text-xs font-bold px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-slate-900 shadow-sm flex items-center gap-1">
                ⭐ ${monument.rating}
              </span>
              <button class="w-9 h-9 rounded-full ${isSaved ? 'bg-rose-500 text-white' : 'bg-black/40 backdrop-blur-md text-white'} hover:scale-110 flex items-center justify-center transition shadow-md"
                      title="${isSaved ? 'Remove from Wishlist' : 'Add to Wishlist'}"
                      onclick="event.stopPropagation(); window.App.toggleWishlistFromCard('${monument.id}')">
                ${isSaved ? '❤️' : '🤍'}
              </button>
            </div>

            <!-- Bottom Location & Title Overlay -->
            <div class="absolute bottom-3 left-4 right-4 text-white">
              <span class="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded bg-blue-600/90 inline-block mb-1">
                📍 ${monument.city}, ${monument.state}
              </span>
              <h3 class="text-base font-extrabold leading-tight text-white drop-shadow">${monument.name}</h3>
            </div>
          </div>

          <!-- Snippet -->
          <div class="p-5">
            <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed">
              ${monument.snippet}
            </p>
          </div>
        </div>

        <!-- Action Button -->
        <div class="p-5 pt-0">
          <button class="w-full py-3 rounded-2xl bg-slate-50 hover:bg-blue-600 text-slate-700 hover:text-white border border-slate-200 hover:border-transparent text-xs font-bold transition flex items-center justify-center gap-1.5 group-hover:bg-blue-600 group-hover:text-white"
                  onclick="window.Router.navigateTo('monument-detail-view', { monumentId: '${monument.id}' })">
            <span>Explore Monument</span>
            <span>➔</span>
          </button>
        </div>
      `;

      container.appendChild(card);
    });
  },

  // State Filter Pills
  renderStatePills() {
    const container = document.getElementById("states-pills-list");
    if (!container || !window.APP_DATA) return;

    container.innerHTML = "";

    // "All"
    const allPill = document.createElement("button");
    allPill.className = "flex-shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 bg-blue-600 text-white shadow-xs";
    allPill.innerHTML = `<span>All</span>`;
    allPill.onclick = () => {
      this.filterByState("all", allPill);
    };
    container.appendChild(allPill);

    window.APP_DATA.states.slice(0, 6).forEach(state => {
      const pill = document.createElement("button");
      pill.className = "flex-shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 bg-white text-slate-700 border border-slate-200 hover:border-blue-400";
      pill.innerHTML = `<span>${state.icon}</span> <span>${state.name}</span>`;
      pill.onclick = () => {
        this.filterByState(state.id, pill);
      };
      container.appendChild(pill);
    });
  },

  filterByState(stateId, pillElement) {
    this.activeFilterState = stateId;

    const pills = document.querySelectorAll("#states-pills-list button");
    pills.forEach(p => {
      p.classList.remove("bg-blue-600", "text-white", "shadow-xs");
      p.classList.add("bg-white", "text-slate-700", "border", "border-slate-200");
    });

    if (pillElement) {
      pillElement.classList.add("bg-blue-600", "text-white", "shadow-xs");
      pillElement.classList.remove("bg-white", "text-slate-700", "border", "border-slate-200");
    }

    this.renderFamousPlaces(stateId);
  },

  // Recommended Gems
  renderRecommendations() {
    const container = document.getElementById("recommended-gems-list");
    if (!container || !window.APP_DATA) return;

    container.innerHTML = "";

    window.APP_DATA.recommendations.forEach(gem => {
      const card = document.createElement("div");
      card.className = "bg-white rounded-3xl p-4 border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-md transition cursor-pointer flex flex-col justify-between group";
      card.onclick = () => {
        this.showToast(`✨ Recommended Gem: ${gem.name} (${gem.state})`, "info");
      };

      card.innerHTML = `
        <div>
          <div class="relative rounded-2xl overflow-hidden mb-3 h-40">
            <img src="${gem.image}" alt="${gem.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
            <span class="absolute top-2.5 left-2.5 text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-white/95 px-2.5 py-0.5 rounded-full shadow-xs">
              ${gem.badge}
            </span>
          </div>

          <div class="flex items-center justify-between mb-1">
            <h4 class="text-sm font-bold text-slate-900 leading-tight">${gem.name}</h4>
            <span class="text-xs font-bold text-slate-800 flex items-center gap-0.5">
              ⭐ ${gem.rating}
            </span>
          </div>
          <p class="text-[11px] text-slate-500 mb-2">📍 ${gem.state}</p>
          <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed">${gem.highlight}</p>
        </div>

        <div class="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-bold">
          <span>Explore</span>
          <span>➔</span>
        </div>
      `;

      container.appendChild(card);
    });
  },

  // 2. Render Monument Detail View (2-Column Desktop)
  renderMonumentDetail(monumentId) {
    const monument = window.APP_DATA.monuments.find(m => m.id === monumentId) || window.APP_DATA.monuments[0];
    if (!monument) return;

    // Breadcrumbs
    const bState = document.getElementById("detail-breadcrumb-state");
    const bName = document.getElementById("detail-breadcrumb-name");
    if (bState) bState.innerText = monument.state;
    if (bName) bName.innerText = monument.name;

    // Meta Header
    document.getElementById("detail-monument-title").innerText = monument.name;
    document.getElementById("detail-monument-location").innerText = `📍 ${monument.city}, ${monument.state} · ${monument.category}`;
    document.getElementById("detail-hero-image").src = monument.image;
    document.getElementById("detail-safety-badge").innerText = `🛡️ ${monument.safetyScore}/10 Safe Zone`;
    document.getElementById("detail-rating").innerText = `⭐ ${monument.rating}`;
    document.getElementById("detail-timings").innerText = monument.entryTimings;
    document.getElementById("detail-ticket-price").innerText = `Indian: ${monument.entryFee.indian} | Foreigner: ${monument.entryFee.foreigner}`;

    // History & Architecture
    document.getElementById("detail-history-text").innerText = monument.history;
    document.getElementById("detail-architecture-text").innerText = `Architecture: ${monument.architecture}`;

    // Cultural Do's & Don'ts
    const dosList = document.getElementById("detail-dos-list");
    if (dosList) {
      dosList.innerHTML = monument.dosAndDonts.map(item => `
        <li class="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-100">
          <span class="${item.type === 'do' ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'} text-sm">${item.type === 'do' ? '✅' : '❌'}</span>
          <span class="leading-relaxed">${item.text}</span>
        </li>
      `).join("");
    }

    // Favorite Button State
    this.updateDetailFavoriteBtn(monument.id);

    // Render Sub-Tabs (Restaurants, Hotels, Transport, Police & Medical, Entertainment)
    this.activeCategoryTab = "restaurants";
    this.renderDetailSubTabs(monument);
  },

  renderDetailSubTabs(monument) {
    const tabsContainer = document.getElementById("detail-subtabs-nav");
    if (!tabsContainer) return;

    const tabs = [
      { id: "restaurants", label: "🍽️ Restaurants & Dining", key: "restaurants" },
      { id: "hotels", label: "🏨 Hotels & Stays", key: "hotels" },
      { id: "transport", label: "🚕 Transport & Fares", key: "transport" },
      { id: "entertainment", label: "🎭 Entertainment", key: "entertainment" },
      { id: "emergency", label: "👮 Police & Medical", key: "emergency" }
    ];

    tabsContainer.innerHTML = tabs.map(tab => `
      <button class="subtab-btn flex-shrink-0 px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${this.activeCategoryTab === tab.id ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}"
              onclick="window.App.switchDetailSubTab('${monument.id}', '${tab.id}')">
        ${tab.label}
      </button>
    `).join("");

    this.renderSubTabContent(monument, this.activeCategoryTab);
  },

  switchDetailSubTab(monumentId, tabId) {
    this.activeCategoryTab = tabId;
    const monument = window.APP_DATA.monuments.find(m => m.id === monumentId) || window.APP_DATA.monuments[0];
    this.renderDetailSubTabs(monument);
  },

  renderSubTabContent(monument, tabId) {
    const container = document.getElementById("detail-subtabs-content");
    if (!container) return;

    const data = monument.nearbyAmenities[tabId] || [];

    if (tabId === "restaurants") {
      container.innerHTML = data.map(item => `
        <div class="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div class="flex items-start justify-between gap-2 mb-1.5">
              <div>
                <h4 class="text-sm font-bold text-slate-900">${item.name}</h4>
                <p class="text-xs text-slate-500">${item.cuisine} · ${item.price}</p>
              </div>
              <span class="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-1 rounded-lg">⭐ ${item.rating}</span>
            </div>
            <p class="text-xs text-slate-600 mb-2">📍 ${item.address} (${item.distance})</p>
            <div class="bg-blue-50/70 rounded-xl p-2.5 text-xs text-blue-900">
              ✨ <strong>Must Try:</strong> ${item.mustTry}
            </div>
          </div>
          <div class="flex items-center justify-between pt-3 mt-3 border-t border-slate-100">
            <span class="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Verified Clean</span>
            <button class="text-xs font-bold text-blue-600 hover:underline" onclick="window.App.toggleWishlistFromCustom({ id: '${item.name.replace(/\s+/g, '-').toLowerCase()}', name: '${item.name}', cuisine: '${item.cuisine}', address: '${item.address}' })">❤️ Save</button>
          </div>
        </div>
      `).join("");
    } else if (tabId === "hotels") {
      container.innerHTML = data.map(item => `
        <div class="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div class="flex items-start justify-between gap-2 mb-1.5">
              <div>
                <h4 class="text-sm font-bold text-slate-900">${item.name}</h4>
                <p class="text-xs text-slate-500">${item.type} · ${item.distance}</p>
              </div>
              <span class="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-1 rounded-lg">⭐ ${item.rating}</span>
            </div>
            <span class="text-sm font-extrabold text-blue-600 block mt-1">${item.pricePerNight} <span class="text-[10px] font-normal text-slate-500">/ night</span></span>
          </div>
          <div class="flex items-center justify-between pt-3 mt-3 border-t border-slate-100">
            <button class="text-xs font-bold text-blue-600 hover:underline" onclick="window.App.toggleWishlistFromCustom({ id: '${item.name.replace(/\s+/g, '-').toLowerCase()}', name: '${item.name}', type: '${item.type}', address: '${item.distance}' })">❤️ Bookmark</button>
            <a href="tel:${item.contact}" class="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-xs">📞 Call</a>
          </div>
        </div>
      `).join("");
    } else if (tabId === "transport") {
      container.innerHTML = data.map(item => `
        <div class="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-xs font-bold text-blue-600 uppercase tracking-wider">${item.type}</span>
              <span class="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">${item.fare}</span>
            </div>
            <h4 class="text-sm font-bold text-slate-900 mb-1">${item.name}</h4>
            <p class="text-xs text-slate-600 mb-2 leading-relaxed">${item.detail}</p>
          </div>
          <div class="bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-xs text-amber-900 flex items-start gap-2">
            <span>💡</span>
            <span class="leading-tight">${item.tip}</span>
          </div>
        </div>
      `).join("");
    } else if (tabId === "entertainment") {
      container.innerHTML = data.map(item => `
        <div class="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div class="flex items-start justify-between mb-1.5">
              <div>
                <h4 class="text-sm font-bold text-slate-900">${item.name}</h4>
                <p class="text-xs text-slate-500">${item.type} · ${item.distance}</p>
              </div>
              <span class="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-1 rounded-lg">⭐ ${item.rating}</span>
            </div>
            <p class="text-xs text-slate-600 mb-2 leading-relaxed">${item.highlight}</p>
          </div>
          <span class="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg inline-block">⏰ Timings: ${item.timing}</span>
        </div>
      `).join("");
    } else if (tabId === "emergency") {
      container.innerHTML = data.map(item => `
        <div class="bg-white border border-rose-200 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <span class="text-[11px] font-bold text-rose-600 uppercase tracking-wider block mb-1">🚨 ${item.type}</span>
            <h4 class="text-sm font-bold text-slate-900">${item.name}</h4>
            <p class="text-xs text-slate-500 mt-0.5">${item.distance} away · ${item.available}</p>
          </div>
          <div class="pt-3 mt-3 border-t border-rose-100 flex items-center justify-between">
            <span class="text-xs font-bold text-slate-700">Phone: ${item.phone}</span>
            <a href="tel:${item.phone.split('/')[0].trim()}" class="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs">
              📞 <span>Call Help</span>
            </a>
          </div>
        </div>
      `).join("");
    }
  },

  updateDetailFavoriteBtn(monumentId) {
    const btn = document.getElementById("detail-favorite-toggle-btn");
    if (!btn) return;

    const isSaved = window.StorageManager ? window.StorageManager.isWishlisted(monumentId) : false;
    btn.innerHTML = isSaved ? "❤️ <span>Saved in Wishlist</span>" : "🤍 <span>Add to Wishlist</span>";
    if (isSaved) {
      btn.classList.add("bg-rose-50", "text-rose-600", "border-rose-200");
      btn.classList.remove("bg-white", "text-slate-700", "border-slate-200");
    } else {
      btn.classList.remove("bg-rose-50", "text-rose-600", "border-rose-200");
      btn.classList.add("bg-white", "text-slate-700", "border-slate-200");
    }

    btn.onclick = () => {
      const mon = window.APP_DATA.monuments.find(m => m.id === monumentId);
      if (mon && window.StorageManager) {
        const added = window.StorageManager.toggleWishlist(mon);
        this.updateDetailFavoriteBtn(monumentId);
        this.showToast(added ? `❤️ Saved "${mon.name}" to Wishlist!` : `Removed "${mon.name}" from Wishlist`, added ? "success" : "info");
      }
    };
  },

  // 3. Wishlist Management View (Desktop Grid)
  renderWishlist() {
    const container = document.getElementById("wishlist-items-container");
    const emptyState = document.getElementById("wishlist-empty-state");
    if (!container || !emptyState) return;

    const items = window.StorageManager ? window.StorageManager.getWishlist() : [];

    if (items.length === 0) {
      container.innerHTML = "";
      emptyState.classList.remove("hidden");
      return;
    }

    emptyState.classList.add("hidden");
    container.innerHTML = items.map(item => `
      <div class="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-blue-300 transition group">
        <div>
          <div class="relative rounded-2xl overflow-hidden mb-3 h-48 cursor-pointer" onclick="window.App.handleWishlistClick('${item.id}')">
            <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
            <span class="absolute top-2.5 left-2.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/95 text-blue-700 shadow-xs">
              ${item.category}
            </span>
          </div>

          <h4 class="text-base font-bold text-slate-900 leading-tight mb-1 cursor-pointer" onclick="window.App.handleWishlistClick('${item.id}')">${item.name}</h4>
          <p class="text-xs text-slate-500 mb-2">📍 ${item.city} ${item.state ? '· ' + item.state : ''}</p>
          <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed">${item.snippet}</p>
        </div>

        <div class="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
          <button class="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1" onclick="window.App.handleWishlistClick('${item.id}')">
            <span>View Details</span> <span>➔</span>
          </button>
          <button class="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold transition flex items-center gap-1"
                  title="Remove from Wishlist"
                  onclick="window.App.removeFromWishlist('${item.id}')">
            <span>🗑️ Remove</span>
          </button>
        </div>
      </div>
    `).join("");
  },

  handleWishlistClick(id) {
    const mon = window.APP_DATA.monuments.find(m => m.id === id);
    if (mon && window.Router) {
      window.Router.navigateTo("monument-detail-view", { monumentId: id });
    } else {
      this.showToast(`Saved spot: ${id}`, "info");
    }
  },

  toggleWishlistFromCard(monumentId) {
    const mon = window.APP_DATA.monuments.find(m => m.id === monumentId);
    if (mon && window.StorageManager) {
      const added = window.StorageManager.toggleWishlist(mon);
      this.showToast(added ? `❤️ Saved "${mon.name}"!` : `Removed "${mon.name}"`, added ? "success" : "info");
    }
  },

  toggleWishlistFromCustom(customItem) {
    if (window.StorageManager) {
      const added = window.StorageManager.toggleWishlist(customItem);
      this.showToast(added ? `❤️ Saved "${customItem.name}"!` : `Removed "${customItem.name}"`, added ? "success" : "info");
    }
  },

  removeFromWishlist(id) {
    if (window.StorageManager) {
      window.StorageManager.removeWishlist(id);
      this.showToast("Removed from Wishlist", "info");
    }
  },

  renderWishlistBadge() {
    const count = window.StorageManager ? window.StorageManager.getWishlist().length : 0;
    document.querySelectorAll(".wishlist-badge-count").forEach(badge => {
      badge.innerText = `${count}`;
      if (count > 0) {
        badge.classList.remove("hidden");
      } else {
        badge.classList.add("hidden");
      }
    });
  },

  // 4. Notifications Feed
  renderNotificationsList() {
    const container = document.getElementById("notifications-feed-list");
    if (!container || !window.APP_DATA) return;

    container.innerHTML = window.APP_DATA.notifications.map(n => `
      <div class="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-3 flex items-start gap-3.5">
        <div class="text-2xl flex-shrink-0 mt-0.5">${n.icon}</div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between mb-1">
            <h4 class="text-xs font-bold text-slate-900">${n.title}</h4>
            <span class="text-[10px] text-slate-400 font-medium">${n.time}</span>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">${n.message}</p>
        </div>
      </div>
    `).join("");
  },

  // 5. Search Filter
  handleSearch(query) {
    const searchInput = document.getElementById("global-search-input");
    if (searchInput && query && searchInput.value !== query) {
      searchInput.value = query;
    }

    if (!query) {
      this.renderFamousPlaces(this.activeFilterState);
      return;
    }

    const q = query.toLowerCase();
    const filtered = window.APP_DATA.monuments.filter(m => 
      m.name.toLowerCase().includes(q) ||
      m.city.toLowerCase().includes(q) ||
      m.state.toLowerCase().includes(q) ||
      m.snippet.toLowerCase().includes(q)
    );

    const container = document.getElementById("famous-places-carousel");
    if (container) {
      if (filtered.length === 0) {
        container.innerHTML = `
          <div class="col-span-full py-12 text-center text-slate-500 bg-white rounded-3xl border border-slate-200 shadow-xs">
            <p class="text-sm font-bold">No monuments found matching "${query}"</p>
            <p class="text-xs text-slate-400 mt-1">Try searching "Taj Mahal", "Red Fort", "Delhi", "Jaipur", "Mumbai"</p>
          </div>
        `;
      } else {
        container.innerHTML = "";
        filtered.forEach(monument => {
          const isSaved = window.StorageManager ? window.StorageManager.isWishlisted(monument.id) : false;
          const card = document.createElement("div");
          card.className = "monument-desktop-card bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs flex flex-col justify-between";
          card.innerHTML = `
            <div>
              <div class="relative cursor-pointer h-52 overflow-hidden" onclick="window.Router.navigateTo('monument-detail-view', { monumentId: '${monument.id}' })">
                <img src="${monument.image}" alt="${monument.name}" class="w-full h-full object-cover" />
                <div class="absolute bottom-3 left-4 text-white">
                  <span class="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-600 inline-block mb-1">📍 ${monument.city}</span>
                  <h3 class="text-base font-extrabold text-white drop-shadow">${monument.name}</h3>
                </div>
              </div>
              <div class="p-5">
                <p class="text-xs text-slate-600 line-clamp-2 mb-3">${monument.snippet}</p>
                <div class="flex items-center justify-between text-xs text-slate-500">
                  <span>⭐ ${monument.rating}</span>
                  <span class="text-emerald-700 font-bold">🛡️ ${monument.safetyScore}/10 Safe</span>
                </div>
              </div>
            </div>
            <div class="p-5 pt-0">
              <button class="w-full py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition" onclick="window.Router.navigateTo('monument-detail-view', { monumentId: '${monument.id}' })">
                View Monument
              </button>
            </div>
          `;
          container.appendChild(card);
        });
      }
    }
  },

  openScamGuideModal() {
    const modal = document.getElementById("scam-guide-modal");
    if (modal) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
      const list = document.getElementById("scams-list-container");
      if (list && window.APP_DATA) {
        list.innerHTML = window.APP_DATA.scamsGuide.map(s => `
          <div class="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-3">
            <h4 class="text-sm font-bold text-rose-700 flex items-center gap-2 mb-1.5">
              <span>⚠️</span> <span>${s.title}</span>
            </h4>
            <p class="text-xs text-slate-700 mb-2.5 leading-relaxed"><strong class="text-slate-900">How it works:</strong> ${s.scam}</p>
            <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-xs text-emerald-900">
              🛡️ <strong>Safety Advice:</strong> ${s.prevention}
            </div>
          </div>
        `).join("");
      }
    }
  },

  handleProfileSave() {
    const name = document.getElementById("profile-name-input").value;
    const phone = document.getElementById("profile-ice-phone-input").value;
    const contactName = document.getElementById("profile-ice-name-input").value;
    const lang = document.getElementById("profile-lang-select").value;

    if (window.StorageManager) {
      window.StorageManager.saveUserProfile({
        name: name,
        emergencyContactPhone: phone,
        emergencyContactName: contactName,
        language: lang
      });
      window.StorageManager.setLanguage(lang);
    }

    this.showToast("✅ Safety Profile & ICE Contacts Updated!", "success");
    this.updateUserProfileHeader();
  },

  showToast(message, type = "info") {
    const container = document.getElementById("toast-notification-container");
    if (!container) return;

    const toast = document.createElement("div");
    const colors = type === "success" ? "bg-emerald-600 text-white" : type === "error" ? "bg-rose-600 text-white" : "bg-slate-900 text-white";
    
    toast.className = `${colors} px-5 py-3 rounded-2xl shadow-2xl text-xs font-semibold flex items-center gap-2 transform transition-all duration-300 translate-y-4 opacity-0 pointer-events-auto border border-white/10`;
    toast.innerHTML = `<span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove("translate-y-4", "opacity-0");
    }, 10);

    setTimeout(() => {
      toast.classList.add("translate-y-4", "opacity-0");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
};

window.App = App;
document.addEventListener("DOMContentLoaded", () => {
  window.App.init();
});
