const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul a');

function highlightNav() {
    let currentSection = '';

    // Determine which section is in view
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop <= window.innerHeight / 2 - 300){
            currentSection = section.getAttribute('id');
        }
    });

    // Update active class on navigation links
    navLinks.forEach(link => {
        link.children[0].classList.remove('active-section');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.children[0].classList.add('active-section');
        }
    });
}

// Listen for scroll events
window.addEventListener('scroll', highlightNav);

// Initialize highlighting on page load
highlightNav();