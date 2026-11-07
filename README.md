# C'est nul ! — extension Arc

Joue le son de Homer Simpson sans ouvrir de popup, fenêtre, onglet ou notification.

## Déclencheurs

- **Raccourci clavier : `Alt + Maj + N`**. Il est géré directement par Chromium avec l'API `commands`, pas par les événements clavier des pages web.
- **Secours : clic sur l'icône de l'extension** dans la barre d'outils d'Arc. Aucun popup n'est ouvert.

Le raccourci peut être changé dans `arc://extensions/shortcuts` (ou `chrome://extensions/shortcuts`), dans la ligne « C'est nul ! ».

## Installation

1. Télécharge et décompresse le ZIP.
2. Ouvre `arc://extensions`.
3. Active **Developer mode**.
4. Clique sur **Load unpacked** et choisis le dossier contenant directement `manifest.json`.
5. Épingle l'extension dans la barre d'outils pour disposer du déclencheur de secours.
6. Recharge éventuellement les onglets ouverts.

## Fonctionnement

- Le son est lu depuis un MP3 embarqué localement.
- L'extension utilise un document audio invisible (`offscreen`) : aucune fenêtre n'apparaît.
- Aucun accès aux sites web, aucun script injecté dans YouTube, aucun accès réseau.
- L'extension Intégrales — YouTube Focus n'est pas modifiée et ne bloque pas ce fichier audio local.

Le raccourci initial `N + U + L` a été remplacé : les navigateurs ne proposent pas de raccourci d'extension fiable avec trois lettres maintenues sans modificateur. Le nouveau raccourci est géré au niveau du navigateur.
