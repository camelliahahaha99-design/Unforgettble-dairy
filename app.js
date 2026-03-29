const STORAGE_KEY = "thought-prototype-entries-v2";
const JOURNAL_NAME_KEY = "thought-prototype-name-v1";
const FORMAT_KEY = "thought-prototype-format-v2";
const SETTINGS_KEY = "thought-prototype-ai-settings-v1";
const SUMMARIES_KEY = "thought-prototype-summaries-v2";
const DB_NAME = "nian-nian-zhi-jian-db";
const STORE_NAME = "kv";
const DEFAULT_BACKGROUND_VIDEO = "./background-2026-03-30.mp4";
const FONT_SIZE_OPTIONS = [12, 16, 20, 24, 28];
const LINE_HEIGHT_OPTIONS = [1.0, 1.5, 2.0];
// The raindrop logic below is an original browser adaptation inspired by
// "Heartfelt" by Martijn Steinrucken (BigWings) on Shadertoy.

const elements = {
  canvas: document.querySelector(".rain-canvas"),
  leftPanel: document.getElementById("leftPanel"),
  rightPanel: document.getElementById("rightPanel"),
  leftPanelMoveHandle: document.getElementById("leftPanelMoveHandle"),
  rightPanelMoveHandle: document.getElementById("rightPanelMoveHandle"),
  leftPanelResizeLeft: document.getElementById("leftPanelResizeLeft"),
  leftPanelResizeHandle: document.getElementById("leftPanelResizeHandle"),
  rightPanelResizeHandle: document.getElementById("rightPanelResizeHandle"),
  rightPanelResizeRight: document.getElementById("rightPanelResizeRight"),
  leftPanelResizeTop: document.getElementById("leftPanelResizeTop"),
  leftPanelResizeBottom: document.getElementById("leftPanelResizeBottom"),
  rightPanelResizeTop: document.getElementById("rightPanelResizeTop"),
  rightPanelResizeBottom: document.getElementById("rightPanelResizeBottom"),
  leftPanelCornerTL: document.getElementById("leftPanelCornerTL"),
  leftPanelCornerTR: document.getElementById("leftPanelCornerTR"),
  leftPanelCornerBL: document.getElementById("leftPanelCornerBL"),
  leftPanelCornerBR: document.getElementById("leftPanelCornerBR"),
  rightPanelCornerTL: document.getElementById("rightPanelCornerTL"),
  rightPanelCornerTR: document.getElementById("rightPanelCornerTR"),
  rightPanelCornerBL: document.getElementById("rightPanelCornerBL"),
  rightPanelCornerBR: document.getElementById("rightPanelCornerBR"),
  leftPanelDock: document.getElementById("leftPanelDock"),
  rightPanelDock: document.getElementById("rightPanelDock"),
  image: document.querySelector(".media-image"),
  video: document.querySelector(".media-video"),
  mediaInput: document.getElementById("mediaInput"),
  inlineImageInput: document.getElementById("inlineImageInput"),
  uploadTrigger: document.getElementById("uploadTrigger"),
  resetBackground: document.getElementById("resetBackground"),
  insertImage: document.getElementById("insertImage"),
  journalName: document.getElementById("journalName"),
  entryMetaTime: document.getElementById("entryMetaTime"),
  entryMetaDate: document.getElementById("entryMetaDate"),
  saveIndicator: document.getElementById("saveIndicator"),
  statStreak: document.getElementById("statStreak"),
  statEntries: document.getElementById("statEntries"),
  statWeek: document.getElementById("statWeek"),
  statWords: document.getElementById("statWords"),
  settingsPanel: document.getElementById("settingsPanel"),
  toggleSettings: document.getElementById("toggleSettings"),
  providerSelect: document.getElementById("providerSelect"),
  apiKeyInput: document.getElementById("apiKeyInput"),
  toggleApiVisibility: document.getElementById("toggleApiVisibility"),
  eyeOpenIcon: document.getElementById("eyeOpenIcon"),
  eyeOffIcon: document.getElementById("eyeOffIcon"),
  saveApiKey: document.getElementById("saveApiKey"),
  navButtons: Array.from(document.querySelectorAll(".nav-pill")),
  viewPanels: Array.from(document.querySelectorAll(".view-panel")),
  mobileMenu: document.getElementById("mobileMenu"),
  mobileSettings: document.getElementById("mobileSettings"),
  mobileTitle: document.getElementById("mobileTitle"),
  mobileSettingsSheet: document.getElementById("mobileSettingsSheet"),
  mobileSettingsBackdrop: document.getElementById("mobileSettingsBackdrop"),
  mobileSettingsClose: document.getElementById("mobileSettingsClose"),
  mobileProviderSelect: document.getElementById("mobileProviderSelect"),
  mobileApiKeyInput: document.getElementById("mobileApiKeyInput"),
  mobileToggleApiVisibility: document.getElementById("mobileToggleApiVisibility"),
  mobileEyeOpenIcon: document.getElementById("mobileEyeOpenIcon"),
  mobileEyeOffIcon: document.getElementById("mobileEyeOffIcon"),
  mobileSaveApiKey: document.getElementById("mobileSaveApiKey"),
  entryBody: document.getElementById("entryBody"),
  micButton: document.getElementById("micButton"),
  micLabel: document.getElementById("micLabel"),
  polishEntry: document.getElementById("polishEntry"),
  saveEntry: document.getElementById("saveEntry"),
  polishedPreview: document.getElementById("polishedPreview"),
  connectionsList: document.getElementById("connectionsList"),
  noteStream: document.getElementById("noteStream"),
  streamMeta: document.getElementById("streamMeta"),
  toggleBold: document.getElementById("toggleBold"),
  toggleUnderline: document.getElementById("toggleUnderline"),
  toggleOrderedList: document.getElementById("toggleOrderedList"),
  toggleBulletList: document.getElementById("toggleBulletList"),
  fontSizeControl: document.getElementById("fontSizeControl"),
  lineHeightControl: document.getElementById("lineHeightControl"),
  formatToolbar: document.getElementById("formatToolbar"),
  mobileFormatToggle: document.getElementById("mobileFormatToggle"),
  generateDaily: document.getElementById("generateDaily"),
  generateWeekly: document.getElementById("generateWeekly"),
  generateMonthly: document.getElementById("generateMonthly"),
  dailySummaryMeta: document.getElementById("dailySummaryMeta"),
  weeklySummaryMeta: document.getElementById("weeklySummaryMeta"),
  monthlySummaryMeta: document.getElementById("monthlySummaryMeta"),
  dailySummaryBody: document.getElementById("dailySummaryBody"),
  weeklySummaryBody: document.getElementById("weeklySummaryBody"),
  monthlySummaryBody: document.getElementById("monthlySummaryBody"),
  dailyHistory: document.getElementById("dailyHistory"),
  weeklyHistory: document.getElementById("weeklyHistory"),
  monthlyHistory: document.getElementById("monthlyHistory"),
  dailyManual: document.getElementById("dailyManual"),
  weeklyManual: document.getElementById("weeklyManual"),
  monthlyManual: document.getElementById("monthlyManual"),
  summaryMicButtons: Array.from(document.querySelectorAll(".summary-mic")),
  saveManualButtons: Array.from(document.querySelectorAll(".save-manual")),
  archiveSearch: document.getElementById("archiveSearch"),
  calendarGrid: document.getElementById("calendarGrid"),
  calendarLabel: document.getElementById("calendarLabel"),
  prevMonth: document.getElementById("prevMonth"),
  nextMonth: document.getElementById("nextMonth"),
  archiveDateLabel: document.getElementById("archiveDateLabel"),
  archiveBody: document.getElementById("archiveBody"),
  archiveConnections: document.getElementById("archiveConnections"),
  jumpToSpark: document.getElementById("jumpToSpark"),
  consoleFab: document.getElementById("consoleFab"),
  togglePanelsFab: document.getElementById("togglePanelsFab"),
  controlPanel: document.getElementById("controlPanel"),
  panelClose: document.getElementById("panelClose"),
  rainAmount: document.getElementById("rainAmount"),
  mistAmount: document.getElementById("mistAmount"),
  refraction: document.getElementById("refraction"),
  trailSpeed: document.getElementById("trailSpeed"),
  blurDepth: document.getElementById("blurDepth"),
  backgroundBlur: document.getElementById("backgroundBlur"),
  leftPanelOpacity: document.getElementById("leftPanelOpacity"),
  rightPanelOpacity: document.getElementById("rightPanelOpacity"),
  resetScene: document.getElementById("resetScene"),
  clearMedia: document.getElementById("clearMedia"),
  apiReminder: document.getElementById("apiReminder"),
  closeApiReminder: document.getElementById("closeApiReminder"),
};

const state = {
  currentView: "spark",
  selectedDate: toDateInput(new Date()),
  displayMonth: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  entries: {},
  summaries: {},
  format: {
    fontSize: 20,
    lineHeight: 1.5,
    bold: false,
    underline: false,
  },
  aiSettings: {
    provider: "deepseek",
    apiKey: "",
  },
  recognition: null,
  isRecording: false,
  activeSpeechTarget: null,
  speechBaseHtml: "",
  editingNoteId: null,
  archiveQuery: "",
  activeSummaryVersion: {
    daily: null,
    weekly: null,
    monthly: null,
  },
  journalName: "念念之间",
  selectedImage: null,
  settings: {
    rainAmount: 0.58,
    mistAmount: 0.18,
    refraction: 0.84,
    trailSpeed: 0.9,
    blurDepth: 0.42,
    backgroundBlur: 0.1,
    leftPanelOpacity: 0.24,
    rightPanelOpacity: 0.2,
    leftPanelSize: 292,
    rightPanelSize: 1200,
    leftPanelHeight: window.innerHeight - 28,
    rightPanelHeight: window.innerHeight - 28,
    leftPanelX: 14,
    leftPanelY: 14,
    rightPanelX: 324,
    rightPanelY: 14,
  },
  media: {
    type: "gradient",
    image: null,
    video: null,
  },
  gl: null,
  program: null,
  uniforms: null,
  texture: null,
  buffer: null,
  startTime: performance.now(),
  panelsHidden: false,
};

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) db.createObjectStore(STORE_NAME);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function dbGet(key, fallback) {
  try {
    const db = await openDB();
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result ?? fallback);
      request.onerror = () => reject(request.error);
    });
  } catch {
    return fallback;
  }
}

async function dbSet(key, value) {
  const db = await openDB();
  return await new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).put(value, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

function saveJSON(key, value) {
  void dbSet(key, value);
}

function normalizeEntries(raw) {
  const normalized = {};
  Object.entries(raw || {}).forEach(([date, value]) => {
    if (Array.isArray(value?.notes)) {
      normalized[date] = {
        notes: value.notes.map((note) => ({
          id: note.id || `${Date.now()}-${Math.random()}`,
          html: note.html || escapeHtml(note.content || ""),
          text: note.text || stripHtml(note.html || note.content || ""),
          createdAt: note.createdAt || "此刻",
        })),
      };
    } else if (value?.content) {
      normalized[date] = {
        notes: [
          {
            id: `${date}-legacy`,
            html: value.content.replace(/\n/g, "<br>"),
            text: value.content,
            createdAt: value.updatedAt || "此刻",
          },
        ],
      };
    }
  });
  return normalized;
}

function ensureDay(dateKey) {
  if (!state.entries[dateKey]) {
    state.entries[dateKey] = { notes: [] };
  }
  return state.entries[dateKey];
}

function toDateInput(date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
}

function dateStamp(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
}

function formatChineseDate(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
}

function currentTimeText() {
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

function stripHtml(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent?.trim() || "";
}

function updateMeta(dateKey, timeText) {
  elements.entryMetaTime.textContent = timeText || "此刻";
  elements.entryMetaDate.textContent = dateStamp(dateKey);
}

function markSaved(message) {
  elements.saveIndicator.textContent = message;
}

function switchView(view) {
  state.currentView = view;
  elements.navButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === view);
  });
  elements.viewPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.viewPanel === view);
  });
  elements.mobileTitle.textContent = { spark: "灵光", gather: "拾掇", echo: "回响" }[view];
  syncResponsiveUI();
}

function bindNavigation() {
  elements.navButtons.forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.view));
  });
  elements.mobileMenu.addEventListener("click", () => {
    const order = ["spark", "gather", "echo"];
    switchView(order[(order.indexOf(state.currentView) + 1) % order.length]);
  });
  elements.mobileSettings.addEventListener("click", () => {
    openMobileSettingsSheet();
  });
  elements.jumpToSpark.addEventListener("click", () => switchView("spark"));
}

function syncSettingsFields() {
  elements.providerSelect.value = state.aiSettings.provider;
  elements.apiKeyInput.value = state.aiSettings.apiKey;
  if (elements.mobileProviderSelect) elements.mobileProviderSelect.value = state.aiSettings.provider;
  if (elements.mobileApiKeyInput) elements.mobileApiKeyInput.value = state.aiSettings.apiKey;
}

function setSecretFieldVisibility(input, openIcon, offIcon, visible) {
  if (!input) return;
  input.type = visible ? "text" : "password";
  openIcon?.classList.toggle("hidden", !visible);
  offIcon?.classList.toggle("hidden", visible);
}

function openMobileSettingsSheet() {
  if (!elements.mobileSettingsSheet) return;
  syncSettingsFields();
  elements.mobileSettingsSheet.classList.remove("hidden");
}

function closeMobileSettingsSheet() {
  elements.mobileSettingsSheet?.classList.add("hidden");
}

function saveApiSettings(provider, apiKey) {
  state.aiSettings.provider = provider;
  state.aiSettings.apiKey = apiKey.trim();
  saveJSON(SETTINGS_KEY, state.aiSettings);
  syncSettingsFields();
  markSaved(state.aiSettings.apiKey ? "API Key 已保存在本地" : "未填写 API Key");
}

function isMobileViewport() {
  return window.matchMedia("(max-width: 760px)").matches;
}

function syncResponsiveUI() {
  if (!elements.formatToolbar || !elements.mobileFormatToggle) return;
  const mobile = isMobileViewport();
  const showToolbar = mobile && state.currentView === "spark" && elements.mobileFormatToggle.getAttribute("aria-expanded") === "true";
  elements.formatToolbar.classList.toggle("is-open", showToolbar);
  elements.mobileFormatToggle.classList.toggle("is-active", showToolbar);
  if (!mobile) {
    elements.mobileFormatToggle.setAttribute("aria-expanded", "false");
    elements.formatToolbar.classList.remove("is-open");
  }
}

function bindSettings() {
  syncSettingsFields();
  elements.toggleSettings.addEventListener("click", () => {
    elements.settingsPanel.classList.toggle("hidden");
  });
  elements.toggleApiVisibility.addEventListener("click", () => {
    setSecretFieldVisibility(
      elements.apiKeyInput,
      elements.eyeOpenIcon,
      elements.eyeOffIcon,
      elements.apiKeyInput.type !== "text"
    );
  });
  elements.saveApiKey.addEventListener("click", () => {
    saveApiSettings(elements.providerSelect.value, elements.apiKeyInput.value);
  });
  elements.mobileToggleApiVisibility?.addEventListener("click", () => {
    setSecretFieldVisibility(
      elements.mobileApiKeyInput,
      elements.mobileEyeOpenIcon,
      elements.mobileEyeOffIcon,
      elements.mobileApiKeyInput.type !== "text"
    );
  });
  elements.mobileSaveApiKey?.addEventListener("click", () => {
    saveApiSettings(elements.mobileProviderSelect.value, elements.mobileApiKeyInput.value);
    closeMobileSettingsSheet();
  });
  elements.mobileSettingsBackdrop?.addEventListener("click", closeMobileSettingsSheet);
  elements.mobileSettingsClose?.addEventListener("click", closeMobileSettingsSheet);
  elements.closeApiReminder.addEventListener("click", () => {
    elements.apiReminder.classList.add("hidden");
  });
  elements.apiReminder.addEventListener("click", (event) => {
    if (event.target === elements.closeApiReminder) return;
    if (isMobileViewport()) openMobileSettingsSheet();
    else elements.settingsPanel.classList.remove("hidden");
    elements.apiReminder.classList.add("hidden");
  });
}

function applyFormatSettings() {
  document.documentElement.style.setProperty("--doc-font-size", `${state.format.fontSize}px`);
  document.documentElement.style.setProperty("--doc-line-height", String(state.format.lineHeight));
  document.documentElement.style.setProperty("--doc-font-weight", state.format.bold ? "600" : "500");
  document.documentElement.style.setProperty("--doc-text-decoration", state.format.underline ? "underline" : "none");
  elements.toggleBold.classList.toggle("is-active", state.format.bold);
  elements.toggleUnderline.classList.toggle("is-active", state.format.underline);
  elements.fontSizeControl.value = String(Math.max(0, FONT_SIZE_OPTIONS.indexOf(state.format.fontSize)));
  elements.lineHeightControl.value = String(Math.max(0, LINE_HEIGHT_OPTIONS.indexOf(state.format.lineHeight)));
  saveJSON(FORMAT_KEY, state.format);
}

function execEditorCommand(command) {
  document.execCommand("styleWithCSS", false, true);
  document.execCommand(command, false);
  focusActiveEditor();
}

function applyStyleToSelection(styleText, tagName = "span") {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
    return;
  }
  const range = selection.getRangeAt(0);
  const span = document.createElement(tagName);
  span.style.cssText = styleText;
  span.appendChild(range.extractContents());
  range.insertNode(span);
  const nextRange = document.createRange();
  nextRange.selectNodeContents(span);
  selection.removeAllRanges();
  selection.addRange(nextRange);
}

function focusActiveEditor() {
  (document.activeElement instanceof HTMLElement ? document.activeElement : elements.entryBody)?.focus();
}

function bindFormatting() {
  elements.mobileFormatToggle?.addEventListener("click", () => {
    const expanded = elements.mobileFormatToggle.getAttribute("aria-expanded") === "true";
    elements.mobileFormatToggle.setAttribute("aria-expanded", expanded ? "false" : "true");
    syncResponsiveUI();
  });
  elements.toggleBold.addEventListener("click", () => applyStyleToSelection("font-weight:700;"));
  elements.toggleUnderline.addEventListener("click", () => execEditorCommand("underline"));
  elements.toggleOrderedList.addEventListener("click", () => execEditorCommand("insertOrderedList"));
  elements.toggleBulletList.addEventListener("click", () => execEditorCommand("insertUnorderedList"));

  elements.fontSizeControl.addEventListener("input", () => {
    const size = FONT_SIZE_OPTIONS[Number(elements.fontSizeControl.value)] ?? 20;
    applyStyleToSelection(`font-size:${size}px;`);
  });
  elements.lineHeightControl.addEventListener("input", () => {
    const lh = LINE_HEIGHT_OPTIONS[Number(elements.lineHeightControl.value)] ?? 1.5;
    applyStyleToSelection(`line-height:${lh}; display:inline-block; width:100%;`, "div");
  });
}

function bindEditor() {
  elements.journalName.value = state.journalName;
  elements.journalName.addEventListener("input", () => {
    state.journalName = elements.journalName.value.trim() || "念念之间";
    saveJSON(JOURNAL_NAME_KEY, state.journalName);
  });
  elements.saveEntry.addEventListener("click", saveCurrentNote);
  elements.polishEntry.addEventListener("click", polishCurrentEntry);
  elements.insertImage.addEventListener("click", () => elements.inlineImageInput.click());
  elements.inlineImageInput.addEventListener("change", insertInlineImage);
  elements.entryBody.addEventListener("click", (event) => {
    const wrapper = event.target instanceof HTMLElement ? event.target.closest(".resizable-image") : null;
    if (wrapper) {
      if (state.selectedImage) state.selectedImage.classList.remove("is-selected");
      state.selectedImage = wrapper;
      state.selectedImage.classList.add("is-selected");
      return;
    }
    if (state.selectedImage) state.selectedImage.classList.remove("is-selected");
    state.selectedImage = null;
  });
}

function saveCurrentNote() {
  const html = elements.entryBody.innerHTML.trim();
  const text = stripHtml(html);
  if (!text) {
    markSaved("先说一句或写一句，再记下一条");
    return;
  }

  const day = ensureDay(state.selectedDate);
  if (state.editingNoteId) {
    const target = day.notes.find((note) => note.id === state.editingNoteId);
    if (target) {
      target.html = html;
      target.text = text;
      target.createdAt = `${currentTimeText()} · 已修改`;
    }
  } else {
    day.notes.unshift({
      id: `note-${Date.now()}`,
      html,
      text,
      createdAt: currentTimeText(),
    });
  }

  elements.entryBody.innerHTML = "";
  state.editingNoteId = null;
  elements.saveEntry.querySelector("span:last-child").textContent = "记下一条";
  saveJSON(STORAGE_KEY, state.entries);
  syncAllViews();
  markSaved("已保存记录");
}

function renderNoteStream() {
  const notes = ensureDay(state.selectedDate).notes;
  elements.streamMeta.textContent = `${formatChineseDate(state.selectedDate)} · 已记录 ${notes.length} 条`;
  if (!notes.length) {
    elements.noteStream.innerHTML = '<p class="empty-copy">还没有记录。说一句、写一句，就会生成一张新的记录卡片。</p>';
    return;
  }

  elements.noteStream.innerHTML = notes
    .map(
      (note, index) => `
        <article class="note-card">
          <div class="note-card-head">
            <span>第 ${notes.length - index} 条</span>
            <div class="note-card-actions">
              <span>${note.createdAt}</span>
              <button class="note-mini-button" data-edit-note="${note.id}" type="button">编辑</button>
              <button class="note-mini-button" data-delete-note="${note.id}" type="button">删除</button>
            </div>
          </div>
          <div class="note-card-body">${note.html}</div>
        </article>
      `
    )
    .join("");

  elements.noteStream.querySelectorAll("[data-edit-note]").forEach((button) => {
    button.addEventListener("click", () => startEditNote(button.dataset.editNote));
  });
  elements.noteStream.querySelectorAll("[data-delete-note]").forEach((button) => {
    button.addEventListener("click", () => deleteNote(button.dataset.deleteNote));
  });
}

function startEditNote(noteId) {
  const note = ensureDay(state.selectedDate).notes.find((item) => item.id === noteId);
  if (!note) return;
  state.editingNoteId = noteId;
  elements.entryBody.innerHTML = note.html;
  elements.saveEntry.querySelector("span:last-child").textContent = "保存修改";
  switchView("spark");
  elements.entryBody.focus();
  markSaved("正在编辑这条记录");
}

function deleteNote(noteId) {
  const day = ensureDay(state.selectedDate);
  day.notes = day.notes.filter((note) => note.id !== noteId);
  if (state.editingNoteId === noteId) {
    state.editingNoteId = null;
    elements.entryBody.innerHTML = "";
    elements.saveEntry.querySelector("span:last-child").textContent = "记下一条";
  }
  saveJSON(STORAGE_KEY, state.entries);
  syncAllViews();
  markSaved("已删除记录");
}

function getTodayCombinedText(dateKey) {
  return ensureDay(dateKey).notes.map((note) => note.text).join("\n");
}

function renderConnections(container, dateKey) {
  const related = findRelatedEntries(dateKey);
  if (!related.length) {
    container.innerHTML = '<p class="empty-copy">还没有找到足够相近的旧记录。</p>';
    return;
  }

  container.innerHTML = related
    .map(
      (item) => `
        <article class="connection-item">
          <strong>${dateStamp(item.date)} · 相似度 ${Math.round(item.score * 100)}%</strong>
          <div>${escapeHtml(item.snippet)}</div>
        </article>
      `
    )
    .join("");
}

function tokenize(text) {
  return Array.from(new Set((text.match(/[\u4e00-\u9fa5]{1,2}|[a-zA-Z0-9]+/g) || []).filter(Boolean)));
}

function similarity(a, b) {
  const sa = new Set(tokenize(a));
  const sb = new Set(tokenize(b));
  if (!sa.size || !sb.size) return 0;
  let shared = 0;
  sa.forEach((token) => {
    if (sb.has(token)) shared += 1;
  });
  return shared / Math.max(sa.size, sb.size);
}

function findRelatedEntries(dateKey) {
  const currentText = getTodayCombinedText(dateKey);
  if (!currentText) return [];

  return Object.entries(state.entries)
    .filter(([date]) => date !== dateKey)
    .map(([date, value]) => ({
      date,
      score: similarity(currentText, value.notes.map((note) => note.text).join("\n")),
      snippet: value.notes[0]?.text?.slice(0, 72) || "",
    }))
    .filter((item) => item.score >= 0.15)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

async function callAI(userPrompt) {
  const { provider, apiKey } = state.aiSettings;
  if (!apiKey) throw new Error("请先在左侧填写并保存 API Key。");

  const isDeepSeek = provider === "deepseek";
  const url = isDeepSeek
    ? "https://api.deepseek.com/chat/completions"
    : "https://api.openai.com/v1/chat/completions";
  const model = isDeepSeek ? "deepseek-chat" : "gpt-4.1-mini";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.6,
      messages: [
        {
          role: "system",
          content:
            "你是一个擅长中文整理与总结的写作助手。请保留原意，不杜撰事实；输出要简洁、有逻辑、有层次。",
        },
        { role: "user", content: userPrompt },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`AI 调用失败：${(await response.text()).slice(0, 140)}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || "模型没有返回内容。";
}

async function polishCurrentEntry() {
  const text = stripHtml(elements.entryBody.innerHTML);
  if (!text) {
    markSaved("先写一点内容，再做整理");
    return;
  }
  elements.polishedPreview.textContent = "正在整理中…";
  try {
    const result = await callAI(`
请帮我整理下面这段零碎想法：
1. 结合前后文语境理解原意，不夸张，不改立场
2. 修改明显错别字、错误标点
3. 调整混乱的语序，使表达更有逻辑和条理
4. 保留说话者原本的意思与情绪，不要写成另一个人
5. 不要加标题

原文：
${text}
`);
    elements.polishedPreview.textContent = result;
    elements.entryBody.innerHTML = escapeHtml(result).replace(/\n/g, "<br>");
    markSaved("AI 整理完成");
  } catch (error) {
    elements.polishedPreview.textContent = error.message;
    markSaved("AI 整理失败");
  }
}

function insertInlineImage(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    focusActiveEditor();
    document.execCommand(
      "insertHTML",
      false,
      `<span class="resizable-image" contenteditable="false" style="width:320px;"><img src="${reader.result}" alt="本地图片" /></span><br>`
    );
  };
  reader.readAsDataURL(file);
  event.target.value = "";
}

function renderCalendar() {
  elements.calendarLabel.textContent = state.displayMonth.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
  });
  elements.calendarGrid.innerHTML = "";
  const firstDay = new Date(state.displayMonth.getFullYear(), state.displayMonth.getMonth(), 1);
  const lastDay = new Date(state.displayMonth.getFullYear(), state.displayMonth.getMonth() + 1, 0);
  const startOffset = firstDay.getDay();

  for (let i = 0; i < startOffset; i += 1) {
    const empty = document.createElement("button");
    empty.className = "calendar-day is-empty";
    elements.calendarGrid.appendChild(empty);
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    const dateKey = toDateInput(new Date(state.displayMonth.getFullYear(), state.displayMonth.getMonth(), day));
    const btn = document.createElement("button");
    btn.className = "calendar-day";
    btn.textContent = String(day);
    if (state.selectedDate === dateKey) btn.classList.add("is-selected");
    if ((state.entries[dateKey]?.notes || []).length) btn.classList.add("has-entry");
    btn.addEventListener("click", () => {
      state.selectedDate = dateKey;
      syncAllViews();
      markSaved("已切换到所选日期");
    });
    elements.calendarGrid.appendChild(btn);
  }
}

function renderArchive() {
  if (state.archiveQuery) {
    const matches = Object.entries(state.entries)
      .flatMap(([date, value]) =>
        value.notes
          .filter((note) => note.text.toLowerCase().includes(state.archiveQuery.toLowerCase()))
          .map((note) => ({ date, note }))
      );
    elements.archiveDateLabel.textContent = `搜索：${state.archiveQuery}`;
    elements.archiveBody.innerHTML = matches.length
      ? matches
          .map(
            ({ date, note }) =>
              `<div class="note-card" style="margin-bottom:10px;"><div class="note-card-head"><span>${formatChineseDate(date)}</span><span>${note.createdAt}</span></div><div class="note-card-body">${note.html}</div></div>`
          )
          .join("")
      : "没有找到匹配这个关键字的记录。";
  } else {
    const notes = ensureDay(state.selectedDate).notes;
    elements.archiveDateLabel.textContent = formatChineseDate(state.selectedDate);
    elements.archiveBody.innerHTML = notes.length
      ? notes
          .map(
            (note) =>
              `<div class="note-card" style="margin-bottom:10px;"><div class="note-card-head"><span>${note.createdAt}</span></div><div class="note-card-body">${note.html}</div></div>`
          )
          .join("")
      : "这一天还没有记录。";
  }
  renderConnections(elements.archiveConnections, state.selectedDate);
  renderConnections(elements.connectionsList, state.selectedDate);
}

function renderStats() {
  const dates = Object.keys(state.entries).filter((date) => ensureDay(date).notes.length).sort();
  const totalEntries = dates.reduce((sum, date) => sum + ensureDay(date).notes.length, 0);
  const totalWords = dates.reduce((sum, date) => sum + ensureDay(date).notes.reduce((acc, note) => acc + note.text.length, 0), 0);
  elements.statEntries.textContent = String(totalEntries);
  elements.statWords.textContent = String(totalWords);
  elements.statStreak.textContent = String(calculateStreak(dates));
  elements.statWeek.textContent = String(countEntriesInCurrentWeek(dates));
}

function calculateStreak(dates) {
  if (!dates.length) return 0;
  let streak = 0;
  let cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  const set = new Set(dates);
  while (set.has(toDateInput(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function countEntriesInCurrentWeek(dates) {
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - now.getDay());
  start.setHours(0, 0, 0, 0);
  return dates.filter((dateKey) => new Date(`${dateKey}T00:00:00`) >= start).reduce((sum, key) => sum + ensureDay(key).notes.length, 0);
}

function renderSummaryBlock(metaEl, bodyEl, manualEl, summary, emptyText) {
  if (!summary) {
    bodyEl.textContent = emptyText;
    manualEl.innerHTML = "";
    return;
  }
  metaEl.textContent = `${summary.startDate} 至 ${summary.endDate} · ${summary.generatedAt}`;
  bodyEl.textContent = summary.ai || emptyText;
  manualEl.innerHTML = summary.manualHtml || "";
}

function renderSummaries() {
  [
    ["daily", elements.dailySummaryMeta, elements.dailySummaryBody, elements.dailyManual, elements.dailyHistory, "还没有每日总结。"],
    ["weekly", elements.weeklySummaryMeta, elements.weeklySummaryBody, elements.weeklyManual, elements.weeklyHistory, "还没有每周总结。"],
    ["monthly", elements.monthlySummaryMeta, elements.monthlySummaryBody, elements.monthlyManual, elements.monthlyHistory, "还没有每月总结。"],
  ].forEach(([kind, metaEl, bodyEl, manualEl, historyEl, emptyText]) => {
    const list = historyByKind(kind);
    if (!state.activeSummaryVersion[kind] && list[0]) state.activeSummaryVersion[kind] = list[0].id;
    const current = list.find((item) => item.id === state.activeSummaryVersion[kind]) || list[0];
    renderSummaryBlock(metaEl, bodyEl, manualEl, current, emptyText);
    renderSummaryHistory(historyEl, list, kind);
  });
}

function historyByKind(kind) {
  return Object.values(state.summaries)
    .filter((s) => s.kind === kind)
    .sort((a, b) => b.startDate.localeCompare(a.startDate));
}

function renderSummaryHistory(container, list, kind) {
  if (!list.length) {
    container.innerHTML = "";
    return;
  }
  container.innerHTML = list
    .map(
      (item) => `
        <article class="summary-history-item">
          <div class="summary-history-head">
            <span>${item.startDate} - ${item.endDate}</span>
            <div class="summary-history-actions">
              <button class="note-mini-button" data-load-summary="${kind}:${item.id}" type="button">载入</button>
              <button class="note-mini-button" data-delete-summary="${kind}:${item.id}" type="button">删除</button>
            </div>
          </div>
          <div>${escapeHtml((item.ai || item.manualText || "").slice(0, 80))}${(item.ai || item.manualText || "").length > 80 ? "…" : ""}</div>
        </article>
      `
    )
    .join("");
  container.querySelectorAll("[data-load-summary]").forEach((button) => {
    button.addEventListener("click", () => {
      const parts = button.dataset.loadSummary.split(":");
      state.activeSummaryVersion[kind] = parts.slice(1).join(":");
      renderSummaries();
    });
  });
  container.querySelectorAll("[data-delete-summary]").forEach((button) => {
    button.addEventListener("click", () => {
      const parts = button.dataset.deleteSummary.split(":");
      const id = parts.slice(1).join(":");
      delete state.summaries[id];
      if (state.activeSummaryVersion[kind] === id) state.activeSummaryVersion[kind] = null;
      saveJSON(SUMMARIES_KEY, state.summaries);
      renderSummaries();
      markSaved("已删除该总结版本");
    });
  });
}

function saveManualSummary(kind) {
  const manualMap = {
    daily: elements.dailyManual,
    weekly: elements.weeklyManual,
    monthly: elements.monthlyManual,
  };
  const current = latestSummaryByKind(kind) || createSummaryShell(kind);
  current.manualHtml = manualMap[kind].innerHTML;
  current.manualText = stripHtml(current.manualHtml);
  state.activeSummaryVersion[kind] = current.id;
  state.summaries[current.id] = current;
  saveJSON(SUMMARIES_KEY, state.summaries);
  renderSummaries();
  markSaved("手写总结已保存");
}

function latestSummaryByKind(kind) {
  return Object.values(state.summaries).filter((s) => s.kind === kind).sort((a, b) => b.startDate.localeCompare(a.startDate))[0];
}

function createSummaryShell(kind) {
  const now = new Date();
  let startDate;
  let endDate;
  if (kind === "daily") {
    const target = new Date(now);
    target.setDate(now.getDate() - 1);
    startDate = endDate = toDateInput(target);
  } else if (kind === "weekly") {
    const end = new Date(now);
    end.setDate(now.getDate() - now.getDay() - 1);
    const start = new Date(end);
    start.setDate(end.getDate() - 6);
    startDate = toDateInput(start);
    endDate = toDateInput(end);
  } else {
    startDate = toDateInput(new Date(now.getFullYear(), now.getMonth(), 1));
    endDate = toDateInput(new Date(now.getFullYear(), now.getMonth() + 1, 0));
  }
  return {
    id: `${kind}:${startDate}_${endDate}`,
    kind,
    startDate,
    endDate,
    ai: "",
    manualHtml: "",
    manualText: "",
    generatedAt: currentTimeText(),
  };
}

function getEntriesInRange(startDate, endDate) {
  return Object.entries(state.entries)
    .filter(([date]) => date >= startDate && date <= endDate)
    .sort((a, b) => a[0].localeCompare(b[0]));
}

async function generateSummary(kind) {
  const summary = createSummaryShell(kind);
  const entries = getEntriesInRange(summary.startDate, summary.endDate);
  const bodyMap = { daily: elements.dailySummaryBody, weekly: elements.weeklySummaryBody, monthly: elements.monthlySummaryBody };
  if (!entries.length) {
    bodyMap[kind].textContent = "所选时间范围内还没有足够的记录。";
    return;
  }
  bodyMap[kind].textContent = "正在生成总结…";
  try {
    const prompt = `
请基于下面的个人记录，整理一份${{ daily: "每日总结", weekly: "每周总结", monthly: "每月总结" }[kind]}。
要求：
1. 保留原意，不编造
2. 结构包含：反复出现的主题、情绪与状态、值得保留的句子、接下来可继续关注的方向
3. 语气克制、清晰、温和

记录：
${entries.map(([date, value]) => `${date}\n${value.notes.map((note) => note.text).join("\n")}`).join("\n\n")}
`;
    summary.ai = await callAI(prompt);
    summary.generatedAt = currentTimeText();
    state.summaries[summary.id] = {
      ...latestSummaryByKind(kind),
      ...summary,
      manualHtml: latestSummaryByKind(kind)?.manualHtml || "",
      manualText: latestSummaryByKind(kind)?.manualText || "",
    };
    state.activeSummaryVersion[kind] = summary.id;
    saveJSON(SUMMARIES_KEY, state.summaries);
    renderSummaries();
    markSaved("总结已生成");
  } catch (error) {
    bodyMap[kind].textContent = error.message;
    markSaved("总结生成失败");
  }
}

function bindSummaryActions() {
  elements.generateDaily.addEventListener("click", () => generateSummary("daily"));
  elements.generateWeekly.addEventListener("click", () => generateSummary("weekly"));
  elements.generateMonthly.addEventListener("click", () => generateSummary("monthly"));
  elements.saveManualButtons.forEach((button) => {
    button.addEventListener("click", () => saveManualSummary(button.dataset.kind));
  });
  elements.summaryMicButtons.forEach((button) => {
    button.addEventListener("click", () => toggleSpeechFor(document.getElementById(button.dataset.target), button));
  });
  [
    ["daily", elements.dailySummaryBody, elements.dailyManual],
    ["weekly", elements.weeklySummaryBody, elements.weeklyManual],
    ["monthly", elements.monthlySummaryBody, elements.monthlyManual],
  ].forEach(([kind, bodyEl, manualEl]) => {
    [bodyEl, manualEl].forEach((el) => {
      el.addEventListener("blur", () => {
        const current = latestSummaryByKind(kind) || createSummaryShell(kind);
        current.id = state.activeSummaryVersion[kind] || current.id;
        current.ai = bodyEl.textContent.trim();
        current.manualHtml = manualEl.innerHTML;
        current.manualText = stripHtml(current.manualHtml);
        state.summaries[current.id] = current;
        state.activeSummaryVersion[kind] = current.id;
        saveJSON(SUMMARIES_KEY, state.summaries);
      });
    });
  });
}

function bindCalendarNav() {
  elements.prevMonth.addEventListener("click", () => {
    state.displayMonth = new Date(state.displayMonth.getFullYear(), state.displayMonth.getMonth() - 1, 1);
    renderCalendar();
  });
  elements.nextMonth.addEventListener("click", () => {
    state.displayMonth = new Date(state.displayMonth.getFullYear(), state.displayMonth.getMonth() + 1, 1);
    renderCalendar();
  });
}

function bindArchiveSearch() {
  elements.archiveSearch.addEventListener("input", () => {
    state.archiveQuery = elements.archiveSearch.value.trim();
    renderArchive();
  });
}

function toggleSpeechFor(target, button) {
  if (!state.recognition) return;
  if (state.isRecording) {
    state.recognition.stop();
    return;
  }
  state.activeSpeechTarget = { element: target, button };
  state.recognition.start();
}

function setupVoiceInput() {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) {
    elements.micLabel.textContent = "设备不支持语音";
    elements.micButton.disabled = true;
    return;
  }
  const recognition = new Recognition();
  recognition.lang = navigator.language || "zh-CN";
  recognition.interimResults = true;
  recognition.continuous = true;
  let finalTranscript = "";

  recognition.onstart = () => {
    state.isRecording = true;
    const target = state.activeSpeechTarget?.element || elements.entryBody;
    state.speechBaseHtml = target.innerHTML;
    if (state.activeSpeechTarget?.button) state.activeSpeechTarget.button.classList.add("is-active");
    if (!state.activeSpeechTarget?.button) {
      elements.micButton.classList.add("is-active");
      elements.micLabel.textContent = "停止录音";
    }
    markSaved("正在语音输入…");
  };

  recognition.onresult = (event) => {
    let interim = "";
    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      const chunk = event.results[i][0].transcript;
      if (event.results[i].isFinal) finalTranscript += chunk;
      else interim += chunk;
    }
    const target = state.activeSpeechTarget?.element || elements.entryBody;
    const baseText = stripHtml(state.speechBaseHtml);
    const separator = baseText && (finalTranscript || interim) ? "<br>" : "";
    const combined = `${baseText}${separator}${finalTranscript}${interim}`.replace(/\n/g, "<br>");
    target.innerHTML = combined;
  };

  recognition.onend = () => {
    state.isRecording = false;
    if (state.activeSpeechTarget?.button) state.activeSpeechTarget.button.classList.remove("is-active");
    elements.micButton.classList.remove("is-active");
    elements.micLabel.textContent = "语音输入";
    state.activeSpeechTarget = null;
    state.speechBaseHtml = "";
    finalTranscript = "";
    markSaved("语音输入结束");
  };

  recognition.onerror = () => {
    markSaved("语音输入中断，请重试");
  };

  state.recognition = recognition;
  elements.micButton.addEventListener("click", () => toggleSpeechFor(elements.entryBody, null));
}

function bindMedia() {
  elements.uploadTrigger.addEventListener("click", () => elements.mediaInput.click());
  elements.resetBackground.addEventListener("click", resetToRainBackground);
  elements.mediaInput.addEventListener("change", onMediaSelected);
  elements.clearMedia.addEventListener("click", clearMedia);
}

function resetToRainBackground() {
  clearMedia();
  applyDefaultBackgroundVideo();
  const shell = document.querySelector(".app-shell");
  shell?.classList.remove("theme-daybreak", "theme-ocean");
  Object.assign(state.settings, {
    rainAmount: 0.58,
    mistAmount: 0.18,
    refraction: 0.84,
    trailSpeed: 0.92,
    blurDepth: 0.42,
    backgroundBlur: 0.1,
  });
  Object.entries(state.settings).forEach(([key, value]) => {
    if (elements[key]) elements[key].value = String(value);
  });
}

async function hydrateState() {
  state.entries = normalizeEntries(await dbGet(STORAGE_KEY, {}));
  state.summaries = await dbGet(SUMMARIES_KEY, {});
  state.journalName = await dbGet(JOURNAL_NAME_KEY, "念念之间");
  state.aiSettings = {
    provider: "deepseek",
    apiKey: "",
    ...(await dbGet(SETTINGS_KEY, {})),
  };
  state.format = {
    fontSize: 20,
    lineHeight: 1.5,
    bold: false,
    underline: false,
    ...(await dbGet(FORMAT_KEY, {})),
  };
}

function clearMedia() {
  if (state.media.image?.dataset.url) URL.revokeObjectURL(state.media.image.dataset.url);
  if (state.media.video?.dataset.url) {
    URL.revokeObjectURL(state.media.video.dataset.url);
    state.media.video.pause();
  }
  state.media = { type: "gradient", image: null, video: null };
  elements.image.classList.add("hidden");
  elements.video.classList.add("hidden");
  elements.image.removeAttribute("src");
  elements.video.removeAttribute("src");
}

function applyDefaultBackgroundVideo() {
  state.media.type = "video";
  state.media.video = elements.video;
  delete elements.video.dataset.url;
  elements.video.src = DEFAULT_BACKGROUND_VIDEO;
  elements.video.classList.remove("hidden");
  elements.image.classList.add("hidden");
  elements.image.removeAttribute("src");
  elements.video.load();
  elements.video.play().catch(() => {});
}

function onMediaSelected(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  clearMedia();
  const url = URL.createObjectURL(file);
  if (file.type.startsWith("video/")) {
    state.media.type = "video";
    state.media.video = elements.video;
    elements.video.dataset.url = url;
    elements.video.src = url;
    elements.video.classList.remove("hidden");
    elements.video.play().catch(() => {});
  } else {
    state.media.type = "image";
    state.media.image = elements.image;
    elements.image.dataset.url = url;
    elements.image.src = url;
    elements.image.classList.remove("hidden");
  }
  event.target.value = "";
}

function bindAtmospherePanel() {
  elements.consoleFab.addEventListener("click", () => {
    if (state.panelsHidden) return;
    elements.controlPanel.classList.remove("hidden");
  });
  elements.togglePanelsFab.addEventListener("click", togglePanelsVisibility);
  elements.panelClose.addEventListener("click", () => elements.controlPanel.classList.add("hidden"));
  ["rainAmount", "mistAmount", "refraction", "trailSpeed", "blurDepth", "backgroundBlur", "leftPanelOpacity", "rightPanelOpacity"].forEach((key) => {
    elements[key].addEventListener("input", () => {
      state.settings[key] = Number(elements[key].value);
    });
  });
  elements.resetScene.addEventListener("click", () => {
    Object.assign(state.settings, {
      rainAmount: 0.58,
      mistAmount: 0.18,
      refraction: 0.84,
      trailSpeed: 0.9,
      blurDepth: 0.42,
      backgroundBlur: 0.1,
      leftPanelOpacity: 0.24,
      rightPanelOpacity: 0.2,
    });
    resetPanelsToDefaultLayout();
    Object.entries(state.settings).forEach(([key, value]) => {
      if (elements[key]) elements[key].value = String(value);
    });
    applyPanelLayout();
  });
}

function togglePanelsVisibility() {
  if (!state.panelsHidden) {
    state.settings.leftPanelSize = 0;
    state.settings.rightPanelSize = 0;
    state.settings.leftPanelOpacity = 0;
    state.settings.rightPanelOpacity = 0;
    state.panelsHidden = true;
    elements.controlPanel.classList.add("hidden");
    elements.apiReminder.classList.add("hidden");
    document.querySelector(".app-shell")?.classList.add("panels-hidden");
  } else {
    state.settings.leftPanelOpacity = 0.24;
    state.settings.rightPanelOpacity = 0.2;
    resetPanelsToDefaultLayout();
    state.panelsHidden = false;
    document.querySelector(".app-shell")?.classList.remove("panels-hidden");
  }
  applyPanelLayout();
}

function resetPanelsToDefaultLayout() {
  const margin = 14;
  const gap = 18;
  const availableHeight = Math.max(220, window.innerHeight - margin * 2);
  const availableWidth = Math.max(720, window.innerWidth - margin * 2);
  const leftWidth = Math.min(292, Math.max(220, Math.round(availableWidth * 0.24)));
  const rightX = margin + leftWidth + gap;
  const rightWidth = Math.max(360, window.innerWidth - rightX - margin);

  Object.assign(state.settings, {
    leftPanelSize: leftWidth,
    rightPanelSize: rightWidth,
    leftPanelHeight: availableHeight,
    rightPanelHeight: availableHeight,
    leftPanelX: margin,
    leftPanelY: margin,
    rightPanelX: rightX,
    rightPanelY: margin,
  });
}

function applyPanelLayout() {
  const leftSize = Math.max(0, Number(state.settings.leftPanelSize) || 0);
  const rightSize = Math.max(0, Number(state.settings.rightPanelSize) || 0);
  document.documentElement.style.setProperty("--left-rail-width", `${leftSize}px`);
  document.documentElement.style.setProperty("--right-panel-width", `${rightSize}px`);
  document.documentElement.style.setProperty("--left-panel-height", `${Math.max(120, Number(state.settings.leftPanelHeight) || 120)}px`);
  document.documentElement.style.setProperty("--right-panel-height", `${Math.max(120, Number(state.settings.rightPanelHeight) || 120)}px`);
  document.documentElement.style.setProperty("--left-panel-x", `${Math.max(0, Number(state.settings.leftPanelX) || 0)}px`);
  document.documentElement.style.setProperty("--left-panel-y", `${Math.max(0, Number(state.settings.leftPanelY) || 0)}px`);
  document.documentElement.style.setProperty("--right-panel-x", `${Math.max(0, Number(state.settings.rightPanelX) || 0)}px`);
  document.documentElement.style.setProperty("--right-panel-y", `${Math.max(0, Number(state.settings.rightPanelY) || 0)}px`);
  elements.leftPanel?.classList.toggle("is-collapsed", leftSize <= 2);
  elements.rightPanel?.classList.toggle("is-collapsed", rightSize <= 2);
}

function bindPanelDragControls() {
  if (window.innerWidth <= 1100) return;

  const beginDrag = (onMove) => (event) => {
    event.preventDefault();
    const startX = event.clientX;
    const startY = event.clientY;
    const snapshot = { ...state.settings };
    const stop = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", stop);
    };
    const move = (moveEvent) => {
      onMove(moveEvent.clientX - startX, moveEvent.clientY - startY, moveEvent, snapshot);
      applyPanelLayout();
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stop);
  };

  elements.leftPanelResizeHandle?.addEventListener("mousedown", beginDrag((dx, _dy, _event, snapshot) => {
    state.settings.leftPanelSize = Math.max(0, Math.min(420, snapshot.leftPanelSize + dx));
  }));
  elements.leftPanelResizeLeft?.addEventListener("mousedown", beginDrag((dx, _dy, _event, snapshot) => {
    state.settings.leftPanelSize = Math.max(0, Math.min(420, snapshot.leftPanelSize - dx));
    state.settings.leftPanelX = Math.max(0, snapshot.leftPanelX + dx);
  }));

  elements.leftPanelResizeTop?.addEventListener("mousedown", beginDrag((_dx, dy, _event, snapshot) => {
    state.settings.leftPanelHeight = Math.max(120, Math.min(window.innerHeight - 10, snapshot.leftPanelHeight - dy));
    state.settings.leftPanelY = Math.max(0, Math.min(window.innerHeight - 120, snapshot.leftPanelY + dy));
  }));

  elements.leftPanelResizeBottom?.addEventListener("mousedown", beginDrag((_dx, dy, _event, snapshot) => {
    state.settings.leftPanelHeight = Math.max(120, Math.min(window.innerHeight - snapshot.leftPanelY, snapshot.leftPanelHeight + dy));
  }));

  elements.rightPanelResizeHandle?.addEventListener("mousedown", beginDrag((dx, _dy, _event, snapshot) => {
    state.settings.rightPanelSize = Math.max(0, Math.min(window.innerWidth - 20, snapshot.rightPanelSize - dx));
    state.settings.rightPanelX = Math.min(window.innerWidth - state.settings.rightPanelSize - 14, snapshot.rightPanelX + dx);
    state.settings.rightPanelX = Math.max(14, state.settings.rightPanelX);
  }));
  elements.rightPanelResizeRight?.addEventListener("mousedown", beginDrag((dx, _dy, _event, snapshot) => {
    state.settings.rightPanelSize = Math.max(0, Math.min(window.innerWidth - snapshot.rightPanelX, snapshot.rightPanelSize + dx));
  }));

  elements.rightPanelResizeTop?.addEventListener("mousedown", beginDrag((_dx, dy, _event, snapshot) => {
    state.settings.rightPanelHeight = Math.max(120, Math.min(window.innerHeight - 10, snapshot.rightPanelHeight - dy));
    state.settings.rightPanelY = Math.max(0, Math.min(window.innerHeight - 120, snapshot.rightPanelY + dy));
  }));

  elements.rightPanelResizeBottom?.addEventListener("mousedown", beginDrag((_dx, dy, _event, snapshot) => {
    state.settings.rightPanelHeight = Math.max(120, Math.min(window.innerHeight - snapshot.rightPanelY, snapshot.rightPanelHeight + dy));
  }));

  elements.leftPanelMoveHandle?.addEventListener("mousedown", beginDrag((dx, dy, _event, snapshot) => {
    state.settings.leftPanelX = Math.max(0, Math.min(window.innerWidth - Math.max(snapshot.leftPanelSize, 24), snapshot.leftPanelX + dx));
    state.settings.leftPanelY = Math.max(0, Math.min(window.innerHeight - 120, snapshot.leftPanelY + dy));
  }));

  elements.rightPanelMoveHandle?.addEventListener("mousedown", beginDrag((dx, dy, _event, snapshot) => {
    state.settings.rightPanelX = Math.max(14, Math.min(window.innerWidth - Math.max(snapshot.rightPanelSize, 28), snapshot.rightPanelX + dx));
    state.settings.rightPanelY = Math.max(0, Math.min(window.innerHeight - 120, snapshot.rightPanelY + dy));
  }));

  elements.leftPanelDock?.addEventListener("mousedown", beginDrag((dx, _dy, moveEvent) => {
    state.settings.leftPanelSize = Math.max(0, Math.min(420, moveEvent.clientX));
    state.settings.leftPanelX = 0;
  }));

  elements.rightPanelDock?.addEventListener("mousedown", beginDrag((_dx, _dy, moveEvent) => {
    const rightGap = window.innerWidth - moveEvent.clientX;
    state.settings.rightPanelSize = Math.max(0, Math.min(window.innerWidth - 20, rightGap));
    state.settings.rightPanelX = Math.max(14, window.innerWidth - state.settings.rightPanelSize);
  }));

  const bindCornerScale = (el, panelKey, sx, sy) => {
    el?.addEventListener("mousedown", beginDrag((dx, dy, _event, snapshot) => {
      const sizeKey = panelKey === "left" ? "leftPanelSize" : "rightPanelSize";
      const heightKey = panelKey === "left" ? "leftPanelHeight" : "rightPanelHeight";
      const xKey = panelKey === "left" ? "leftPanelX" : "rightPanelX";
      const yKey = panelKey === "left" ? "leftPanelY" : "rightPanelY";
      const aspect = Math.max(0.2, snapshot[sizeKey] / Math.max(snapshot[heightKey], 1));
      const scaledX = sx * dx / Math.max(snapshot[sizeKey], 1);
      const scaledY = sy * dy / Math.max(snapshot[heightKey], 1);
      const scale = 1 + Math.max(scaledX, scaledY);
      const newWidth = Math.max(0, Math.min(window.innerWidth - 20, snapshot[sizeKey] * scale));
      const newHeight = Math.max(120, Math.min(window.innerHeight - 20, newWidth / aspect));
      state.settings[sizeKey] = newWidth;
      state.settings[heightKey] = newHeight;
      if (sx < 0) state.settings[xKey] = snapshot[xKey] + (snapshot[sizeKey] - newWidth);
      if (sy < 0) state.settings[yKey] = snapshot[yKey] + (snapshot[heightKey] - newHeight);
      state.settings[xKey] = Math.max(0, state.settings[xKey] ?? snapshot[xKey]);
      state.settings[yKey] = Math.max(0, state.settings[yKey] ?? snapshot[yKey]);
    }));
  };

  bindCornerScale(elements.leftPanelCornerTL, "left", -1, -1);
  bindCornerScale(elements.leftPanelCornerTR, "left", 1, -1);
  bindCornerScale(elements.leftPanelCornerBL, "left", -1, 1);
  bindCornerScale(elements.leftPanelCornerBR, "left", 1, 1);
  bindCornerScale(elements.rightPanelCornerTL, "right", -1, -1);
  bindCornerScale(elements.rightPanelCornerTR, "right", 1, -1);
  bindCornerScale(elements.rightPanelCornerBL, "right", -1, 1);
  bindCornerScale(elements.rightPanelCornerBR, "right", 1, 1);
}

function renderArchiveAndConnections() {
  renderArchive();
  renderConnections(elements.connectionsList, state.selectedDate);
}

function syncAllViews() {
  saveJSON(STORAGE_KEY, state.entries);
  updateMeta(state.selectedDate, currentTimeText());
  renderNoteStream();
  renderArchiveAndConnections();
  renderCalendar();
  renderStats();
  renderSummaries();
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function initGL() {
  const gl = elements.canvas.getContext("webgl");
  if (!gl) return;
  state.gl = gl;
  const vertexShader = createShader(
    gl,
    gl.VERTEX_SHADER,
    `attribute vec2 a_position; varying vec2 v_uv; void main(){ v_uv=0.5*(a_position+1.0); gl_Position=vec4(a_position,0.0,1.0); }`
  );
  let fragmentShader;
  try {
    fragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      `
      precision highp float; varying vec2 v_uv; uniform vec2 u_resolution; uniform float u_time; uniform float u_rainAmount; uniform float u_mistAmount; uniform float u_refraction; uniform float u_trailSpeed; uniform float u_blurDepth; uniform sampler2D u_texture;
      #define S(a,b,t) smoothstep(a,b,t)
      vec3 n13(float p){ vec3 p3=fract(vec3(p)*vec3(0.1031,0.11369,0.13787)); p3+=dot(p3,p3.yzx+19.19); return fract(vec3((p3.x+p3.y)*p3.z,(p3.x+p3.z)*p3.y,(p3.y+p3.z)*p3.x));}
      float saw(float b,float t){ return S(0.0,b,t)*S(1.0,b,t);}
      vec2 dropLayer(vec2 uv,float t){ vec2 uv0=uv; uv.y+=t*0.75; vec2 a=vec2(6.0,1.0); vec2 grid=a*2.0; vec2 id=floor(uv*grid); float colShift=fract(sin(id.x*76.13)*457.18); uv.y+=colShift; id=floor(uv*grid); vec3 n=n13(id.x*35.2+id.y*2376.1); vec2 st=fract(uv*grid)-vec2(0.5,0.0); float x=n.x-0.5; float y=uv0.y*20.0; float wiggle=sin(y+sin(y)); x+=wiggle*(0.5-abs(x))*(n.z-0.5); x*=0.7; float ti=fract(t+n.z); y=(saw(0.85,ti)-0.5)*0.9+0.5; vec2 p=vec2(x,y); float d=length((st-p)*a.yx); float mainDrop=S(0.42,0.0,d); float r=sqrt(S(1.0,y,st.y)); float cd=abs(st.x-x); float trail=S(0.23*r,0.15*r*r,cd); float trailFront=S(-0.02,0.03,st.y-y); trail*=trailFront*r*r; y=fract(uv0.y*12.0)+(st.y-0.5); float dd=length(st-vec2(x,y)); float droplets=S(0.28,0.0,dd)*trailFront*n.z; return vec2(mainDrop+droplets*r,trail);}
      float staticDrops(vec2 uv,float t){ uv*=40.0; vec2 id=floor(uv); vec2 gv=fract(uv)-0.5; vec3 n=n13(id.x*107.45+id.y*3543.654); vec2 p=(n.xy-0.5)*0.7; float d=length(gv-p); float fade=saw(0.025,fract(t+n.z)); return S(0.3,0.0,d)*fract(n.z*10.0)*fade;}
      vec2 drops(vec2 uv,float t,float l0,float l1,float l2){ float s=staticDrops(uv,t)*l0; vec2 m1=dropLayer(uv,t)*l1; vec2 m2=dropLayer(uv*1.85+vec2(3.7,1.2),t*1.17)*l2; float c=s+m1.x+m2.x; c=S(0.3,1.0,c); return vec2(c,max(m1.y*l1,m2.y*l2));}
      vec3 sampleBackground(vec2 uv,float lodBias){ vec2 centered=uv-0.5; float radial=dot(centered,centered); vec2 warped=uv+centered*radial*0.1; vec2 offset=1.0/u_resolution*lodBias*2.0; vec3 c0=texture2D(u_texture,clamp(warped,0.001,0.999)).rgb; vec3 c1=texture2D(u_texture,clamp(warped+vec2(offset.x,0.0),0.001,0.999)).rgb; vec3 c2=texture2D(u_texture,clamp(warped-vec2(offset.x,0.0),0.001,0.999)).rgb; vec3 c3=texture2D(u_texture,clamp(warped+vec2(0.0,offset.y),0.001,0.999)).rgb; vec3 c4=texture2D(u_texture,clamp(warped-vec2(0.0,offset.y),0.001,0.999)).rgb; return (c0+c1+c2+c3+c4)/5.0; }
      void main(){ vec2 fragCoord=v_uv*u_resolution; vec2 uv=(fragCoord-0.5*u_resolution)/u_resolution.y; vec2 screenUV=fragCoord/u_resolution; float t=u_time*0.2*u_trailSpeed; float rain=clamp(u_rainAmount,0.0,1.0); float staticLayer=S(-0.5,1.0,rain)*2.2; float layer1=S(0.18,0.78,rain); float layer2=S(0.0,0.58,rain); vec2 baseUV=uv*(0.92+sin(u_time*0.1)*0.05); vec2 c=drops(baseUV,t,staticLayer,layer1,layer2); vec2 eps=vec2(2.0/u_resolution.y,0.0); float cx=drops(baseUV+eps.xy,t,staticLayer,layer1,layer2).x; float cy=drops(baseUV+eps.yx,t,staticLayer,layer1,layer2).x; vec2 n=vec2(cx-c.x,cy-c.x); float focus=mix(1.4+5.4*u_blurDepth-c.y*1.9,0.55,S(0.08,0.24,c.x)); vec2 refractedUV=screenUV+n*(0.038+u_refraction*0.092); vec3 bg=sampleBackground(refractedUV,focus); float mist=u_mistAmount*(0.24+rain*0.26); float mistShape=0.5+0.5*sin((screenUV.y*2.0+screenUV.x*0.8)*3.1415+u_time*0.08); vec3 fogTint=vec3(0.93,0.96,1.0); bg=mix(bg,bg*0.86+fogTint*0.14,mist*(0.46+mistShape*0.18)); float dropHighlight=pow(c.x,1.3); float rim=pow(clamp(length(n)*28.0,0.0,1.0),1.2)*c.x; vec3 highlight=vec3(0.92,0.97,1.0)*(dropHighlight*0.28+rim*0.16); vec3 glassShadow=vec3(0.0,0.02,0.04)*c.y*0.24; vec3 col=bg*(1.0-vec3(c.y)*0.08)+highlight-glassShadow; gl_FragColor=vec4(col,1.0); }
      `
    );
  } catch {
    return;
  }
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  state.program = program;
  state.texture = texture;
  state.buffer = buffer;
  state.uniforms = {
    position: gl.getAttribLocation(program, "a_position"),
    resolution: gl.getUniformLocation(program, "u_resolution"),
    time: gl.getUniformLocation(program, "u_time"),
    rainAmount: gl.getUniformLocation(program, "u_rainAmount"),
    mistAmount: gl.getUniformLocation(program, "u_mistAmount"),
    refraction: gl.getUniformLocation(program, "u_refraction"),
    trailSpeed: gl.getUniformLocation(program, "u_trailSpeed"),
    blurDepth: gl.getUniformLocation(program, "u_blurDepth"),
    texture: gl.getUniformLocation(program, "u_texture"),
  };
  resizeCanvas();
  requestAnimationFrame(renderGL);
}

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) || "shader error");
  return shader;
}

function resizeCanvas() {
  if (!state.gl) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.floor(window.innerWidth * dpr);
  const height = Math.floor(window.innerHeight * dpr);
  if (elements.canvas.width !== width || elements.canvas.height !== height) {
    elements.canvas.width = width;
    elements.canvas.height = height;
    state.gl.viewport(0, 0, width, height);
  }
}

function uploadTextureFrame() {
  const gl = state.gl;
  if (!gl) return;
  let source = null;
  if (state.media.type === "video" && elements.video.readyState >= 2) source = elements.video;
  else if (state.media.type === "image" && elements.image.complete && elements.image.naturalWidth > 0) source = elements.image;
  gl.bindTexture(gl.TEXTURE_2D, state.texture);
  if (source) {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
    return;
  }
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    2,
    2,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array([20, 14, 12, 255, 80, 47, 30, 255, 21, 74, 114, 255, 10, 17, 24, 255])
  );
}

function renderGL(now) {
  const gl = state.gl;
  if (!gl || !state.program) return;
  resizeCanvas();
  uploadTextureFrame();
  gl.useProgram(state.program);
  gl.bindBuffer(gl.ARRAY_BUFFER, state.buffer);
  gl.enableVertexAttribArray(state.uniforms.position);
  gl.vertexAttribPointer(state.uniforms.position, 2, gl.FLOAT, false, 0, 0);
  gl.uniform2f(state.uniforms.resolution, elements.canvas.width, elements.canvas.height);
  gl.uniform1f(state.uniforms.time, (now - state.startTime) / 1000);
  gl.uniform1f(state.uniforms.rainAmount, state.settings.rainAmount);
  gl.uniform1f(state.uniforms.mistAmount, state.settings.mistAmount);
  gl.uniform1f(state.uniforms.refraction, state.settings.refraction);
  gl.uniform1f(state.uniforms.trailSpeed, state.settings.trailSpeed);
  gl.uniform1f(state.uniforms.blurDepth, state.settings.blurDepth);
  gl.uniform1i(state.uniforms.texture, 0);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  document.documentElement.style.setProperty("--bg-blur", `${state.settings.backgroundBlur * 24}px`);
  document.documentElement.style.setProperty("--left-panel-alpha", String(state.settings.leftPanelOpacity));
  document.documentElement.style.setProperty("--right-panel-alpha", String(state.settings.rightPanelOpacity));
  requestAnimationFrame(renderGL);
}

async function init() {
  await hydrateState();
  resetPanelsToDefaultLayout();
  bindNavigation();
  bindSettings();
  bindFormatting();
  bindEditor();
  bindSummaryActions();
  bindCalendarNav();
  bindArchiveSearch();
  setupVoiceInput();
  bindMedia();
  bindAtmospherePanel();
  applyFormatSettings();
  applyPanelLayout();
  bindPanelDragControls();
  applyDefaultBackgroundVideo();
  initGL();
  syncAllViews();
  switchView("spark");
  syncResponsiveUI();
  window.addEventListener("resize", () => {
    resizeCanvas();
    if (!state.panelsHidden && window.innerWidth > 1100) {
      resetPanelsToDefaultLayout();
      applyPanelLayout();
    }
    syncResponsiveUI();
  });
}

void init();
