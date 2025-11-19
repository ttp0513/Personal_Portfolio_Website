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

// Default Menu Items Load - Specials
const menuContainer = document.querySelector('.menu-container');
    menuContainer.innerHTML = '';
    // Fetch Menu Data from menu.json and log it to the console
    async function loadSpecialMenu() {
    try {
    const res = await fetch('./menu.json');
    const data = await res.json();
    const specials = data.specials;
    specials.forEach(({ name, description, price, image_url }) => {
        menuContainer.innerHTML += `

        <div class="menu_card">
                <div class="menu_image">
                    <img src="${image_url}" alt="${name}" title="${name}"/>
                </div>

                <div class="menu_info">
                    <h2>${name}</h2>
                    <p>
                        ${description}
                    </p>
                    <h3>$${price.toFixed(2)}</h3>
                    <a href="" class="menu_btn">Order</a>
                </div>

            </div> 
        `;
    });
  } catch (err) {
    console.error('Error loading menu:', err);
  }
}
loadSpecialMenu();
                
// Event Listener for Specials Menu Button
const special = document.querySelector('.menu-button.special');
special.addEventListener('click', () => {
    menuContainer.innerHTML = '';
    loadSpecialMenu();
}
);

// Event Listener for Snacks Menu Button
const snacks = document.querySelector('.menu-button.snack');
snacks.addEventListener('click', () => {
    const scrollY = window.scrollY;
    menuContainer.innerHTML = '';
    // Fetch Menu Data from menu.json and log it to the console
    async function loadSnackMenu() {
    try {
    const res = await fetch('./menu.json');
    const data = await res.json();
    const snacks = data.snacks;
    snacks.forEach(({ name, description, price, image_url }) => {   
        menuContainer.innerHTML += `
        <div class="menu_card">
                <div class="menu_image">
                    <img src="${image_url}" alt="${name}" title="${name}"/>
                </div>
                <div class="menu_info">
                    <h2>${name}</h2>
                    <p>
                        ${description}
                    </p>
                    <h3>$${price.toFixed(2)}</h3>
                    <a href="" class="menu_btn">Order</a>
                </div>

            </div> 
        `;
    });
  } catch (err) {
    console.error('Error loading menu:', err);
  }
}
loadSnackMenu();
window.scrollTo(0, scrollY);
}
);

// Event Listener for Desserts Menu Button
const dessert = document.querySelector('.menu-button.dessert');
dessert.addEventListener('click', () => {
    const scrollY = window.scrollY;
    menuContainer.innerHTML = '';
    // Fetch Menu Data from menu.json and log it to the console
    async function loadDessertMenu() {
    try {
    const res = await fetch('./menu.json');
    const data = await res.json();
    const desserts = data.dessert;
    desserts.forEach(({ name, description, price, image_url }) => {   
        menuContainer.innerHTML += `
        <div class="menu_card">
                <div class="menu_image">
                    <img src="${image_url}" alt="${name}" title="${name}"/>
                </div>
                <div class="menu_info">
                    <h2>${name}</h2>
                    <p>
                        ${description}
                    </p>
                    <h3>$${price.toFixed(2)}</h3>
                    <a href="" class="menu_btn">Order</a>
                </div>

            </div> 
        `;
    });
  } catch (err) {
    console.error('Error loading menu:', err);
  }
}
loadDessertMenu();
window.scrollTo(0, scrollY);
}
);

// Event Listener for Drinks Menu Button
const drink = document.querySelector('.menu-button.drink');
drink.addEventListener('click', () => {
    const scrollY = window.scrollY;
    menuContainer.innerHTML = '';
    // Fetch Menu Data from menu.json and log it to the console
    async function loadDrinkMenu() {
    try {
    const res = await fetch('./menu.json');
    const data = await res.json();
    const drinks = data.drink;
    drinks.forEach(({ name, description, price, image_url }) => {   
        menuContainer.innerHTML += `
        <div class="menu_card">
                <div class="menu_image">
                    <img src="${image_url}" alt="${name}" title="${name}"/>
                </div>
                <div class="menu_info">
                    <h2>${name}</h2>
                    <p>
                        ${description}
                    </p>
                    <h3>$${price.toFixed(2)}</h3>
                    <a href="" class="menu_btn">Order</a>
                </div>
                
            </div> 
        `;
    });
    } catch (err) {
    console.error('Error loading menu:', err);
    }
    }
    loadDrinkMenu();
    window.scrollTo(0, scrollY);
}
);