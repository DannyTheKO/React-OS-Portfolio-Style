# My Portfolio Page Source Code

Hi I'm Danny, welcome to the source code of my website.  
If you like it, give me a **star** and feel free to copy my code.

## 🐛 Swatting Bug/Chores ^^
1. [ ] Reformat the CSS variable
2. [ ] Font are oversize when user browser zoom-in
3. [ ] Dynamic app on `sessionStorage`, get the class name or component name?
4. [ ] Executable padding it a little bit tight
5. [ ] Dragging application make cursor sometime stuck at grab icon

**Backlog**
- [X] Move `visibleClass` useState out of the App
- [X] Limit user resize component, prevent overflow beyond the screen
- [X] Position is wrong when both app open
- [X] logic calculation on z-index is wrong
- [X] Resize div are in wrong position when reopen the app
- [X] Style Contact Me App

## 💡 Ideal
- Pokédex App, use PokeAPI
- Game, something easy like:
   - Snake
   - Tetris
   - Xs & Os / Tic-Tac-Toe
- An OS Menu Setting, change color or font
   - Learn how to use `useContext` hook

## ✅ Todo List

### OS Core Function

#### Draggable and Resizable Function
- [x] Draggable Component
- [ ] Draggable Icon
- [x] Resizable Component

#### Controls Function
- [x] Open Function
   - [x] Animation
- [x] Close Function
   - [x] Animation
- [x] Minimize Function
   - [x] Animation
- [X] Focus Function
- [ ] Maximize Function
   - [ ] Remember the current width and height before maximize
   - [ ] Set width and height using `window.innerWidth` and `window.innerHeight`
   - [ ] Animation
- [ ] Popup Component (this is hard...)
   - [ ] Create new window when user clicks on the image

#### Notification Toast
- [ ] Toast Success – on changing something?
- [ ] Toast Failed – maybe failed API fetch?
- [ ] Toast Warning – if something breaks...

#### Boot up Animation
- [ ] Wait for images to load (use async/await)
- [ ] Wait for functions to load (maybe redundant)

#### Login Screen
- [ ] Use PIN to access
- [ ] On-screen sticky note containing PIN

#### Taskbar
**Left Side: The Start Menu**
- [ ] List all apps in the "Start" menu
- [ ] Open app from the listed "Start" menu
- [ ] Focus app if already opened

**Middle: Taskbar Application**
- [ ] Show apps already opened
- [ ] Focus app when clicked in taskbar

**Right Side: Date/Time and Calendar**
- [ ] Fetch weather API
- [ ] Maybe show weather in the menu?

### 💽 Application

#### Introduction ✔

#### Contact Me ✔
- [X] GitHub Page
- [X] LinkedIn Page
- [X] Discord Username

#### Note 
**Side Bar (Scale 1/4): List Note**
- [ ] Title, Time and Date
- [ ] Highlight current note
- [ ] Minimize sidebar
- [ ] Sidebar menu to create note
- [ ] Sidebar menu to delete multiple/selected notes

**Left Side (Scale 3/4): Content Note**
- [ ] Edit content note
- [ ] Upload picture based on location (needs more research)

#### Project Timeline/List

**Project Timeline Tab**
- [ ] Show Ideal/Todo list
- [ ] Fetch GitHub API
- [ ] Show commit time and message
- [ ] Limit to 10 commit history

**Project List Tab**
- [ ] List GitHub work here using URL  
