document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    
    // Toggle mobile menu dropdown
    mobileMenuToggle.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent the click from being detected by the document
        mobileMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && !mobileMenuToggle.contains(event.target) && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
        }
    });
    
    // Adjust menu position when header becomes sticky
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            // When header becomes sticky
            mobileMenu.style.top = '60px';
        } else {
            // When header is normal
            mobileMenu.style.top = '70px';
        }
    });
});
