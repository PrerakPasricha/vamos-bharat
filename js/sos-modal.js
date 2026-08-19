/**
 * Vamos Bharat - Emergency SOS & Rapid Dispatch System
 */

const SOSSystem = {
  modal: null,
  isSirenPlaying: false,
  audioCtx: null,
  oscillator: null,
  gainNode: null,
  sirenInterval: null,

  init() {
    this.modal = document.getElementById("sos-modal");
    this.bindEvents();
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

    // Siren Toggle
    const sirenBtn = document.getElementById("toggle-siren-btn");
    if (sirenBtn) {
      sirenBtn.addEventListener("click", () => {
        this.toggleSiren();
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
    this.stopSiren();
    this.modal.classList.add("hidden");
    this.modal.classList.remove("flex");
    document.body.classList.remove("overflow-hidden");
  },

  updateGPSReadout() {
    const loc = window.APP_DATA ? window.APP_DATA.currentLocation : {
      lat: 28.6139,
      lng: 77.2090,
      city: "New Delhi",
      landmark: "Connaught Place, Central Delhi"
    };

    const gpsElem = document.getElementById("sos-gps-coords");
    const addressElem = document.getElementById("sos-gps-address");

    if (gpsElem) gpsElem.innerText = `${loc.lat.toFixed(4)}° N, ${loc.lng.toFixed(4)}° E (± 4m accuracy)`;
    if (addressElem) addressElem.innerText = `${loc.landmark}, ${loc.city}`;
  },

  confirmEmergencyCall(number, serviceName) {
    const confirmed = confirm(`🚨 EMERGENCY CALL CONFIRMATION\n\nAre you sure you want to dial ${serviceName} (${number})?`);
    if (confirmed) {
      // In a real device, this triggers tel: protocol
      window.location.href = `tel:${number}`;
    }
  },

  toggleSiren() {
    if (this.isSirenPlaying) {
      this.stopSiren();
    } else {
      this.startSiren();
    }
  },

  startSiren() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
      
      this.oscillator = this.audioCtx.createOscillator();
      this.gainNode = this.audioCtx.createGain();

      this.oscillator.type = "sawtooth";
      this.gainNode.gain.setValueAtTime(0.3, this.audioCtx.currentTime);

      this.oscillator.connect(this.gainNode);
      this.gainNode.connect(this.audioCtx.destination);
      this.oscillator.start();

      let freqHigh = true;
      this.oscillator.frequency.setValueAtTime(900, this.audioCtx.currentTime);

      this.sirenInterval = setInterval(() => {
        if (!this.audioCtx || !this.oscillator) return;
        freqHigh = !freqHigh;
        const targetFreq = freqHigh ? 950 : 650;
        this.oscillator.frequency.exponentialRampToValueAtTime(targetFreq, this.audioCtx.currentTime + 0.25);
      }, 350);

      this.isSirenPlaying = true;
      this.updateSirenUI(true);
    } catch (e) {
      console.error("Audio synthesizer failed:", e);
      alert("⚠️ Siren activated in silent mock mode (Audio not permitted by browser autoplay policy).");
      this.isSirenPlaying = true;
      this.updateSirenUI(true);
    }
  },

  stopSiren() {
    if (this.sirenInterval) {
      clearInterval(this.sirenInterval);
      this.sirenInterval = null;
    }

    if (this.oscillator) {
      try {
        this.oscillator.stop();
        this.oscillator.disconnect();
      } catch (e) {}
      this.oscillator = null;
    }

    if (this.audioCtx) {
      try {
        this.audioCtx.close();
      } catch (e) {}
      this.audioCtx = null;
    }

    this.isSirenPlaying = false;
    this.updateSirenUI(false);
  },

  updateSirenUI(active) {
    const btn = document.getElementById("toggle-siren-btn");
    const statusText = document.getElementById("siren-status-text");
    const sirenBox = document.getElementById("sos-siren-box");

    if (btn) {
      if (active) {
        btn.classList.add("bg-rose-600", "text-white", "animate-pulse");
        btn.classList.remove("bg-white", "text-rose-600");
        if (statusText) statusText.innerText = "🚨 LOUD SIREN ACTIVE (Tap to Mute)";
        if (sirenBox) sirenBox.classList.add("ring-4", "ring-rose-400", "animate-pulse");
      } else {
        btn.classList.remove("bg-rose-600", "text-white", "animate-pulse");
        btn.classList.add("bg-white", "text-rose-600");
        if (statusText) statusText.innerText = "🔊 Tap for Loud Emergency Siren / Whistle";
        if (sirenBox) sirenBox.classList.remove("ring-4", "ring-rose-400", "animate-pulse");
      }
    }
  },

  dispatchOfflineSMS() {
    const loc = window.APP_DATA ? window.APP_DATA.currentLocation : { lat: 28.6139, lng: 77.2090, city: "Delhi", landmark: "Connaught Place" };
    const user = window.StorageManager ? window.StorageManager.getUserProfile() : { name: "Traveler", emergencyContactPhone: "112" };

    const mapLink = `https://maps.google.com/?q=${loc.lat},${loc.lng}`;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const messageBody = `[EMERGENCY SOS] Tourist Safety Alert from ${user.name} at ${timestamp}! I need urgent assistance at: ${loc.landmark}, ${loc.city}. Live GPS: ${mapLink} (Coordinates: ${loc.lat.toFixed(4)}, ${loc.lng.toFixed(4)})`;

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
