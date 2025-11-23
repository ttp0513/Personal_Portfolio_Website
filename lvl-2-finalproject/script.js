// Add Event Listener to Nav Bar Icon
const navBar = document.querySelector(".nav-bar"); 

navBar.addEventListener('click', () => {
    navBar.classList.toggle('active');
    document.querySelector('.nav-items').classList.toggle('active');
    
});


// Add Event Listener to Cart Icon
const cartIcon = document.querySelector(".cart-icon");
const cartTab = document.querySelector(".cart-tab");

cartIcon.addEventListener('click', () => {
  cartTab.classList.toggle('active');
})

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
      .map(({ name, description, price, image_url}) => 
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
            
            <button class="menu_order" data-name="${name}">Order</button>

          </div>
        </div>`
      )
      .join('');

    menuContainer.innerHTML = html;  
    restoreFavorites(); // re-apply favorite states after rendering
  } catch (err) {
    console.error('Error loading menu:', err);
    menuContainer.innerHTML = '<p style="color: red; text-align: center;">Unable to load menu items.</p>';
  }
}

// 3 On load: restore last category or default to 'specials'
const lastMenuViewed = localStorage.getItem('lastMenuCategory') || 'specials';
renderMenu(lastMenuViewed);

// 4 Button listeners
const special = document.querySelector('.menu-button.special');
special.addEventListener('click', () => {
  const scrollY = window.scrollY;
  renderMenu('specials').then(() => {
    window.scrollTo(0, scrollY);
    localStorage.setItem('lastMenuCategory', 'specials');
  });
});

const snacksBtn = document.querySelector('.menu-button.snack');
snacksBtn.addEventListener('click', () => {
  const scrollY = window.scrollY;
  renderMenu('snacks').then(() => {
    window.scrollTo(0, scrollY);
    localStorage.setItem('lastMenuCategory', 'snacks');
  });
});

const dessertBtn = document.querySelector('.menu-button.dessert');
dessertBtn.addEventListener('click', () => {
  const scrollY = window.scrollY;
  renderMenu('dessert').then(() => {
    window.scrollTo(0, scrollY);
    localStorage.setItem('lastMenuCategory', 'dessert');
  });
});
const drinkBtn = document.querySelector('.menu-button.drink');
drinkBtn.addEventListener('click', () => {
  const scrollY = window.scrollY;
  renderMenu('drink').then(() => {
    window.scrollTo(0, scrollY);
    localStorage.setItem('lastMenuCategory', 'drink');
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


// Cart Tab Scripts
const cartList = document.querySelector(".cart-list");

menuContainer.addEventListener("click", (e)=>{
  const menuBtn = e.target.closest('.menu_order');
  if (!menuBtn) return;
  e.preventDefault();

  // Add animation class to order button
  menuBtn.classList.add("clicked");
  setTimeout(() => {
    menuBtn.classList.remove("clicked");
  }, 200);

  // Populate order cart
  const orderCard = menuBtn.closest('.menu_card');
  const orderImg = orderCard.querySelector('.menu_image img');

  const orderName = menuBtn.dataset.name || orderCard.querySelector('.menu-name')?.textContent;

  const orderImageSrc = orderImg?.getAttribute('src');
  const orderImageAlt = orderImg?.getAttribute('alt') || orderName;

  const orderPriceText = orderCard.querySelector("h3")?.textContent?.trim() || "";
  const orderPriceNum = parseFloat(orderPriceText.replace(/[^0-9.]/g, "")); // 5.5

  // Check if the menu item already exists in the cart tab
  const existingItem = cartList.querySelector(`.cart-item .quantity[data-name="${orderName}"]`);

  // if exists, increase the quantity of that cart item
 if (existingItem) {
    // ✅ If exists, increment quantity
    let quantity = parseInt(existingItem.textContent, 10);
    quantity++;
    existingItem.textContent = quantity;
  } 
  // if not; Create cart item HTML
  else {
    const cartItemHTML = `
      <div class="cart-item">
        <div class="cart-img">
          <img src="${orderImageSrc}" alt="${orderImageAlt}" />
        </div>
        <div class="cart-name">${orderName}
        </div>
        <div class="cart-price">$${orderPriceNum.toFixed(2)}
        </div>
        <div class="cart-quantity">
          <span class="minus" aria-label="Decrease quantity">−</span>
          <span class="quantity" data-name="${orderName}">1</span>
          <span class="plus" aria-label="Increase quantity">+</span>
        </div>
        
      </div>
    `;
      cartList.innerHTML += cartItemHTML;
  }
  //Update cart Total & cart Count
  updateCartTotal();
});

// Update Cart Total Function whenever new menu item is added to cart
function updateCartTotal() {
  let total = 0;
  let itemCount = 0;
  const cartItems = document.querySelectorAll(".cart-item");
  const cartTotal = document.querySelector(".cart-total")

  cartItems.forEach(item => {
    const priceEl = item.querySelector(".cart-price");
    const quantityEl = item.querySelector(".quantity");

    const price = parseFloat(priceEl.textContent.replace(/[^0-9.]/g, ""));
    const quantity = parseInt(quantityEl.textContent, 10);

    total += price * quantity;
    itemCount += quantity;
  });

  // update total price in cart tab
  if (cartTotal) {
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  }

  // update cart icon badge
  const cartIconNum = document.querySelector(".cart-count");
  if (cartIconNum) {
    cartIconNum.textContent = itemCount;
  }

};

// Add Listener to + and - button in the Cart Tab
cartList.addEventListener("click", (e) => {
  if (e.target.classList.contains("plus") || e.target.classList.contains("minus")) {
    const item = e.target.closest(".cart-item");
    const quantityEl = item.querySelector(".quantity");
    let quantity = parseInt(quantityEl.textContent, 10);

    if (e.target.classList.contains("plus")) {
      quantity++;
      quantityEl.textContent = quantity; 
    } else if (e.target.classList.contains("minus")) {
        if (quantity > 1) {
          quantity--;
          quantityEl.textContent = quantity;
        } else {
        // remove the cart item entirely
        item.remove();
      }
    }
    updateCartTotal();
  }
});

