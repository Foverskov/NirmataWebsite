// Example JavaScript: handle form submission
document.addEventListener("DOMContentLoaded", () => {
    // Header scroll functionality
    const header = document.querySelector('.header');
    const heroSection = document.querySelector('.hero-section');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Handle scroll event
    window.addEventListener('scroll', () => {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > heroBottom - 100) {
            header.classList.add('visible');
        } else {
            header.classList.remove('visible');
        }
    });
});