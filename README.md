# My Portfolio Page Source Code

Hi I'm Danny, welcome to the source code of my website.  
If you like it, give me a **star** and feel free to clone.

## 💡 Ideal 
- Pokédex Search App, use PokeAPI
- Game, something easy like:
   - Snake
   - Tetris
   - Xs & Os / Tic-Tac-Toe
- An OS Menu Setting, change color or font
   - Learn how to use `useContext` hook

## ✅ Todo List

### 🔧 OS Core Function

#### Draggable and Resizable Function (high priority)
- [X] Draggable Component
- [X] Draggable Icon
- [X] Resizable Component

#### Controls Function (high priority)
- [X] Open Function
- [X] Close Function
- [X] Minimize Function
- [X] Focus Function
- [X] Maximize Function
   - [X] Remember the current width and height before maximize
   - [X] Set width and height using `window.innerWidth` and `window.innerHeight`
   - [X] Maximize Animation
   - [X] Double-click the title bar will maximize the app
   - [X] When `maximize`, double click the title bar to return the original width and height
   - [X] When `maximize`, dragging will bring back the width and height of the app and stayed with the mouse drag position
- [ ] Popup Component (this is hard...)
   - [ ] Create new window when user clicks on the image

#### Notification Toast (cosmetic - low priority)
- [ ] Success Toast
- [ ] Failed Toast 
- [ ] Warning Toast – if something breaks...
- [ ] Debug Toast - for development...

#### Boot up Animation (cosmetic - low priority)
- [ ] Wait for images to load (use async/await)
- [ ] Wait for functions to load (maybe redundant)

#### Login Screen (cosmetic - low priority)
- [ ] Use PIN to access
- [ ] On-screen sticky note containing PIN

#### Taskbar (high priority)
**Left Side: The Start Menu**
- [ ] List all apps in the "Start" menu
- [ ] Open app from the listed "Start" menu
- [ ] Focus app if already opened

**Middle: Taskbar Application**
- [ ] Show apps already opened
- [ ] Focus app when clicked in taskbar

**Right Side: Date/Time and Calendar**
- [ ] Fetch weather API base on location - need user location permission
- [ ] Show weather menu popup when click

### 💽 Application

#### Introduction ✔

#### Contact Me ✔
- [X] GitHub Page
- [X] LinkedIn Page
- [X] Discord Username

#### Note
**Main Function**
- [ ] Create database using IndexedDB - *Ongoing*
   - [ ] When database is empty, initailize database with default note
- [ ] Create basic CRUD function

**Left Side (Scale 1/4): List Note**
- [ ] Title, Date and Time
- [ ] Highlight current note
- [ ] Minimize sidebar
- [ ] Sidebar menu to create note
- [ ] Sidebar menu to delete multiple/selected notes

**Right Side (Scale 3/4): Content Note**
- [ ] Edit content note
   - [ ] A button for switching between Edit mode and Read mode
- [ ] Use `react-markdown` to display note element
- [ ] Upload picture based on location (needs more research)

#### This Project Timeline
- [ ] Show Ideal/Todo list (Get README.md from this project)
- [ ] Fetch GitHub commit API
- [ ] Show commit time and message
- [ ] Limit to 10 commit history per page

#### Project List/Skill
**Project List Tab**
- [ ] List GitHub work here using URL
