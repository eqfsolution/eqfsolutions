// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animated Counter for Statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    updateCounter();
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate counters when stats section is visible
            if (entry.target.classList.contains('about')) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = parseInt(counter.dataset.target);
                    animateCounter(counter, target);
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .plan-card, .testimonial-card, .about, .legal-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Contact Form Handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.innerHTML = '<span class="loading"></span> Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        submitButton.textContent = '✓ Message Sent!';
        submitButton.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
        
        // Reset form
        this.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.background = 'linear-gradient(135deg, #FF6B35, #F7931E)';
            submitButton.disabled = false;
        }, 3000);
        
        // Show success message
        showNotification('Thank you! We\'ll contact you within 24 hours.', 'success');
    }, 2000);
});

// Form Validation
function validateForm() {
    const inputs = document.querySelectorAll('#contactForm input[required], #contactForm select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#F44336';
            isValid = false;
        } else {
            input.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        }
    });
    
    return isValid;
}

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add real-time validation
document.querySelectorAll('#contactForm input, #contactForm select').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.style.borderColor = '#F44336';
        } else if (this.type === 'email' && this.value && !validateEmail(this.value)) {
            this.style.borderColor = '#F44336';
        } else {
            this.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        }
    });
});

// FAQ Toggle Functionality
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add click outside to close
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modalId);
        }
    });
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal[style*="block"]');
        if (openModal) {
            openModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
});

// Coverage Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const coverageForm = document.querySelector('.coverage-form');
    if (coverageForm) {
        coverageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.innerHTML = '<span class="loading"></span> Checking...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                document.getElementById('coverageResult').style.display = 'block';
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Scroll to result
                document.getElementById('coverageResult').scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }, 2000);
        });
    }
});

// Special Offers Button Actions
document.querySelectorAll('.offer-card .btn').forEach(button => {
    button.addEventListener('click', function() {
        const offerCard = this.closest('.offer-card');
        const offerTitle = offerCard.querySelector('h3').textContent;
        
        showNotification(`Great! You've selected the "${offerTitle}" offer. Our team will contact you to complete the setup.`, 'success');
        
        // Scroll to contact form
        setTimeout(() => {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        }, 1000);
    });
});

// Plan Selection
document.querySelectorAll('.plan-button').forEach(button => {
    button.addEventListener('click', function() {
        const planCard = this.closest('.plan-card');
        const planName = planCard.querySelector('h3').textContent;
        const planPrice = planCard.querySelector('.amount').textContent;
        
        showNotification(`Great choice! You selected the ${planName} plan for $${planPrice}/month. Our team will contact you shortly.`, 'success');
        
        // Scroll to contact form
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        
        // Pre-fill the service field in contact form
        const serviceSelect = document.getElementById('service');
        if (planName.toLowerCase().includes('basic')) {
            serviceSelect.value = 'bundle';
        } else {
            serviceSelect.value = 'bundle';
        }
    });
});

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : 'ℹ'}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #4CAF50, #45a049)' : 'linear-gradient(135deg, #FF6B35, #F7931E)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
    }
`;
document.head.appendChild(style);

// Hero Button Actions
document.querySelectorAll('.hero-buttons .btn-primary').forEach(button => {
    button.addEventListener('click', () => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
});

document.querySelectorAll('.hero-buttons .btn-secondary').forEach(button => {
    button.addEventListener('click', () => {
        document.getElementById('plans').scrollIntoView({ behavior: 'smooth' });
    });
});

// Service Card Hover Effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Dynamic Pricing Calculator (Advanced Feature)
function createPricingCalculator() {
    const calculator = document.createElement('div');
    calculator.innerHTML = `
        <div class="pricing-calculator">
            <h3>Calculate Your Perfect Plan</h3>
            <div class="calculator-options">
                <label>
                    <input type="checkbox" id="internet" checked> High-Speed Internet
                    <span class="price">$39/mo</span>
                </label>
                <label>
                    <input type="checkbox" id="tv"> Cable TV
                    <span class="price">$29/mo</span>
                </label>
                <label>
                    <input type="checkbox" id="phone"> Digital Phone
                    <span class="price">$19/mo</span>
                </label>
            </div>
            <div class="calculator-total">
                Total: $<span id="total">39</span>/month
                <small>Save $10 with bundle discount!</small>
            </div>
        </div>
    `;
    
    // Add calculator styles
    const calculatorStyles = `
        .pricing-calculator {
            background: rgba(255, 255, 255, 0.1);
            padding: 2rem;
            border-radius: 15px;
            margin: 2rem 0;
            backdrop-filter: blur(10px);
        }
        .calculator-options {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin: 1rem 0;
        }
        .calculator-options label {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5rem;
            cursor: pointer;
        }
        .calculator-total {
            text-align: center;
            font-size: 1.5rem;
            font-weight: bold;
            margin-top: 1rem;
        }
        .calculator-total small {
            display: block;
            font-size: 0.9rem;
            opacity: 0.8;
            font-weight: normal;
        }
    `;
    
    if (!document.querySelector('#calculator-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'calculator-styles';
        styleElement.textContent = calculatorStyles;
        document.head.appendChild(styleElement);
    }
    
    return calculator;
}

// Add pricing calculator to plans section on load
window.addEventListener('load', () => {
    const plansSection = document.querySelector('.plans .container');
    if (plansSection) {
        const calculator = createPricingCalculator();
        plansSection.insertBefore(calculator, document.querySelector('.plans-grid'));
        
        // Calculator functionality
        const checkboxes = calculator.querySelectorAll('input[type="checkbox"]');
        const totalElement = calculator.querySelector('#total');
        
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                let total = 0;
                let checkedCount = 0;
                
                checkboxes.forEach(cb => {
                    if (cb.checked) {
                        checkedCount++;
                        const price = parseInt(cb.parentElement.querySelector('.price').textContent.match(/\d+/)[0]);
                        total += price;
                    }
                });
                
                // Bundle discount for 2+ services
                if (checkedCount >= 2) {
                    total -= 10;
                }
                
                totalElement.textContent = Math.max(0, total);
            });
        });
    }
});

// Enhanced Animation Observer
const enhancedObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate feature items with stagger
            if (entry.target.classList.contains('features')) {
                const featureItems = entry.target.querySelectorAll('.feature-item');
                featureItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }
            
            // Animate tech cards
            if (entry.target.classList.contains('technology')) {
                const techCards = entry.target.querySelectorAll('.tech-card');
                techCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 300);
                });
            }
            
            // Animate offer cards
            if (entry.target.classList.contains('offers')) {
                const offerCards = entry.target.querySelectorAll('.offer-card');
                offerCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }
        }
    });
}, observerOptions);

// Observe new sections
document.querySelectorAll('.features, .technology, .offers, .coverage').forEach(el => {
    el.classList.add('fade-in');
    enhancedObserver.observe(el);
});

// Initialize feature items and tech cards with hidden state
document.querySelectorAll('.feature-item, .tech-card, .offer-card').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s ease';
});

// Enhanced counter animation for coverage stats
const coverageObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.coverage-stat h3');
            counters.forEach(counter => {
                const text = counter.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                const suffix = text.replace(/[\d.]/g, '');
                
                if (number) {
                    animateCounter(counter, number, 2000, suffix);
                }
            });
        }
    });
}, observerOptions);

// Observe coverage section
const coverageSection = document.querySelector('.coverage');
if (coverageSection) {
    coverageObserver.observe(coverageSection);
}

// Enhanced counter function with suffix support
function animateCounter(element, target, duration = 2000, suffix = '') {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString() + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString() + suffix;
        }
    }
    
    updateCounter();
}

// Smooth reveal animation for FAQ items
const faqObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const faqItems = entry.target.querySelectorAll('.faq-item');
            faqItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 150);
            });
        }
    });
}, observerOptions);

// Observe FAQ section
const faqSection = document.querySelector('.faq');
if (faqSection) {
    faqObserver.observe(faqSection);
    
    // Initialize FAQ items with hidden state
    document.querySelectorAll('.faq-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.5s ease';
    });
}

// Add loading screen
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }, 1000);
    }
});

// Performance optimization: Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('EQF Solution website loaded successfully! 🚀');