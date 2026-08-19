/**
 * Vamos Bharat - Tourist Translation & Cultural Phrasebook
 */

const TranslationSystem = {
  currentCategory: "emergency",
  container: null,

  init() {
    this.container = document.getElementById("phrasebook-cards-list");
    this.bindEvents();
    this.renderPhrases(this.currentCategory);
  },

  bindEvents() {
    // Category pill switches
    document.querySelectorAll("[data-phrase-category]").forEach(btn => {
      btn.addEventListener("click", () => {
        const cat = btn.getAttribute("data-phrase-category");
        this.currentCategory = cat;
        
        // Update active tab styles
        document.querySelectorAll("[data-phrase-category]").forEach(b => {
          b.classList.remove("bg-blue-600", "text-white", "shadow-sm");
          b.classList.add("bg-white", "text-slate-600", "border-slate-200");
        });
        btn.classList.add("bg-blue-600", "text-white", "shadow-sm");
        btn.classList.remove("bg-white", "text-slate-600", "border-slate-200");

        this.renderPhrases(cat);
      });
    });

    // Custom Live Translator Simulation form
    const form = document.getElementById("custom-translate-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleCustomTranslate();
      });
    }
  },

  renderPhrases(category) {
    if (!this.container || !window.APP_DATA) return;

    const group = window.APP_DATA.phrases.find(p => p.category === category) || window.APP_DATA.phrases[0];
    this.container.innerHTML = "";

    group.items.forEach(phrase => {
      const card = document.createElement("div");
      card.className = "bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm hover:border-blue-300 transition group";
      card.innerHTML = `
        <div class="flex items-start justify-between gap-3 mb-2">
          <div>
            <span class="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-0.5">English</span>
            <h4 class="text-sm font-bold text-slate-900 leading-snug">${phrase.en}</h4>
          </div>
          <button class="w-10 h-10 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white flex items-center justify-center transition flex-shrink-0 shadow-sm"
                  title="Speak Hindi Phrase"
                  onclick="window.TranslationSystem.speakHindi('${this.escapeQuotes(phrase.hi)}')">
            🔊
          </button>
        </div>

        <div class="bg-slate-50 rounded-xl p-3 border border-slate-100 mb-2.5">
          <span class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-0.5">Hindi & Pronunciation</span>
          <p class="text-base font-bold text-slate-900 mb-1 font-hindi">${phrase.hi}</p>
          <p class="text-xs font-semibold text-blue-800 italic bg-blue-50/80 px-2 py-1 rounded inline-block">
            🗣️ ${phrase.translit}
          </p>
          <p class="text-[11px] text-slate-500 mt-1">Pronounce: <span class="font-mono text-slate-700 font-semibold">${phrase.audioHint}</span></p>
        </div>

        <div class="flex items-center gap-1.5 text-xs text-slate-500">
          <span class="text-amber-500">💡</span>
          <span class="leading-tight">${phrase.context}</span>
        </div>
      `;
      this.container.appendChild(card);
    });
  },

  handleCustomTranslate() {
    const input = document.getElementById("custom-translate-input");
    const resultBox = document.getElementById("custom-translate-result");
    if (!input || !resultBox) return;

    const query = input.value.trim();
    if (!query) return;

    const qLower = query.toLowerCase();
    let hiTranslation = "नमस्ते, क्या आप मेरी मदद कर सकते हैं?";
    let transliteration = "Namaste, kya aap meri madad kar sakte hain?";
    let audioHint = "Nuh-muh-STAY, kyah aap MAY-ree MUH-dud kur SUK-tay hain?";

    if (qLower.includes("meter") || qLower.includes("auto") || qLower.includes("taxi")) {
      hiTranslation = "भैया, कृपया मीटर से चलिए।";
      transliteration = "Bhaiya, kripya meter se chaliye.";
      audioHint = "BHY-yah, KREEP-yah MEE-ter say CHUH-lee-yay.";
    } else if (qLower.includes("water") || qLower.includes("bottle") || qLower.includes("drink")) {
      hiTranslation = "कृपया मुझे सीलबंद पानी की बोतल दीजिए।";
      transliteration = "Kripya mujhe seal-band paani ki bottle dijiye.";
      audioHint = "KREEP-yah MOO-jhay SEAL-bund PAH-nee kee bottle DEE-jee-yay.";
    } else if (qLower.includes("discount") || qLower.includes("price") || qLower.includes("cost") || qLower.includes("expensive")) {
      hiTranslation = "यह बहुत महँगा है, थोड़ा कम कर दीजिए।";
      transliteration = "Yeh bahut mehenga hai, thoda kam kar dijiye.";
      audioHint = "Yeh buh-HOOT meh-HEN-gah hai, THOH-dah kum kur DEE-jee-yay.";
    } else if (qLower.includes("hospital") || qLower.includes("doctor") || qLower.includes("police") || qLower.includes("help")) {
      hiTranslation = "कृपया जल्दी मदद करें! मुझे अस्पताल / पुलिस चाहिए।";
      transliteration = "Kripya jaldi madad karein! Mujhe aspatal / police chahiye.";
      audioHint = "KREEP-yah JUL-dee MUH-dud kuh-RAIN! MOO-jhay us-puh-TAAL / police chah-HEE-yay.";
    } else if (qLower.includes("toilet") || qLower.includes("washroom") || qLower.includes("bathroom")) {
      hiTranslation = "यहाँ शौचालय (वॉशरूम) कहाँ है?";
      transliteration = "Yahan shauchalay (washroom) kahan hai?";
      audioHint = "Yuh-HAAN show-CHAH-luh-yuh kuh-HAAN hai?";
    } else {
      hiTranslation = `[अनुवाद]: "${query}" - कृपया स्थानीय गाइड से पूछें।`;
      transliteration = `Kripya sthaniya guide se poochein.`;
      audioHint = "KREEP-yah STHAH-nee-yuh guide say POO-chain.";
    }

    resultBox.classList.remove("hidden");
    resultBox.innerHTML = `
      <div class="bg-blue-50 border border-blue-200 rounded-2xl p-3.5 animate-fade-in">
        <div class="flex items-start justify-between gap-2 mb-1.5">
          <div>
            <span class="text-[11px] font-bold text-blue-700 uppercase tracking-wider">Simulated Translation</span>
            <p class="text-base font-bold text-slate-900 mt-0.5 font-hindi">${hiTranslation}</p>
          </div>
          <button class="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition shadow flex-shrink-0"
                  onclick="window.TranslationSystem.speakHindi('${this.escapeQuotes(hiTranslation)}')">
            🔊
          </button>
        </div>
        <p class="text-xs font-semibold text-blue-900 italic mb-1">🗣️ ${transliteration}</p>
        <p class="text-[11px] text-slate-500">Phonetics: <span class="font-mono text-slate-700">${audioHint}</span></p>
      </div>
    `;
  },

  speakHindi(text) {
    if (!("speechSynthesis" in window)) {
      alert("Speech synthesis is not supported in this browser.");
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-IN";
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    // Try finding a Hindi voice
    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find(v => v.lang && v.lang.startsWith("hi"));
    if (hindiVoice) {
      utterance.voice = hindiVoice;
    }

    window.speechSynthesis.speak(utterance);
  },

  escapeQuotes(str) {
    return str.replace(/'/g, "\\'").replace(/"/g, "&quot;");
  }
};

window.TranslationSystem = TranslationSystem;
