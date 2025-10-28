// Add Event Listeners to Menu Bar Icon to change hamburger menu to cross menu
let menuBar = document.querySelector(".nav-bar"); 

menuBar.addEventListener('click', () => {
    menuBar.classList.toggle('active');
    document.querySelector('.nav-items').classList.toggle('active');
});

// Add Event to Top section when the window scrolls down
const toP = document.querySelector('.top')
window.addEventListener('scroll', () => {
    const windowY = this.pageYOffset;
    if (windowY > 500){toP.classList.add('active')}
    else {toP.classList.remove('active')};
});


