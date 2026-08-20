/**
 * Vamos Bharat - View Router & Navigation Manager (Desktop & Responsive Support)
 */

const Router = {
  currentView: "home-view",
  viewHistory: ["home-view"],
  activeMonumentId: null,

  init() {
    // Listen to hash change or programmatic navigation
    window.addEventListener("popstate", (e) => {
      if (e.state && e.state.view) {
        this.navigateTo(e.state.view, e.state.params, false);
      }
    });

    // Wire up navigation elements
    this.bindEvents();
  },

  bindEvents() {
    // Navigation links & buttons
    document.querySelectorAll("[data-nav-target]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const targetView = btn.getAttribute("data-nav-target");
        this.navigateTo(targetView);
      });
    });

    // Back buttons
    document.querySelectorAll("[data-back-btn]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.goBack();
      });
    });
  },

  navigateTo(viewName, params = {}, pushHistory = true) {
    const views = document.querySelectorAll(".app-view");
    const targetElement = document.getElementById(viewName);

    if (!targetElement) {
      console.warn(`View "${viewName}" not found.`);
      return;
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Hide all views with transition
    views.forEach(v => {
      v.classList.add("hidden");
      v.classList.remove("view-active");
    });

    // Show target view
    targetElement.classList.remove("hidden");
    targetElement.classList.add("view-active");

    // Update desktop & mobile navigation active states
    this.updateNavState(viewName);

    // Save history
    if (pushHistory && viewName !== this.currentView) {
      this.viewHistory.push(viewName);
      window.history.pushState({ view: viewName, params }, "", `#${viewName}`);
    }

    this.currentView = viewName;

    // View specific hooks
    if (viewName === "monument-detail-view" && params.monumentId) {
      this.activeMonumentId = params.monumentId;
      if (window.App && typeof window.App.renderMonumentDetail === "function") {
        window.App.renderMonumentDetail(params.monumentId);
      }
    } else if (viewName === "wishlist-view") {
      if (window.App && typeof window.App.renderWishlist === "function") {
        window.App.renderWishlist();
      }
    } else if (viewName === "profile-view") {
      if (window.App && typeof window.App.renderProfileView === "function") {
        window.App.renderProfileView();
      }
    } else if (viewName === "home-view") {
      if (window.App && typeof window.App.renderHome === "function") {
        window.App.renderHome();
      }
    } else if (viewName === "ai-chat-view") {
      if (params.presetQuery && window.AIAssistant) {
        window.AIAssistant.handlePresetQuery(params.presetQuery);
      }
    }

    // Dispatch view changed event
    window.dispatchEvent(new CustomEvent("view-changed", { detail: { view: viewName, params } }));
  },

  goBack() {
    if (this.viewHistory.length > 1) {
      this.viewHistory.pop(); // Pop current view
      const prevView = this.viewHistory[this.viewHistory.length - 1] || "home-view";
      this.navigateTo(prevView, {}, false);
    } else {
      this.navigateTo("home-view", {}, false);
    }
  },

  updateNavState(viewName) {
    document.querySelectorAll("[data-nav-target]").forEach(btn => {
      const target = btn.getAttribute("data-nav-target");

      if (target === viewName) {
        btn.classList.add("text-blue-600", "bg-white", "shadow-xs", "font-bold");
        btn.classList.remove("text-slate-600", "bg-transparent");
      } else {
        btn.classList.remove("text-blue-600", "bg-white", "shadow-xs", "font-bold");
        btn.classList.add("text-slate-600", "bg-transparent");
      }
    });
  }
};

window.Router = Router;
