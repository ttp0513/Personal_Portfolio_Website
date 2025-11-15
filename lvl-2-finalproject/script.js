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


// Fetch Menu Data from menu.json and log it to the console
const menuContainer = document.querySelector('.menu-container');
const special = document.querySelector('.menu-button.special');
special.addEventListener('click', () => {
    menuContainer.innerHTML = '';
    async function loadMenu() {
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

                <div class="small_card">
                    <i class="fa-solid fa-heart"></i>
                </div>

                <div class="menu_info">
                    <h2>${name}</h2>
                    <p>
                        ${description}
                    </p>
                    <h3>${price.toFixed(2)}</h3>
                    <div class="menu_icon">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star-half-stroke"></i>
                    </div>
                    <a href="#" class="menu_btn">Order</a>
                </div>

            </div> 
        `;
    });
  } catch (err) {
    console.error('Error loading menu:', err);
  }
}
loadMenu();
}
);


