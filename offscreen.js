(() => {
  "use strict";

  const audio = new Audio(chrome.runtime.getURL("assets/homer.mp3"));
  audio.preload = "auto";
  audio.volume = 1;

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message?.target !== "c-est-nul-offscreen" || message.type !== "PLAY_HOMER_SOUND") {
      return false;
    }

    try {
      audio.pause();
      audio.currentTime = 0;
    } catch (_) {
      // Playback can be requested before the media metadata has loaded.
    }

    audio.play().then(() => {
      sendResponse({ ok: true });
    }).catch((error) => {
      sendResponse({ ok: false, error: String(error?.message || error) });
    });

    return true;
  });
})();
