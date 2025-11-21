// Add Event Listeners to Menu Bar Icon to change hamburger menu to cross menu
let navBar = document.querySelector(".nav-bar"); 

navBar.addEventListener('click', () => {
    navBar.classList.toggle('active');
    document.querySelector('.nav-items').classList.toggle('active');
    
});

// Add Event to Top section when the window scrolls down
const toP = document.querySelector('.top')
window.addEventListener('scroll', () => {
    const windowY = this.pageYOffset;
    if (windowY > 500){
        toP.classList.add('active');
        document.querySelector('.logo').classList.add("logo-light");
        document.querySelector('.quote-box').classList.add("active");
    } else {
        toP.classList.remove('active')
        document.querySelector('.logo').classList.remove("logo-light");
        document.querySelector('.quote-box').classList.remove("active");
    };
});

// Add Event Click to Menu Button at home page

// Menu Rendering Logic

const menuContainer = document.querySelector('.menu-container');

// 1 Cache menu data
let menuData = null;

async function getMenuData() {
  if (menuData) return menuData;   // use cached data if it exists

  const res = await fetch('./menu.json');
  menuData = await res.json();
  return menuData;
}

// 2 Generic render function
async function renderMenu(categoryKey) {
  try {
    const data = await getMenuData();
    const items = data[categoryKey] || [];

    // build all cards first
    const html = items
      .map(({ name, description, price, image_url }) => 
        `<div class="menu_card">
          <div class="menu_image">
            <img src="${image_url}" alt="${name}" title="${name}"/>
          </div>

          <div class="menu_info">
            <h2>
              <span></span>
              <span class="menu-name">${name}</span> 
              <span class="favorite" data-name="${name}">
                  <i class="fa-regular fa-heart"></i>
              </span>
            </h2>
            <p>${description}</p>
            <h3>$${price.toFixed(2)}</h3>
            
            <a href="#" class="menu_btn">Order</a>

          </div>
        </div>`
      )
      .join('');

    menuContainer.innerHTML = html;  // write once ✨
    restoreFavorites(); // re-apply favorite states after rendering
  } catch (err) {
    console.error('Error loading menu:', err);
    menuContainer.innerHTML = '<p style="color: red; text-align: center;">Unable to load menu items.</p>';
  }
}

// 3 Default load = specials
renderMenu('specials');

// 4 Button listeners
const special = document.querySelector('.menu-button.special');
special.addEventListener('click', () => {
  renderMenu('specials');
});

const snacksBtn = document.querySelector('.menu-button.snack');
snacksBtn.addEventListener('click', () => {
  const scrollY = window.scrollY;
  renderMenu('snacks').then(() => {
    // optional: keep or remove this if it feels jerky
    window.scrollTo(0, scrollY);
  });
});

const dessertBtn = document.querySelector('.menu-button.dessert');
dessertBtn.addEventListener('click', () => {
  const scrollY = window.scrollY;
  renderMenu('dessert').then(() => {
    window.scrollTo(0, scrollY);
  });
});
const drinkBtn = document.querySelector('.menu-button.drink');
drinkBtn.addEventListener('click', () => {
  const scrollY = window.scrollY;
  renderMenu('drink').then(() => {
    window.scrollTo(0, scrollY);
  });
});

// 5. Favorite button handle clicks and save to localStorage

// Load favorites from localStorage (array of item names)
let favoriteItems = JSON.parse(localStorage.getItem("favorites")) || []; // JSON.parse turns string to array

// Restore favorites after render
function restoreFavorites() {
  favoriteItems.forEach(name => {
    const favSpan = menuContainer.querySelector(`.favorite[data-name="${CSS.escape(name)}"]`); // CSS.escape to handle special chars like Bún bò Huế
    if (favSpan) {
      const icon = favSpan.querySelector('i');
      icon.classList.remove('fa-regular');
      icon.classList.add('fa-solid');
      icon.style.color = '#fac031';
      favSpan.classList.add('is-favorited');
    }
  });
}

// Event delegation for clicks on hearts
menuContainer.addEventListener('click', (e) => {
  const favSpan = e.target.closest('.favorite');
  if (!favSpan) return;

  const itemName = favSpan.dataset.name;
  const icon = favSpan.querySelector('i');
  const isFav = favoriteItems.includes(itemName);

  if (isFav) {
    favoriteItems = favoriteItems.filter(n => n !== itemName);
    icon.classList.remove('fa-solid');
    icon.classList.add('fa-regular');
    icon.style.color = '';
    favSpan.classList.remove('is-favorited');
  } else {
    favoriteItems.push(itemName);
    icon.classList.remove('fa-regular');
    icon.classList.add('fa-solid');
    icon.style.color = '#fac031';
    favSpan.classList.add('is-favorited');
  }

  localStorage.setItem('favorites', JSON.stringify(favoriteItems));
});

// Add Mouseover and Mouseout effects for favorite hearts
menuContainer.addEventListener('mouseover', (e) => {
  const icon = e.target.closest('.fa-heart');
  // Only proceed if hovering over a heart icon
  if (icon) {
    const favSpan = icon.closest('.favorite');
    // Only change if not already favorited
    if (!favSpan.classList.contains('is-favorited')) {
      icon.classList.remove('fa-regular');
      icon.classList.add('fa-solid');
    }
  }
});

menuContainer.addEventListener('mouseout', (e) => {
  const icon = e.target.closest('.fa-heart');
  // Only proceed if hovering over a heart icon
  if (icon) {
    const favSpan = icon.closest('.favorite');
    // Only change if not already favorited
    if (!favSpan.classList.contains('is-favorited')) {
      icon.classList.remove('fa-solid');
      icon.classList.add('fa-regular');
    }
  }
});