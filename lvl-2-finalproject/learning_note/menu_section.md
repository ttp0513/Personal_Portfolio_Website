# 📘 Learning Notes: Menu Sections

## 1. Querying `.favorite` Elements
### What I did**
```js
  const favItem = document.querySelectorAll('.favorite');
```
---

### Why it was wrong**
It returned an empty NodeList because I ran the query before rendering the menu cards with innerHTML. At that moment, .favorite spans didn’t exist in the DOM yet.

---

### Solution
Used event delegation:
```js
menuContainer.addEventListener('click', e => {
  const favSpan = e.target.closest('.favorite');
  if (favSpan) { /* handle click */ }
});
```
One listener, always active.
Works across all categories (specials, snacks, dessert, etc.).
No need to rebind after every render.

---

### *Why `menuContainer` instead of directly to each `.favorite` element**

In short: `menuContainer` is stable and always exists, while `.favorite` elements are temporary and get replaced. Event delegation ensures favorite toggle logic survives re-renders.

Every time calling renderMenu(...), it replaces the entire innerHTML of `.menu-container.` That means all the .favorite spans are destroyed and recreated.
If attaching listeners directly to each `.favorite` before, they’d be lost after the next render.
By attaching one listener to the parent container (`menuContainer`) and using `e.target.closest('.favorite')`, it results in event delegation:
- The parent listens for all clicks inside it.
- When a click bubbles up, it checks if the click came from a .favorite span.
- This works even if the children are replaced later.

## 2. Caching Data in Menu Sections

### What I Did
I had a separate `fetch` API call for each of the menu navigation buttons (`specials`, `snacks`, `dessert`, `drink`).  
Every time I clicked a button, the app made a new request to `menu.json`.  
This caused **multiple fetch calls** and visible **flickering issues** whenever I switched between sections.

---

### Why It Was Wrong
- **Redundant network requests**: I was fetching the same JSON file repeatedly, even though the data didn’t change.
- **Performance issues**: Multiple fetches slowed down the app and created unnecessary load.
- **UI flicker**: Because the DOM was cleared and re-rendered after each fetch, the menu briefly disappeared before the new data loaded.

---

### Solution
I introduced **caching** by storing the menu data in a variable after the first fetch:

```js
let menuData = null;

async function getMenuData() {
  if (menuData) return menuData;   // use cached data if it exists

  const res = await fetch('./menu.json');
  menuData = await res.json();
  return menuData;
}
```
--- 

## 3. Styling Favorite Heart
## What I Did
I tried to add a hover effect in CSS to make the heart change from regular to solid:
```css
  .menu-container .menu_card .menu_info .fa-heart:hover {
    color: var(--title);
    transition: all 0.5s ease;
  }
```
I expected CSS to swap fa-regular to fa-solid on hover, but it only changed the color.
After realizing CSS can’t swap Font Awesome classes, I added JavaScript mouseover and mouseout listeners to toggle classes.
This worked visually, but it conflicted with my click event: hover logic kept overriding the clicked “favorited” state.

---

## Why It Was Wrong
CSS limitation: CSS can style properties (color, size, transitions) but cannot swap Font Awesome classes (fa-regular ↔ fa-solid). That requires JavaScript.

JS hover conflict: My hover handlers always forced the icon back to regular on mouseout, even if the heart was already favorited by a click.

Result: Clicking a heart to save it didn’t persist visually because hover logic undid the click state.

---

## Solution
Use CSS only for styling (color, transitions), not for class changes.

Use JavaScript for state changes (regular to solid and vice versa) and persistence.

Add a check in hover logic to only affect non-favorited hearts:
```js
if (!favSpan.classList.contains('is-favorited')) {
  // apply hover effect
}
```
Represent states with classes:
.is-favorited => clicked hearts stay solid and colored.
Hover logic ignores elements with .is-favorited.