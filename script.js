// DOM Elements
const header = document.getElementById('header');
const scrollTop = document.getElementById('scrollTop');
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

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

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Observe elements for animations
    const animateElements = document.querySelectorAll(
        '.section-title, .stat, .solution-item, .service-category, .expertise-item, .pricing-card, .assessment-info, .assessment-form'
    );
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Statistics counter animation
    const stats = document.querySelectorAll('.stat h3');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                
                // Only animate numbers
                if (/\d/.test(finalValue)) {
                    animateCounter(target, finalValue);
                }
                
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
});

// Counter animation function
function animateCounter(element, finalValue) {
    // Extract number from string
    const numMatch = finalValue.match(/[\d,]+/);
    if (!numMatch) return;
    
    const numStr = numMatch[0].replace(/,/g, '');
    const num = parseInt(numStr);
    
    if (isNaN(num)) return;
    
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    const prefix = finalValue.split(numMatch[0])[0];
    const suffix = finalValue.split(numMatch[0])[1] || '';
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentNum = Math.floor(num * easeOut);
        
        // Format number with commas if original had them
        const formattedNum = finalValue.includes(',') ? 
            currentNum.toLocaleString() : currentNum.toString();
        
        element.textContent = prefix + formattedNum + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = finalValue; // Ensure final value is exact
        }
    }
    
    requestAnimationFrame(updateCounter);
}