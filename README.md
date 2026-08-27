# Not Fight Club

## Tasks [RSSchool Stage 1 — Not Fight Club](https://github.com/rolling-scopes-school/tasks/blob/master/stage0.5%20Bootcamp/tasks/notFightClub/README.md)

<img width="320" height="163" alt="Registration" src="https://github.com/user-attachments/assets/9d22700b-f138-4909-930d-a72b5c5b32f6" />
<img width="320" height="163" alt="Home" src="https://github.com/user-attachments/assets/b36f1893-fca1-4dd5-b61d-48908468592f" />
<img width="320" height="163" alt="Character" src="https://github.com/user-attachments/assets/06f1696a-8278-47ea-90e8-ec4b6e7185ba" />
<img width="320" height="163" alt="Battle" src="https://github.com/user-attachments/assets/146278bf-f3ca-457b-993b-0185aea7cae1" />
<img width="320" height="163" alt="Settings" src="https://github.com/user-attachments/assets/54f97690-11bb-4c8c-b9c5-02dc8cd27cc0" />

## [Deployment](https://skibsky-ivan.github.io/Not-Fight-Club/)

---

## Section 1 — Registration screen (20/20)

* [x] An input lets the player enter their name
* [x] The entered name is reused on every other screen and persists across reloads

## Section 2 — Home screen (10/10)

* [x] A start button creates a new battle and opens the battle page

## Section 3 — Character page (45/45)

* [x] The page shows the character's avatar
* [x] The page shows the player's name and the win/loss record
* [x] The player can choose a new avatar from a set of images, and the chosen avatar is reflected everywhere it's shown

## Section 4 — Settings page (20/20)

* [x] The player can change their name
* [x] The new name is reflected on every other screen and persists across reloads

## Section 5 — Battle page (175/175)

* [x] The page shows the player and the opponent with interactive HP bars that update according to the battle logic
* [x] When a battle is created, the opponent is picked from a predefined pool of at least 2 opponents with different attack/defense profiles
* [x] Full working battle mechanics: zone selection, attack/defense matching, simultaneous resolution, opponent randomization within profile, no repeated zones in a single turn
* [x] Critical hits are implemented: a random chance to deal extra damage; a critical hit also breaks through a block
* [x] A battle log shows every action of every turn with the required fields (WHO, WHOM, WHERE, HOW MUCH)
* [x] Log entries visually highlight key pieces of information (different styles for names, zones, damage values)

## Section 6 — Bonus: full persistence (30/30)

* [x] All game data is persisted, so that after a page reload the player can continue with the same character, keep their win/loss record, and resume an in-progress battle in the exact same state (HP, current turn, log)

## Penalties

* [x] HP is at least 3× the base damage for every fighter (no one-turn fights)
* [x] No UI framework used (Vanilla TypeScript, no React/Vue/Angular/Svelte)
* [x] No console errors during normal use

---

## Technical Stack

* **Language:** TypeScript
* **Bundler:** Vite
* **Architecture:** Custom Component-based framework (no external UI libraries)
* **Routing:** Custom HashRouter (SPA, no full reloads)
* **State:** Global Store with pub/sub pattern
* **Persistence:** localStorage (player profile, stats, battle state, settings)
* **Styling:** CSS custom properties, medieval theme system
