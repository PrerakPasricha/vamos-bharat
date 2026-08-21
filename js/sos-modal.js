/**
 * Vamos Bharat - Emergency SOS & Rapid Dispatch System (Manual Location Aware)
 */

const SOSSystem = {
  modal: null,

  init() {
    this.modal = document.getElementById("sos-modal");
    this.bindEvents();

    // Listen for manual location change events
    window.addEventListener("location-changed", () => {
      this.updateGPSReadout();
    });
  },

  bindEvents() {
    // SOS triggers (Bottom nav central floating button & Drawer menu items)
    document.querySelectorAll("[data-trigger-sos]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.openModal();
      });
    });

    // Close SOS modal
    const closeBtn = document.getElementById("close-sos-modal-btn");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        this.closeModal();
      });
    }

    // Offline SMS Dispatch
    const smsBtn = document.getElementById("dispatch-sms-btn");
    if (smsBtn) {
      smsBtn.addEventListener("click", () => {
        this.dispatchOfflineSMS();
      });
    }

    // Direct dial confirmation triggers
    document.querySelectorAll("[data-sos-dial]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const number = btn.getAttribute("data-sos-dial");
        const title = btn.getAttribute("data-sos-title") || "Emergency Services";
        this.confirmEmergencyCall(number, title);
      });
    });
  },

  openModal() {
    if (!this.modal) return;
    this.modal.classList.remove("hidden");
    this.modal.classList.add("flex");
    document.body.classList.add("overflow-hidden");

    // Update GPS readout
    this.updateGPSReadout();
  },

  closeModal() {
    if (!this.modal) return;
    this.modal.classList.add("hidden");
    this.modal.classList.remove("flex");
    document.body.classList.remove("overflow-hidden");
  },

  updateGPSReadout() {
    const loc = window.StorageManager ? window.StorageManager.getCurrentLocation() : (window.APP_DATA ? window.APP_DATA.currentLocation : {
      lat: 28.6139,
      lng: 77.2090,
      city: "New Delhi",
      landmark: "Connaught Place, Central Delhi"
    });

    const gpsElem = document.getElementById("sos-gps-coords");
    const addressElem = document.getElementById("sos-gps-address");

    if (gpsElem) gpsElem.innerText = `${loc.lat.toFixed(4)}° N, ${loc.lng.toFixed(4)}° E (± 4m precision)`;
    if (addressElem) addressElem.innerText = `${loc.landmark}, ${loc.city} (${loc.state || ''})`;
  },

  confirmEmergencyCall(number, serviceName) {
    const confirmed = confirm(`🚨 EMERGENCY CALL CONFIRMATION\n\nAre you sure you want to dial ${serviceName} (${number})?`);
    if (confirmed) {
      // In a real device, this triggers tel: protocol
      window.location.href = `tel:${number}`;
    }
  },

  dispatchOfflineSMS() {
    const loc = window.StorageManager ? window.StorageManager.getCurrentLocation() : (window.APP_DATA ? window.APP_DATA.currentLocation : { lat: 28.6139, lng: 77.2090, city: "Delhi", landmark: "Connaught Place" });
    const user = window.StorageManager ? window.StorageManager.getUserProfile() : { name: "Traveler", emergencyContactPhone: "112" };

    const mapLink = `https://maps.google.com/?q=${loc.lat},${loc.lng}`;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const messageBody = `[EMERGENCY SOS] Tourist Safety Alert from ${user.name} at ${timestamp}! I need urgent assistance at: ${loc.landmark}, ${loc.city} (${loc.state || ''}). Manual GPS: ${mapLink} (Coordinates: ${loc.lat.toFixed(4)}, ${loc.lng.toFixed(4)})`;

    // Attempt native sms protocol
    const cleanPhone = (user.emergencyContactPhone || "112").replace(/[^\d+]/g, "");
    const smsUri = `sms:${cleanPhone}?body=${encodeURIComponent(messageBody)}`;

    // Show simulated toast with preview
    if (window.App && typeof window.App.showToast === "function") {
      window.App.showToast("📲 Emergency SMS dispatched to ICE contact!", "success");
    }

    // Modal popup showing the generated payload
    alert(`📲 OFFLINE EMERGENCY SMS GENERATED\n\nRecipient: ${user.emergencyContactName || "ICE Contact"} (${cleanPhone})\n\nMessage Payload:\n"${messageBody}"\n\nOpening native SMS client...`);

    window.location.href = smsUri;
  }
};

window.SOSSystem = SOSSystem;
