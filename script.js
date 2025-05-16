// DOM Elements
const header = document.getElementById('header');
const scrollTop = document.getElementById('scrollTop');
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');
const journeyCards = document.querySelectorAll('.journey-stage-card');
const journeyPrev = document.querySelector('.journey-prev');
const journeyNext = document.querySelector('.journey-next');
const journeyIndicators = document.querySelectorAll('.journey-indicator');
const journeyContainer = document.querySelector('.transformation-journey');

// Global variables
let currentJourneyIndex = 0;
const totalJourneyStages = journeyCards.length;

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        scrollTop.classList.add('active');
    } else {
        header.classList.remove('scrolled');
        scrollTop.classList.remove('active');
    }
});

// Mobile navigation toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    nav.classList.toggle('active');
});

// Close nav when clicking links (mobile)
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Services tab functionality
document.querySelectorAll('.tab-item').forEach(tab => {
    tab.addEventListener('click', function() {
        // Get the target tab ID
        const tabId = this.getAttribute('data-tab');
        
        // Remove active class from all tabs
        document.querySelectorAll('.tab-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Hide all tab panes
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        
        // Show the target tab content
        document.getElementById(tabId).classList.add('active');
    });
});

// Footer service links tab switching
document.querySelectorAll('.footer-links a[data-tab]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const tabId = this.getAttribute('data-tab');
        const servicesSection = document.getElementById('services');
        
        // Scroll to services section
        window.scrollTo({
            top: servicesSection.offsetTop - 100,
            behavior: 'smooth'
        });
        
        // Switch to the correct tab after a short delay to allow scrolling
        setTimeout(() => {
            // Find the tab item with matching data-tab
            const tabItem = document.querySelector(`.tab-item[data-tab="${tabId}"]`);
            if (tabItem) {
                tabItem.click();
            }
        }, 700);
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.25
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// Observe elements
const animateElements = document.querySelectorAll('.section-title, .contact-form, .contact-info');
animateElements.forEach(element => {
    observer.observe(element);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Journey Carousel Functionality
function updateJourneyCarousel() {
    const cardWidth = journeyCards[0].offsetWidth + 
                      parseInt(getComputedStyle(journeyCards[0]).marginRight);
    
    // Calculate the translation distance based on card width
    const translateX = -currentJourneyIndex * cardWidth;
    
    // Apply the translation
    journeyContainer.style.transform = `translateX(${translateX}px)`;
    
    // Update active indicator
    journeyIndicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentJourneyIndex);
    });
    
    // Enable/disable navigation buttons
    if (journeyPrev) {
        journeyPrev.style.opacity = currentJourneyIndex === 0 ? '0.5' : '1';
        journeyPrev.style.pointerEvents = currentJourneyIndex === 0 ? 'none' : 'auto';
    }
    
    if (journeyNext) {
        journeyNext.style.opacity = currentJourneyIndex === totalJourneyStages - 1 ? '0.5' : '1';
        journeyNext.style.pointerEvents = currentJourneyIndex === totalJourneyStages - 1 ? 'none' : 'auto';
    }
}

// Journey navigation buttons
if (journeyPrev) {
    journeyPrev.addEventListener('click', () => {
        if (currentJourneyIndex > 0) {
            currentJourneyIndex--;
            updateJourneyCarousel();
        }
    });
}

if (journeyNext) {
    journeyNext.addEventListener('click', () => {
        if (currentJourneyIndex < totalJourneyStages - 1) {
            currentJourneyIndex++;
            updateJourneyCarousel();
        }
    });
}

// Journey indicators click
journeyIndicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentJourneyIndex = index;
        updateJourneyCarousel();
    });
});

// Enable touch/swipe for journey cards on mobile
let touchStartX = 0;
let touchEndX = 0;
let isSwiping = false;

const journeyScrollContainer = document.querySelector('.journey-scroll-container');

if (journeyScrollContainer) {
    journeyScrollContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        isSwiping = true;
    }, { passive: true });
    
    journeyScrollContainer.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;
        touchEndX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    journeyScrollContainer.addEventListener('touchend', () => {
        isSwiping = false;
        handleSwipe();
    });
}

function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;
    
    if (swipeDistance > 70) {
        // Swiped right
        if (currentJourneyIndex > 0) {
            currentJourneyIndex--;
            updateJourneyCarousel();
        }
    } else if (swipeDistance < -70) {
        // Swiped left
        if (currentJourneyIndex < totalJourneyStages - 1) {
            currentJourneyIndex++;
            updateJourneyCarousel();
        }
    }
}

// Form validation and submission
function validateForm(form) {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9\s\+\-\(\)]{10,20}$/;
    
    // Reset all feedback elements
    form.querySelectorAll('.form-feedback').forEach(feedback => {
        feedback.textContent = '';
    });
    form.querySelectorAll('.form-control').forEach(control => {
        control.classList.remove('error');
    });
    
    // Check required fields
    form.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
            const feedback = field.nextElementSibling;
            field.classList.add('error');
            if (feedback && feedback.classList.contains('form-feedback')) {
                feedback.textContent = 'This field is required';
            }
            isValid = false;
        }
    });
    
    // Check email format
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value.trim() && !emailRegex.test(emailField.value)) {
        const feedback = emailField.nextElementSibling;
        emailField.classList.add('error');
        if (feedback && feedback.classList.contains('form-feedback')) {
            feedback.textContent = 'Please enter a valid email address';
        }
        isValid = false;
    }
    
    // Check phone format

    const phoneField = form.querySelector('input[type="tel"]');
    if (phoneField && phoneField.value.trim() && !phoneRegex.test(phoneField.value)) {
        const feedback = phoneField.nextElementSibling;
        phoneField.classList.add('error');
        if (feedback && feedback.classList.contains('form-feedback')) {
            feedback.textContent = 'Please enter a valid phone number';
        }
        isValid = false;
    }
    
    return isValid;
}

// Form submissions
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submissionMessage = contactForm.querySelector('.form-submission-message');
        
        if (validateForm(this)) {
            // Simulate form submission success
            submissionMessage.textContent = 'Thank you! Your message has been sent successfully.';
            submissionMessage.classList.add('success');
            
            // Reset form fields
            setTimeout(() => {
                this.reset();
                submissionMessage.textContent = '';
                submissionMessage.classList.remove('success');
            }, 5000);
            
            // In a real application, you would send the form data to a server here
            // using fetch or another AJAX method
        } else {
            submissionMessage.textContent = 'Please correct the errors above and try again.';
            submissionMessage.classList.add('error');
            
            setTimeout(() => {
                submissionMessage.textContent = '';
                submissionMessage.classList.remove('error');
            }, 5000);
        }
    });
}

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailInput.value.trim() && emailRegex.test(emailInput.value)) {
            // Simulate successful subscription
            const originalButtonHtml = this.querySelector('button').innerHTML;
            this.querySelector('button').innerHTML = '<i class="fas fa-check"></i>';
            
            // Reset form after delay
            setTimeout(() => {
                this.reset();
                this.querySelector('button').innerHTML = originalButtonHtml;
            }, 3000);
            
            // In a real application, you would send the subscription to a server
        } else {
            emailInput.classList.add('error');
            
            // Remove error class after a delay
            setTimeout(() => {
                emailInput.classList.remove('error');
            }, 3000);
        }
    });
}

// Floating shapes animation on mousemove
const floatingShapes = document.querySelectorAll('.floating-shape');
const butterflies = document.querySelectorAll('.butterfly');

document.addEventListener('mousemove', (e) => {
    // Only apply this effect on desktop to save mobile performance
    if (window.innerWidth > 768) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        floatingShapes.forEach((shape, index) => {
            const offsetX = (mouseX - 0.5) * 25 * (index + 1);
            const offsetY = (mouseY - 0.5) * 25 * (index + 1);
            
            shape.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
        
        // Also move butterfly elements slightly for enhanced interactivity
        butterflies.forEach((butterfly, index) => {
            const offsetX = (mouseX - 0.5) * 15 * (index + 1);
            const offsetY = (mouseY - 0.5) * 15 * (index + 1);
            
            butterfly.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    }
});

// Responsive viewport height for mobile browsers
function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setVH);
setVH();

// Adjust journey carousel display on window resize
window.addEventListener('resize', () => {
    updateJourneyCarousel();
});

// Initialize journey carousel on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the journey carousel
    updateJourneyCarousel();
    
    // On mobile, show navigation arrows and indicators
    if (window.innerWidth <= 1024) {
        if (journeyPrev) journeyPrev.style.display = 'flex';
        if (journeyNext) journeyNext.style.display = 'flex';
        document.querySelector('.journey-indicators').style.display = 'flex';
    }
    
    // Initialize services tab
    const firstTab = document.querySelector('.tab-item');
    if (firstTab) {
        firstTab.classList.add('active');
        const firstTabId = firstTab.getAttribute('data-tab');
        const firstPane = document.getElementById(firstTabId);
        if (firstPane) {
            firstPane.classList.add('active');
        }
    }
    
    // Initialize observers after DOM is loaded
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        observer.observe(title);
    });
});