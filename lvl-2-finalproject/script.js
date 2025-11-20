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
            <h2>${name}</h2>
            <p>${description}</p>
            <h3>$${price.toFixed(2)}</h3>
            <a href="#" class="menu_btn">Order</a>
          </div>
        </div>`
      )
      .join('');

    menuContainer.innerHTML = html;  // write once ✨


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