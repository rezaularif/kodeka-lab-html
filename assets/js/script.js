// GSAP Animations and Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Remove any unwanted scroll navigation or sidebar elements
    removeUnwantedScrollNavigation();
    
    // Initialize GSAP animations for hero section
    initHeroAnimations();
    
    // Initialize FAQ accordion functionality
    initFaqAccordion();
    
    // Function to initialize hero animations
    function initHeroAnimations() {
        // Create a timeline for hero animations
        const heroTl = gsap.timeline({
            defaults: { ease: "power3.out" }
        });
        
        // Animate hero elements
        heroTl.from('.hero-heading', { 
            y: 50, 
            opacity: 0, 
            duration: 1.2,
            stagger: 0.2
        })
        .from('.tagline', { 
            y: 30, 
            opacity: 0, 
            duration: 0.8 
        }, "-=0.8")
        .from('.hero-description', { 
            y: 30, 
            opacity: 0, 
            duration: 0.8 
        }, "-=0.6")
        .from('.hero-buttons', { 
            y: 20, 
            opacity: 0, 
            duration: 0.6 
        }, "-=0.4")
        .from('.badge-container', {
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)"
        }, "-=0.8");
        
        // Animate the gradient text with a subtle shine effect
        gsap.to('.gradient-text', {
            backgroundPosition: "200% center",
            duration: 4,
            repeat: -1,
            ease: "sine.inOut"
        });
        
        // Parallax effect on scroll - TEMPORARILY DISABLED
        // gsap.to('.hero', {
        //     scrollTrigger: {
        //         trigger: '.hero',
        //         start: "top top",
        //         end: "bottom top",
        //         scrub: true
        //     },
        //     backgroundPosition: "50% 100%",
        //     ease: "none"
        // });
    }
    
    const navLinks = document.querySelectorAll('.nav-links a, .footer-links a, .hero-buttons a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if(targetId.startsWith('#')) {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Function to initialize FAQ accordion
    function initFaqAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        // Add click event to each question
        faqQuestions.forEach((question, index) => {
            question.addEventListener('click', () => {
                const faqItem = faqItems[index];
                
                // Close all other items
                faqItems.forEach(item => {
                    if (item !== faqItem && item.classList.contains('active')) {
                        item.classList.remove('active');
                    }
                });
                
                // Toggle current item
                faqItem.classList.toggle('active');
            });
        });
        
        // No item open by default in the new design
    }

    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Show all items if filter is 'all'
            if(filter === 'all') {
                portfolioItems.forEach(item => {
                    item.style.display = 'block';
                });
            } else {
                // Show items that match the filter and hide others
                portfolioItems.forEach(item => {
                    if(item.classList.contains(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
        });
    });

    // Sticky header with glass effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if(window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // Simple validation
            let isValid = true;
            const requiredFields = ['name', 'email', 'message'];
            
            requiredFields.forEach(field => {
                if(!formValues[field] || formValues[field].trim() === '') {
                    isValid = false;
                }
            });
            
            if(isValid) {
                // Simulate form submission
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }

    // Add classes to portfolio items for filtering
    const portfolioCategories = {
        0: 'web',
        1: 'mobile',
        2: 'design',
        3: 'web',
        4: 'mobile',
        5: 'design'
    };
    
    portfolioItems.forEach((item, index) => {
        if(portfolioCategories[index]) {
            item.classList.add(portfolioCategories[index]);
        }
    });

    // Function to remove unwanted scroll navigation elements
    function removeUnwantedScrollNavigation() {
        // Disable any GSAP ScrollTrigger navigation if it exists
        if (window.ScrollTrigger && ScrollTrigger.getAll) {
            try {
                ScrollTrigger.getAll().forEach(trigger => {
                    if (trigger.vars && (trigger.vars.pin || trigger.vars.navigation || trigger.vars.nav)) {
                        trigger.kill();
                    }
                });
            } catch (e) {
                console.log('ScrollTrigger cleanup error:', e);
            }
        }

        // List of selectors for potential unwanted navigation elements
        const unwantedSelectors = [
            '.scroll-nav',
            '.floating-nav',
            '.sidebar-nav',
            '.scroll-indicator',
            '.section-nav',
            '.scroll-navigation',
            '.floating-menu',
            '.gsap-scroll-nav',
            '.scroll-spy',
            '.page-nav',
            '.section-indicator',
            '[class*="scroll-nav"]',
            '[class*="floating-nav"]',
            '[class*="sidebar-nav"]',
            '[class*="scroll-indicator"]',
            '[class*="section-nav"]',
            '[class*="scroll-spy"]',
            '[class*="page-nav"]',
            '[class*="gsap"]',
            '[id*="scroll-nav"]',
            '[id*="floating-nav"]',
            '[id*="sidebar"]',
            '[id*="gsap"]',
            '[data-scroll-nav]',
            '[data-section-nav]',
            '[data-spy]'
        ];

        // Remove elements matching these selectors
        unwantedSelectors.forEach(selector => {
            try {
                const elements = document.querySelectorAll(selector);
                elements.forEach(element => {
                    if (element && !element.classList.contains('mobile-menu') && element.tagName !== 'HEADER') {
                        element.remove();
                    }
                });
            } catch (e) {
                // Ignore invalid selectors
            }
        });

        // Aggressive approach: Remove any fixed positioned elements on the right side
        const allElements = document.querySelectorAll('*');
        allElements.forEach(element => {
            if (element.tagName !== 'HEADER' && !element.classList.contains('mobile-menu')) {
                const computedStyle = window.getComputedStyle(element);
                const rect = element.getBoundingClientRect();
                
                // Check if element is positioned on the right side and might be a navigation
                if (computedStyle.position === 'fixed' && 
                    (rect.right > window.innerWidth - 200 || 
                     computedStyle.right !== 'auto' || 
                     element.style.right)) {
                    
                    // Additional check: if it looks like navigation (contains nav-like text)
                    const text = element.textContent || '';
                    const navKeywords = ['features', 'process', 'work', 'pricing', 'contact', 'home', 'about'];
                    const hasNavText = navKeywords.some(keyword => 
                        text.toLowerCase().includes(keyword.toLowerCase())
                    );
                    
                    if (hasNavText || element.children.length > 2) {
                        console.log('Removing potential sidebar navigation:', element);
                        element.remove();
                    }
                }
            }
        });

        // Also set up an observer to remove any dynamically added navigation
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        // Check if the added node or its children match unwanted navigation patterns
                        unwantedSelectors.forEach(selector => {
                            try {
                                if (node.matches && node.matches(selector) && !node.classList.contains('mobile-menu') && node.tagName !== 'HEADER') {
                                    node.remove();
                                }
                                const childElements = node.querySelectorAll ? node.querySelectorAll(selector) : [];
                                childElements.forEach(child => {
                                    if (!child.classList.contains('mobile-menu') && child.tagName !== 'HEADER') {
                                        child.remove();
                                    }
                                });
                            } catch (e) {
                                // Ignore invalid selectors
                            }
                        });
                    }
                });
            });
        });

        // Start observing
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // Also set up a periodic check to remove any persistent navigation
        setInterval(() => {
            // Quick check for any elements on the right side that might be navigation
            const rightSideElements = Array.from(document.querySelectorAll('*')).filter(element => {
                if (element.tagName === 'HEADER' || element.classList.contains('mobile-menu')) {
                    return false;
                }
                
                const rect = element.getBoundingClientRect();
                const computedStyle = window.getComputedStyle(element);
                
                return computedStyle.position === 'fixed' && 
                       rect.right > window.innerWidth - 200 &&
                       rect.height > 100; // Likely a navigation if it's tall enough
            });

            rightSideElements.forEach(element => {
                const text = element.textContent || '';
                const navKeywords = ['features', 'process', 'work', 'pricing', 'contact'];
                const hasNavText = navKeywords.some(keyword => 
                    text.toLowerCase().includes(keyword.toLowerCase())
                );
                
                if (hasNavText) {
                    console.log('Periodic removal of sidebar navigation:', element);
                    element.remove();
                }
            });
        }, 1000); // Check every second
    }
});
