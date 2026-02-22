const STORAGE_KEY = "passwordHistory";
const HISTORY_LIMIT = 5;

const CHARSETS = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{}|;:,.<>/?"
};

const lengthInput = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const lowercaseInput = document.getElementById("lowercase");
const uppercaseInput = document.getElementById("uppercase");
const numbersInput = document.getElementById("numbers");
const symbolsInput = document.getElementById("symbols");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");
const passwordOutput = document.getElementById("passwordOutput");
const message = document.getElementById("message");
const historyList = document.getElementById("historyList");
const urlInput = document.getElementById("urlInput");
const urlOutput = document.getElementById("urlOutput");
const urlEncodeBtn = document.getElementById("urlEncodeBtn");
const urlDecodeBtn = document.getElementById("urlDecodeBtn");
const urlCopyBtn = document.getElementById("urlCopyBtn");
const base64Input = document.getElementById("base64Input");
const base64Output = document.getElementById("base64Output");
const base64EncodeBtn = document.getElementById("base64EncodeBtn");
const base64DecodeBtn = document.getElementById("base64DecodeBtn");
const base64CopyBtn = document.getElementById("base64CopyBtn");
const jwtInput = document.getElementById("jwtInput");
const jwtOutput = document.getElementById("jwtOutput");
const jwtDecodeBtn = document.getElementById("jwtDecodeBtn");
const jwtCopyBtn = document.getElementById("jwtCopyBtn");
const jsonInput = document.getElementById("jsonInput");
const jsonOutput = document.getElementById("jsonOutput");
const jsonPrettyBtn = document.getElementById("jsonPrettyBtn");
const jsonCompactBtn = document.getElementById("jsonCompactBtn");
const jsonCopyBtn = document.getElementById("jsonCopyBtn");
const timestampInput = document.getElementById("timestampInput");
const timestampOutput = document.getElementById("timestampOutput");
const timestampConvertBtn = document.getElementById("timestampConvertBtn");
const timestampNowBtn = document.getElementById("timestampNowBtn");
const timestampCopyBtn = document.getElementById("timestampCopyBtn");
const utcInput = document.getElementById("utcInput");
const utcOutput = document.getElementById("utcOutput");
const utcConvertBtn = document.getElementById("utcConvertBtn");
const utcCopyBtn = document.getElementById("utcCopyBtn");

lengthInput.addEventListener("input", () => {
  lengthValue.textContent = lengthInput.value;
});

generateBtn.addEventListener("click", async () => {
  const selectedSets = getSelectedCharSets();
  if (selectedSets.length === 0) {
    showMessage("Select at least one character set.");
    return;
  }

  const length = Number(lengthInput.value);
  if (!Number.isInteger(length) || length < selectedSets.length) {
    showMessage("Length must be at least the number of selected character sets.");
    return;
  }

  const password = generatePassword(length, selectedSets);
  passwordOutput.value = password;
  showMessage("Password generated.");
  await saveToHistory(password);
  await renderHistory();
});

copyBtn.addEventListener("click", async () => {
  if (!passwordOutput.value) {
    showMessage("Generate a password first.");
    return;
  }

  const copied = await copyText(passwordOutput.value);
  showMessage(copied ? "Password copied." : "Copy failed.");
});

clearHistoryBtn.addEventListener("click", async () => {
  await chrome.storage.local.set({ [STORAGE_KEY]: [] });
  await renderHistory();
  showMessage("History cleared.");
});

urlEncodeBtn.addEventListener("click", () => {
  urlOutput.value = encodeURIComponent(urlInput.value);
  showMessage("URL encoded.");
});

urlDecodeBtn.addEventListener("click", () => {
  try {
    urlOutput.value = decodeURIComponent(urlInput.value);
    showMessage("URL decoded.");
  } catch (_err) {
    showMessage("Invalid URL-encoded input.");
  }
});

urlCopyBtn.addEventListener("click", async () => {
  if (!urlOutput.value) {
    showMessage("Nothing to copy.");
    return;
  }
  const copied = await copyText(urlOutput.value);
  showMessage(copied ? "Output copied." : "Copy failed.");
});

base64EncodeBtn.addEventListener("click", () => {
  try {
    base64Output.value = utf8ToBase64(base64Input.value);
    showMessage("Base64 encoded.");
  } catch (_err) {
    showMessage("Could not Base64 encode input.");
  }
});

base64DecodeBtn.addEventListener("click", () => {
  try {
    base64Output.value = base64ToUtf8(base64Input.value);
    showMessage("Base64 decoded.");
  } catch (_err) {
    showMessage("Invalid Base64 input.");
  }
});

base64CopyBtn.addEventListener("click", async () => {
  if (!base64Output.value) {
    showMessage("Nothing to copy.");
    return;
  }
  const copied = await copyText(base64Output.value);
  showMessage(copied ? "Output copied." : "Copy failed.");
});

jwtDecodeBtn.addEventListener("click", () => {
  try {
    const token = jwtInput.value.trim();
    const parts = token.split(".");
    if (parts.length < 2) {
      throw new Error("Token must include header and payload.");
    }

    const header = JSON.parse(base64UrlToUtf8(parts[0]));
    const payload = JSON.parse(base64UrlToUtf8(parts[1]));
    jwtOutput.value = JSON.stringify({ header, payload }, null, 2);
    showMessage("JWT decoded.");
  } catch (_err) {
    showMessage("Invalid JWT.");
  }
});

jwtCopyBtn.addEventListener("click", async () => {
  if (!jwtOutput.value) {
    showMessage("Nothing to copy.");
    return;
  }
  const copied = await copyText(jwtOutput.value);
  showMessage(copied ? "Output copied." : "Copy failed.");
});

jsonPrettyBtn.addEventListener("click", () => {
  try {
    const parsed = JSON.parse(jsonInput.value);
    jsonOutput.value = JSON.stringify(parsed, null, 2);
    showMessage("JSON pretty printed.");
  } catch (_err) {
    showMessage("Invalid JSON input.");
  }
});

jsonCompactBtn.addEventListener("click", () => {
  try {
    const parsed = JSON.parse(jsonInput.value);
    jsonOutput.value = JSON.stringify(parsed);
    showMessage("JSON compacted.");
  } catch (_err) {
    showMessage("Invalid JSON input.");
  }
});

jsonCopyBtn.addEventListener("click", async () => {
  if (!jsonOutput.value) {
    showMessage("Nothing to copy.");
    return;
  }
  const copied = await copyText(jsonOutput.value);
  showMessage(copied ? "Output copied." : "Copy failed.");
});

timestampConvertBtn.addEventListener("click", () => {
  convertTimestampInput();
});

timestampNowBtn.addEventListener("click", () => {
  const nowMs = Date.now();
  timestampInput.value = String(Math.floor(nowMs / 1000));
  convertTimestampInput();
});

timestampCopyBtn.addEventListener("click", async () => {
  if (!timestampOutput.value) {
    showMessage("Nothing to copy.");
    return;
  }
  const copied = await copyText(timestampOutput.value);
  showMessage(copied ? "Output copied." : "Copy failed.");
});

utcConvertBtn.addEventListener("click", () => {
  const raw = utcInput.value.trim();
  if (!raw) {
    showMessage("Enter a UTC date-time.");
    return;
  }

  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) {
    showMessage("Invalid UTC date-time.");
    return;
  }

  const ms = date.getTime();
  utcOutput.value =
    `UTC: ${date.toISOString()}\n` +
    `Local: ${date.toString()}\n` +
    `Unix (seconds): ${Math.floor(ms / 1000)}\n` +
    `Unix (milliseconds): ${ms}`;
  showMessage("UTC converted.");
});

utcCopyBtn.addEventListener("click", async () => {
  if (!utcOutput.value) {
    showMessage("Nothing to copy.");
    return;
  }
  const copied = await copyText(utcOutput.value);
  showMessage(copied ? "Output copied." : "Copy failed.");
});

document.addEventListener("DOMContentLoaded", async () => {
  await renderHistory();
});

function getSelectedCharSets() {
  const selected = [];
  if (lowercaseInput.checked) selected.push(CHARSETS.lowercase);
  if (uppercaseInput.checked) selected.push(CHARSETS.uppercase);
  if (numbersInput.checked) selected.push(CHARSETS.numbers);
  if (symbolsInput.checked) selected.push(CHARSETS.symbols);
  return selected;
}

function generatePassword(length, selectedSets) {
  const chars = [];
  const fullPool = selectedSets.join("");

  // Guarantee at least one character from each selected character set.
  for (const set of selectedSets) {
    chars.push(set[randomInt(set.length)]);
  }

  while (chars.length < length) {
    chars.push(fullPool[randomInt(fullPool.length)]);
  }

  shuffle(chars);
  return chars.join("");
}

function randomInt(maxExclusive) {
  const bytes = new Uint32Array(1);
  const maxUint32 = 0xffffffff;
  const limit = maxUint32 - (maxUint32 % maxExclusive);

  let randomValue;
  do {
    crypto.getRandomValues(bytes);
    randomValue = bytes[0];
  } while (randomValue >= limit);

  return randomValue % maxExclusive;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = randomInt(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function showMessage(text) {
  message.textContent = text;
}

async function saveToHistory(password) {
  const data = await chrome.storage.local.get(STORAGE_KEY);
  const history = Array.isArray(data[STORAGE_KEY]) ? data[STORAGE_KEY] : [];
  history.unshift(password);
  const nextHistory = history.slice(0, HISTORY_LIMIT);
  await chrome.storage.local.set({ [STORAGE_KEY]: nextHistory });
}

async function renderHistory() {
  const data = await chrome.storage.local.get(STORAGE_KEY);
  const history = Array.isArray(data[STORAGE_KEY]) ? data[STORAGE_KEY] : [];

  if (history.length === 0) {
    historyList.innerHTML = "<li>No generated passwords yet.</li>";
    return;
  }

  historyList.innerHTML = "";

  for (const password of history) {
    const item = document.createElement("li");
    const value = document.createElement("span");
    const copy = document.createElement("button");

    value.className = "history-value";
    value.textContent = password;

    copy.type = "button";
    copy.className = "copy-history-btn";
    copy.textContent = "Copy";
    copy.addEventListener("click", async () => {
      const copied = await copyText(password);
      showMessage(copied ? "Password copied." : "Copy failed.");
    });

    item.appendChild(value);
    item.appendChild(copy);
    historyList.appendChild(item);
  }
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (_err) {
    const input = document.createElement("textarea");
    input.value = text;
    document.body.appendChild(input);
    input.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(input);
    return copied;
  }
}

function utf8ToBase64(value) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  for (const b of bytes) {
    binary += String.fromCharCode(b);
  }
  return btoa(binary);
}

function base64ToUtf8(value) {
  const binary = atob(normalizeBase64(value.trim()));
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function base64UrlToUtf8(value) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  return base64ToUtf8(base64);
}

function normalizeBase64(value) {
  const noSpace = value.replace(/\s+/g, "");
  const remainder = noSpace.length % 4;
  if (remainder === 0) {
    return noSpace;
  }
  return noSpace + "=".repeat(4 - remainder);
}

function convertTimestampInput() {
  const raw = timestampInput.value.trim();
  if (!raw) {
    showMessage("Enter a unix timestamp.");
    return;
  }

  if (!/^-?\d+$/.test(raw)) {
    showMessage("Timestamp must be an integer.");
    return;
  }

  const n = Number(raw);
  if (!Number.isFinite(n)) {
    showMessage("Invalid timestamp.");
    return;
  }

  const ms = raw.length <= 10 ? n * 1000 : n;
  const date = new Date(ms);
  if (Number.isNaN(date.getTime())) {
    showMessage("Invalid timestamp.");
    return;
  }

  timestampOutput.value =
    `UTC: ${date.toISOString()}\n` +
    `Local: ${date.toString()}\n` +
    `Unix (seconds): ${Math.floor(ms / 1000)}\n` +
    `Unix (milliseconds): ${ms}`;
  showMessage("Timestamp converted.");
}
