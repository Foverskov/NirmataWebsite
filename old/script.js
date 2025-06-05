// Single DOMContentLoaded event listener
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

    // Cookie consent functionality
    const cookieBanner = document.getElementById('cookie-consent');
    const acceptButton = document.getElementById('accept-cookies');
    const declineButton = document.getElementById('decline-cookies');
    const spotifySection = document.querySelector('.spotify-embeds');
    const noConsentMessage = document.querySelector('.no-consent-message');

    // Debug logging
    console.log('Cookie banner element:', cookieBanner);
    console.log('Current consent:', localStorage.getItem('cookieConsent'));

    // Function to handle Spotify embeds
    function handleSpotifyEmbeds(consent) {
        console.log('Handling consent:', consent);
        if (consent === 'accepted') {
            spotifySection.style.display = 'flex';
            noConsentMessage.style.display = 'none';
        } else if (consent === 'declined') {
            spotifySection.style.display = 'none';
            noConsentMessage.style.display = 'block';
        } else {
            spotifySection.style.display = 'none';
            noConsentMessage.style.display = 'none';
        }
    }

    // Initialize cookie consent
    function initCookieConsent() {
        const cookieConsent = localStorage.getItem('cookie-consent');
        console.log('Initializing consent:', cookieConsent);
        
        // Apply stored preference
        handleSpotifyEmbeds(cookieConsent);
        
        // Show banner if no choice made
        if (!cookieConsent) {
            console.log('No consent found, showing banner');
            cookieBanner.classList.add('show');
        }
    }

    // Cookie button event listeners
    if (acceptButton && declineButton) {
        acceptButton.addEventListener('click', () => {
            console.log('Accepting cookies');
            localStorage.setItem('cookieConsent', 'accepted');
            cookieBanner.classList.remove('show');
            handleSpotifyEmbeds('accepted');
        });

        declineButton.addEventListener('click', () => {
            console.log('Declining cookies');
            localStorage.setItem('cookieConsent', 'declined');
            cookieBanner.classList.remove('show');
            handleSpotifyEmbeds('declined');
        });
    } else {
        console.error('Cookie consent buttons not found');
    }

    // Load Instagram feed
    async function loadInstagramFeed() {
        const feed = document.getElementById('instagram-feed');
        
        try {
            const response = await fetch('YOUR_INSTAGRAM_API_ENDPOINT');
            const data = await response.json();
            
            data.forEach(post => {
                const postElement = document.createElement('a');
                postElement.href = post.permalink;
                postElement.className = 'instagram-post';
                postElement.target = '_blank';
                
                const img = document.createElement('img');
                img.src = post.media_url;
                img.alt = post.caption || 'Instagram post';
                
                postElement.appendChild(img);
                feed.appendChild(postElement);
            });
        } catch (error) {
            console.error('Error loading Instagram feed:', error);
        }
    }

    // Initialize everything
    if (cookieBanner) {
        initCookieConsent();
    } else {
        console.error('Cookie banner element not found');
    }
    loadInstagramFeed();
});