// appfac.js

// Theme Toggler
document.addEventListener('DOMContentLoaded', () => {
    const themeToggler = document.querySelector('.theme-toggler');
    if (themeToggler) {
        themeToggler.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            themeToggler.children[0].classList.toggle('active');
            themeToggler.children[1].classList.toggle('active');
        });
    }
});