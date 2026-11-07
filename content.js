(() => {
  "use strict";

  const REQUIRED_KEYS = new Set(["n", "u", "l"]);
  const pressed = new Set();
  let firedForThisPress = false;

  // The audio file is packaged with the extension. No YouTube request is used.
  const audio = new Audio(chrome.runtime.getURL("assets/homer.mp3"));
  audio.preload = "auto";
  audio.volume = 1;

  function normalizedKey(event) {
    const key = String(event.key || "").toLowerCase();
    if (REQUIRED_KEYS.has(key)) return key;

    // Fallback for unusual keyboard layouts or missing event.key values.
    const code = String(event.code || "");
    if (code.startsWith("Key")) {
      const fallback = code.slice(3).toLowerCase();
      if (REQUIRED_KEYS.has(fallback)) return fallback;
    }
    return "";
  }

  function reset() {
    pressed.clear();
    firedForThisPress = false;
  }

  function onKeyDown(event) {
    if (!event.isTrusted || event.isComposing) return;

    const key = normalizedKey(event);
    if (!key) return;

    pressed.add(key);
    if (pressed.size === REQUIRED_KEYS.size && !firedForThisPress) {
      firedForThisPress = true;
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch (_) {
        // The first playback can start before metadata has loaded.
      }

      const playback = audio.play();
      if (playback && typeof playback.catch === "function") {
        playback.catch((error) => {
          // No UI or popup: leave a useful diagnostic in the page console.
          console.warn("C'est nul ! : impossible de lire le son.", error);
        });
      }
    }
  }

  function onKeyUp(event) {
    const key = normalizedKey(event);
    if (!key) return;

    pressed.delete(key);
    if (pressed.size < REQUIRED_KEYS.size) firedForThisPress = false;
  }

  // Window capture runs before page-level handlers; events are not cancelled.
  window.addEventListener("keydown", onKeyDown, true);
  window.addEventListener("keyup", onKeyUp, true);
  window.addEventListener("blur", reset, true);
  window.addEventListener("pagehide", reset, true);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState !== "visible") reset();
  }, true);
})();