/**
 * Vamos Bharat - LocalStorage State Management & Location Persistence
 */

const STORAGE_KEYS = {
  WISHLIST: "ys_wishlist",
  USER_PROFILE: "ys_user_profile",
  EMERGENCY_CONTACTS: "ys_emergency_contacts",
  CHAT_HISTORY: "ys_chat_history",
  APP_LANGUAGE: "ys_language",
  ONBOARDING_DONE: "ys_onboarded",
  ACTIVE_LOCATION: "ys_active_location"
};

const StorageManager = {
  // Active Manual Location
  getCurrentLocation() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACTIVE_LOCATION);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error("Error reading saved location:", e);
    }
    return window.APP_DATA ? window.APP_DATA.currentLocation : {
      city: "New Delhi",
      state: "Delhi",
      lat: 28.6139,
      lng: 77.2090,
      landmark: "Connaught Place, Central Delhi",
      safetyIndex: "9.5/10",
      safetyZone: "Low Risk Tourist Corridor",
      safetyColor: "emerald"
    };
  },

  setCurrentLocation(locObj) {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_LOCATION, JSON.stringify(locObj));
      if (window.APP_DATA) {
        window.APP_DATA.currentLocation = locObj;
      }
      window.dispatchEvent(new CustomEvent("location-changed", { detail: locObj }));
      return locObj;
    } catch (e) {
      console.error("Error saving manual location:", e);
      return null;
    }
  },

  // Wishlist / Bookmarks
  getWishlist() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Error reading wishlist:", e);
      return [];
    }
  },

  isWishlisted(id) {
    const list = this.getWishlist();
    return list.some(item => item.id === id);
  },

  toggleWishlist(item) {
    let list = this.getWishlist();
    const index = list.findIndex(i => i.id === item.id);
    let added = false;

    if (index > -1) {
      list.splice(index, 1);
      added = false;
    } else {
      list.push({
        id: item.id,
        name: item.name,
        city: item.city || item.address || "",
        state: item.state || "",
        category: item.category || item.cuisine || item.type || "Place",
        rating: item.rating || 4.8,
        image: item.image || (item.gallery && item.gallery[0]) || "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80",
        snippet: item.snippet || item.mustTry || item.highlight || "Saved from your recommendations",
        savedAt: new Date().toISOString()
      });
      added = true;
    }

    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent("wishlist-updated", { detail: { list, item, added } }));
    } catch (e) {
      console.error("Error saving wishlist:", e);
    }

    return added;
  },

  removeWishlist(id) {
    let list = this.getWishlist();
    list = list.filter(item => item.id !== id);
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent("wishlist-updated", { detail: { list, id, added: false } }));
    } catch (e) {
      console.error("Error updating wishlist:", e);
    }
  },

  // User Profile
  getUserProfile() {
    const defaults = {
      name: "Alex Morgan",
      nationality: "International Traveler",
      language: "en",
      travelerType: "Solo Explorer",
      emergencyContactName: "Sarah Morgan (Sister)",
      emergencyContactPhone: "+91 98765 43210",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    };

    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return data ? { ...defaults, ...JSON.parse(data) } : defaults;
    } catch (e) {
      return defaults;
    }
  },

  saveUserProfile(profileData) {
    try {
      const current = this.getUserProfile();
      const updated = { ...current, ...profileData };
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent("profile-updated", { detail: updated }));
      return updated;
    } catch (e) {
      console.error("Error saving profile:", e);
      return null;
    }
  },

  // Language
  getLanguage() {
    return localStorage.getItem(STORAGE_KEYS.APP_LANGUAGE) || "en";
  },

  setLanguage(lang) {
    localStorage.setItem(STORAGE_KEYS.APP_LANGUAGE, lang);
    window.dispatchEvent(new CustomEvent("language-changed", { detail: { language: lang } }));
  },

  // Onboarding status
  isOnboarded() {
    return localStorage.getItem(STORAGE_KEYS.ONBOARDING_DONE) === "true";
  },

  setOnboarded(value = true) {
    localStorage.setItem(STORAGE_KEYS.ONBOARDING_DONE, value ? "true" : "false");
  },

  // AI Chat History
  getChatHistory() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  saveChatHistory(messages) {
    try {
      localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(messages));
    } catch (e) {
      console.error("Error saving chat history:", e);
    }
  },

  clearChatHistory() {
    localStorage.removeItem(STORAGE_KEYS.CHAT_HISTORY);
  }
};

window.StorageManager = StorageManager;
