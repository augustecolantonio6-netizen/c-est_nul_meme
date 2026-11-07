/* C'est nul ! — background service worker
   Browser-level shortcut + toolbar fallback. No page injection or popup. */
let creatingOffscreenDocument;

async function ensureOffscreenDocument() {
  if (await chrome.offscreen.hasDocument()) return;

  if (!creatingOffscreenDocument) {
    creatingOffscreenDocument = chrome.offscreen.createDocument({
      url: "offscreen.html",
      reasons: ["AUDIO_PLAYBACK"],
      justification: "Lire le court fichier audio local lorsque l'utilisateur déclenche l'extension."
    }).finally(() => {
      creatingOffscreenDocument = undefined;
    });
  }

  await creatingOffscreenDocument;
}

async function playHomerSound() {
  await ensureOffscreenDocument();
  const response = await chrome.runtime.sendMessage({
    target: "c-est-nul-offscreen",
    type: "PLAY_HOMER_SOUND"
  });

  if (!response?.ok) {
    console.error("C'est nul ! : la lecture audio n'a pas démarré.", response?.error || "Erreur inconnue");
  }
}

function safelyPlay() {
  playHomerSound().catch((error) => {
    console.error("C'est nul ! : impossible de lancer le son.", error);
  });
}

// This is handled by Chromium itself, not by key events inside web pages.
chrome.commands.onCommand.addListener((command) => {
  if (command === "play-homer") safelyPlay();
});

// Clicking the pinned toolbar icon is the no-popup fallback.
chrome.action.onClicked.addListener(safelyPlay);

// Prepare the hidden audio document after installation/update.
chrome.runtime.onInstalled.addListener(() => {
  ensureOffscreenDocument().catch((error) => {
    console.warn("C'est nul ! : préparation audio différée.", error);
  });
});
