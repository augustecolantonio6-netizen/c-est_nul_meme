(() => {
  "use strict";

  // The shortcut is deliberately handled in a content script so it works
  // across ordinary web pages, including YouTube, without opening a window.
  const REQUIRED_KEYS = new Set(["n", "u", "l"]);
  const pressedKeys = new Set();
  let shortcutFired = false;
  let sound = null;

  function allKeysPressed() {
    for (const key of REQUIRED_KEYS) {
      if (!pressedKeys.has(key)) return false;
    }
    return true;
  }

  function playSound() {
    if (!sound) {
      sound = new Audio(chrome.runtime.getURL("assets/homer.mp3"));
      sound.preload = "auto";
      sound.volume = 1;
    }

    // Restart cleanly if the user triggers the shortcut again quickly.
    try {
      sound.pause();
      sound.currentTime = 0;
    } catch {
      // The audio element may not have finished loading yet.
    }

    const playback = sound.play();
    if (playback && typeof playback.catch === "function") {
      // Keep the extension completely silent if playback is unavailable.
      playback.catch(() => {});
    }
  }

  function onKeyDown(event) {
    if (!event.isTrusted || event.isComposing) return;

    const key = String(event.key || "").toLowerCase();
    if (!REQUIRED_KEYS.has(key)) return;

    pressedKeys.add(key);
    if (!shortcutFired && allKeysPressed()) {
      shortcutFired = true;
      playSound();
    }
  }

  function onKeyUp(event) {
    const key = String(event.key || "").toLowerCase();
    if (!REQUIRED_KEYS.has(key)) return;

    pressedKeys.delete(key);
    if (!allKeysPressed()) shortcutFired = false;
  }

  function resetKeys() {
    pressedKeys.clear();
    shortcutFired = false;
  }

  // Capture phase makes the shortcut reliable on pages with their own
  // keyboard handlers. We do not cancel normal key events or page shortcuts.
  document.addEventListener("keydown", onKeyDown, true);
  document.addEventListener("keyup", onKeyUp, true);
  window.addEventListener("blur", resetKeys, true);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState !== "visible") resetKeys();
  }, true);
})();