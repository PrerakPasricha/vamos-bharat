/**
 * Vamos Bharat - AI Travel Guardian & Fare Scam Advisor
 */

const AIAssistant = {
  messages: [],
  container: null,
  inputField: null,
  isTyping: false,

  defaultMessages: [
    {
      id: "msg-welcome-1",
      sender: "bot",
      time: "Just now",
      text: "Namaste! I am **Vamos AI Guide**, your 24x7 Travel Safety & Fair Price Guardian 🛡️. Ask me anything about monument tickets, taxi fares, avoiding tourist scams, or cultural customs!"
    }
  ],

  init() {
    this.container = document.getElementById("chat-messages-list");
    this.inputField = document.getElementById("chat-user-input");

    // Load persisted chat or use defaults
    const saved = window.StorageManager ? window.StorageManager.getChatHistory() : null;
    this.messages = saved && saved.length > 0 ? saved : [...this.defaultMessages];

    this.renderMessages();
    this.bindEvents();
  },

  bindEvents() {
    const form = document.getElementById("chat-input-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleUserSubmit();
      });
    }

    // Quick suggestion chips
    document.querySelectorAll("[data-chat-prompt]").forEach(chip => {
      chip.addEventListener("click", () => {
        const query = chip.getAttribute("data-chat-prompt");
        this.processQuery(query);
      });
    });

    // Clear chat button
    const clearBtn = document.getElementById("clear-chat-btn");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        this.clearChat();
      });
    }
  },

  renderMessages() {
    if (!this.container) return;

    this.container.innerHTML = "";
    this.messages.forEach(msg => {
      this.appendMessageElement(msg, false);
    });

    this.scrollToBottom();
  },

  appendMessageElement(msg, scroll = true) {
    if (!this.container) return;

    const isUser = msg.sender === "user";
    const wrapper = document.createElement("div");
    wrapper.className = `flex flex-col ${isUser ? "items-end" : "items-start"} mb-4 animate-fade-in`;

    let html = "";

    if (isUser) {
      html = `
        <div class="flex items-end gap-2 max-w-[85%]">
          <div class="bg-blue-600 text-white rounded-2xl rounded-br-sm px-4 py-3 shadow-sm text-sm">
            <p class="whitespace-pre-line leading-relaxed">${this.escapeHTML(msg.text)}</p>
            <span class="block text-[10px] text-blue-200 text-right mt-1">${msg.time || "Just now"}</span>
          </div>
          <div class="w-7 h-7 rounded-full bg-blue-100 border border-blue-300 flex items-center justify-center text-xs flex-shrink-0 text-blue-700 font-bold">
            👤
          </div>
        </div>
      `;
    } else {
      html = `
        <div class="flex items-start gap-2 max-w-[92%]">
          <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-sm shadow-md flex-shrink-0">
            🤖
          </div>
          <div class="bg-white border border-slate-200 text-slate-800 rounded-2xl rounded-tl-sm p-4 shadow-sm text-sm flex-1">
            <div class="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-2">
              <span class="text-xs font-bold text-blue-600 flex items-center gap-1">
                <span>🛡️ Vamos AI Guide</span>
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </span>
              <button class="text-slate-400 hover:text-blue-600 text-xs transition" title="Listen to answer" onclick="window.AIAssistant.speakText(this)">
                🔊 Listen
              </button>
            </div>
            
            <div class="message-content text-slate-700 leading-relaxed text-sm space-y-2">
              ${this.formatBotMarkdown(msg.text)}
            </div>

            ${msg.priceGauge ? this.renderPriceGaugeHTML(msg.priceGauge) : ""}

            <span class="block text-[10px] text-slate-400 mt-2">${msg.time || "Just now"}</span>
          </div>
        </div>
      `;
    }

    wrapper.innerHTML = html;
    this.container.appendChild(wrapper);

    if (scroll) {
      this.scrollToBottom();
    }
  },

  renderPriceGaugeHTML(gauge) {
    return `
      <div class="mt-3.5 pt-3 border-t border-slate-100 bg-slate-50/80 rounded-xl p-3 border border-slate-200/80">
        <div class="flex items-center justify-between mb-1.5">
          <span class="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            📊 <span>Fair Fare Scam-Guard Analysis</span>
          </span>
          <span class="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
            ${gauge.distance || "Route Estimate"}
          </span>
        </div>
        <p class="text-xs text-slate-500 mb-2.5 font-medium">${gauge.route}</p>

        <!-- Dynamic Color Zone Bar -->
        <div class="space-y-1.5 mb-3">
          <div class="h-3 w-full rounded-full overflow-hidden flex bg-slate-200 shadow-inner">
            <div class="h-full bg-emerald-500 transition-all" style="width: 35%" title="Fair Price Zone"></div>
            <div class="h-full bg-amber-400 transition-all" style="width: 30%" title="Peak / Tourist Zone"></div>
            <div class="h-full bg-rose-500 transition-all" style="width: 35%" title="Scam / Overpriced Zone"></div>
          </div>
          <div class="flex justify-between text-[10px] font-medium text-slate-500 px-0.5">
            <span class="text-emerald-700 font-bold">🟢 Fair Zone</span>
            <span class="text-amber-700 font-bold">🟡 Tourist Surge</span>
            <span class="text-rose-700 font-bold">🔴 Overpriced Scam</span>
          </div>
        </div>

        <!-- Breakdown Details -->
        <div class="grid grid-cols-3 gap-1.5 text-center text-xs mb-2.5">
          <div class="bg-emerald-50 border border-emerald-200 rounded-lg p-1.5">
            <div class="text-[10px] text-emerald-600 font-bold">Fair Meter Rate</div>
            <div class="text-xs font-extrabold text-emerald-800">${gauge.greenLabel}</div>
          </div>
          <div class="bg-amber-50 border border-amber-200 rounded-lg p-1.5">
            <div class="text-[10px] text-amber-600 font-bold">Peak / Negotiable</div>
            <div class="text-xs font-extrabold text-amber-800">${gauge.yellowLabel}</div>
          </div>
          <div class="bg-rose-50 border border-rose-200 rounded-lg p-1.5">
            <div class="text-[10px] text-rose-600 font-bold">Scam Alert Price</div>
            <div class="text-xs font-extrabold text-rose-800">${gauge.redLabel}</div>
          </div>
        </div>

        <!-- Safe Tip -->
        <div class="bg-blue-50/70 border border-blue-200/70 rounded-lg p-2 text-xs text-blue-900 flex items-start gap-1.5">
          <span class="text-blue-600 text-sm">💡</span>
          <span class="leading-tight">${gauge.tip}</span>
        </div>
      </div>
    `;
  },

  handleUserSubmit() {
    if (!this.inputField || this.isTyping) return;
    const text = this.inputField.value.trim();
    if (!text) return;

    this.inputField.value = "";
    this.processQuery(text);
  },

  handlePresetQuery(query) {
    this.processQuery(query);
  },

  processQuery(userQuery) {
    const userMsg = {
      id: "msg-" + Date.now(),
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: userQuery
    };

    this.messages.push(userMsg);
    this.appendMessageElement(userMsg, true);
    this.saveState();

    this.showTypingIndicator();

    setTimeout(() => {
      this.removeTypingIndicator();
      const botResponse = this.generateBotResponse(userQuery);
      
      const botMsg = {
        id: "msg-" + (Date.now() + 1),
        sender: "bot",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: botResponse.text,
        priceGauge: botResponse.priceGauge || null
      };

      this.messages.push(botMsg);
      this.appendMessageElement(botMsg, true);
      this.saveState();
    }, 800);
  },

  generateBotResponse(query) {
    const q = query.toLowerCase();

    // 1. Auto Fare Estimate / Delhi Station to Red Fort
    if (q.includes("auto") || q.includes("fare") || q.includes("taxi") || q.includes("cab") || q.includes("red fort") || q.includes("meter")) {
      return {
        text: "Here is the verified government price benchmark and fare calculation for this route:",
        priceGauge: {
          route: "New Delhi Rly Station ➔ Red Fort / Old Delhi",
          distance: "4.5 km",
          greenLabel: "₹40 - ₹70",
          yellowLabel: "₹80 - ₹120",
          redLabel: "₹150+",
          tip: "Never pay ₹150+ for this route. Take the Violet Line Metro from Delhi Gate or book prepaid from the Delhi Police counter outside Paharganj exit."
        }
      };
    }

    // 2. Agra Cantt to Taj Mahal
    if (q.includes("agra") || q.includes("taj mahal") && (q.includes("auto") || q.includes("cost") || q.includes("distance"))) {
      return {
        text: "Here is the official UP Tourism & Police tariff benchmark for Agra Cantt Station to the Taj Mahal:",
        priceGauge: {
          route: "Agra Cantt Railway Station ➔ Taj Mahal East Gate",
          distance: "6.2 km",
          greenLabel: "₹100 - ₹150",
          yellowLabel: "₹160 - ₹220",
          redLabel: "₹300+",
          tip: "UP Police prepaid auto booth is located right on Platform 1 exit. Touts outside claiming the monument is closed are attempting a shopping commission scam."
        }
      };
    }

    // 3. Taj Mahal guide scam check & entry ticket
    if (q.includes("guide") || q.includes("taj") || q.includes("scam") || q.includes("ticket")) {
      return {
        text: "**Taj Mahal Guide & Ticket Scam Advisory:**\n\n• **Official Ticket Price:** ₹50 for Indian citizens, ₹1,100 for Foreign tourists (plus ₹200 for main mausoleum).\n• **Official Guides:** Book only at the ASI ticket office window. Approved guides carry a blue/green badge with hologram.\n• **Warning:** Beware of touts claiming 'VIP instant entry' or asserting the main gate is closed for renovation."
      };
    }

    // 4. Temple Dress code
    if (q.includes("dress") || q.includes("temple") || q.includes("cloth") || q.includes("shoes") || q.includes("custom")) {
      return {
        text: "**Indian Temple & Heritage Dress Code Etiquette:**\n\n1. **Cover Shoulders & Knees:** Wear trousers, long skirts, or traditional Kurtas/Sarees.\n2. **Footwear:** Strictly remove shoes/socks at designated free shoe-care counters before entering.\n3. **Leather Items:** Some traditional temples (e.g. in South India) restrict leather belts & wallets inside the sanctum.\n4. **Photography:** Always check for 'Photography Prohibited' signboards inside inner courtyards."
      };
    }

    // 5. Hindi phrase for meter
    if (q.includes("hindi") || q.includes("translate") || q.includes("bhaiya") || q.includes("ask")) {
      return {
        text: "**How to insist on Meter in Hindi:**\n\n🗣️ *'Bhaiya, meter chalu kijiye.'*\n(Brother, please turn on the digital meter).\n\nIf they refuse or quote high price:\n🗣️ *'Prepaid booth se ticket le raha hoon.'*\n(I am buying from the police prepaid counter)."
      };
    }

    // 6. Emergency numbers
    if (q.includes("emergency") || q.includes("help") || q.includes("police") || q.includes("number") || q.includes("ambulance")) {
      return {
        text: "**Emergency Tourist Helplines in India:**\n\n🚨 **112** - National All-in-One Emergency (Police, Fire, Medical)\n🛡️ **1363** - Ministry of Tourism 24x7 Multi-lingual Tourist Support\n🚑 **108** - Ambulance Emergency\n👩 **1091** - Women Helpline"
      };
    }

    // 7. General Food / Safety fallback
    if (q.includes("food") || q.includes("water") || q.includes("hygiene") || q.includes("eat")) {
      return {
        text: "**Safe Dining & Water Rules for Travelers:**\n\n• Always drink sealed branded bottled water (Kinley, Aquafina, Bisleri).\n• Eat at busy restaurants with high turnover (look for our 'Verified Safe' badge in the app).\n• Ask for *'Kam mirch'* (less spicy) when ordering local specialties."
      };
    }

    // Default intelligent response
    return {
      text: `Regarding your query about **"${query}"**:\n\nOur safety algorithm recommends sticking to verified tourist zones, booking rides via authorized prepaid police booths or app-based GPS cabs (Uber/Ola), and keeping emergency speed dials (112 & 1363) ready.\n\nWould you like a fare calculation for a specific route or a cultural Do's & Don'ts guide?`
    };
  },

  showTypingIndicator() {
    this.isTyping = true;
    const indicator = document.createElement("div");
    indicator.id = "bot-typing-indicator";
    indicator.className = "flex items-center gap-2 mb-4 animate-fade-in";
    indicator.innerHTML = `
      <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs shadow-md">🤖</div>
      <div class="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-2.5 shadow-sm flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style="animation-delay: 0ms"></span>
        <span class="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style="animation-delay: 150ms"></span>
        <span class="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style="animation-delay: 300ms"></span>
        <span class="text-xs text-slate-500 ml-1 font-medium">Analyzing fare & safety databases...</span>
      </div>
    `;
    this.container.appendChild(indicator);
    this.scrollToBottom();
  },

  removeTypingIndicator() {
    this.isTyping = false;
    const indicator = document.getElementById("bot-typing-indicator");
    if (indicator) indicator.remove();
  },

  scrollToBottom() {
    if (this.container) {
      this.container.scrollTop = this.container.scrollHeight;
    }
  },

  speakText(btnElement) {
    const card = btnElement.closest(".bg-white");
    if (!card) return;
    const text = card.querySelector(".message-content").innerText;
    
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
      btnElement.classList.add("text-blue-600", "font-bold");
      utterance.onend = () => btnElement.classList.remove("text-blue-600", "font-bold");
    } else {
      alert("Text-to-speech is not supported on this browser.");
    }
  },

  formatBotMarkdown(text) {
    if (!text) return "";
    let html = this.escapeHTML(text);
    
    // Bold **text**
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong class='font-bold text-slate-900'>$1</strong>");
    // Italic *text*
    html = html.replace(/\*(.*?)\*/g, "<em class='italic text-slate-700'>$1</em>");
    // Bullet points •
    html = html.replace(/^• (.*?)$/gm, "<div class='flex items-start gap-1.5 my-1'><span class='text-blue-600 font-bold'>•</span><span>$1</span></div>");
    // Numbered lists 1. 2.
    html = html.replace(/^(\d+)\. (.*?)$/gm, "<div class='flex items-start gap-1.5 my-1'><span class='text-blue-600 font-bold'>$1.</span><span>$2</span></div>");
    // New lines to paragraphs
    html = html.replace(/\n\n/g, "</p><p class='mt-1.5'>");

    return `<p>${html}</p>`;
  },

  escapeHTML(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  },

  saveState() {
    if (window.StorageManager) {
      window.StorageManager.saveChatHistory(this.messages);
    }
  },

  clearChat() {
    this.messages = [...this.defaultMessages];
    if (window.StorageManager) {
      window.StorageManager.clearChatHistory();
    }
    this.renderMessages();
  }
};

window.AIAssistant = AIAssistant;
