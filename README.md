# C'est nul ! — extension Arc

Petite extension Chromium/Arc qui joue le son de Homer Simpson lorsque les touches **N**, **U** et **L** sont maintenues simultanément.

## Installation dans Arc

1. Ouvre le dépôt GitHub et clique sur **Code → Download ZIP**.
2. Décompresse le ZIP dans un dossier.
3. Dans Arc, ouvre `arc://extensions` (ou `chrome://extensions`).
4. Active **Developer mode**.
5. Clique sur **Load unpacked** et sélectionne le dossier décompressé, celui qui contient directement `manifest.json`.

## Utilisation

Maintiens **N + U + L** en même temps : le son se lance, sans popup, fenêtre, notification ni changement d'onglet.

Le raccourci est écouté dans les pages web ordinaires, y compris YouTube. Il utilise le MP3 embarqué dans l'extension : il ne dépend pas des requêtes vidéo YouTube.

## Compatibilité et confidentialité

- Manifest V3, sans service worker, sans réseau et sans stockage.
- Le son est servi localement depuis l'extension.
- L'extension demande l'accès aux pages web pour écouter le raccourci dans les onglets. Elle n'envoie aucune donnée.
- Comme toute extension Chromium, elle ne peut pas s'exécuter sur certaines pages internes du navigateur (par exemple `arc://`, `chrome://`) ni dans les pages protégées du navigateur.

L'extension **Intégrales — YouTube Focus** n'a pas besoin d'être modifiée : son blocage cible les médias YouTube servis depuis `googlevideo.com`, tandis que ce son est un fichier local de cette extension.
