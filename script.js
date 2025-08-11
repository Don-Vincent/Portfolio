// Portfolio Website JavaScript
// Handles navigation, form validation, and interactive features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeFormValidation();
    initializeSmoothScrolling();
    initializeAnimations();
});

/**
 * Navigation functionality including mobile menu toggle
 */
function initializeNavigation() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || mobileMenu.contains(event.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/**
 * Smooth scrolling for navigation links
 */
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = 70; // Height of fixed navbar
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Contact form validation and submission
 */
function initializeFormValidation() {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    // Form field elements
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');

    // Error message elements
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    // Real-time validation
    nameField.addEventListener('blur', () => validateName());
    emailField.addEventListener('blur', () => validateEmail());
    messageField.addEventListener('blur', () => validateMessage());

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous messages
        clearErrorMessages();
        hideFormMessage();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        
        // If all fields are valid, submit the form
        if (isNameValid && isEmailValid && isMessageValid) {
            submitForm();
        } else {
            showFormMessage('Please correct the errors below.', 'error');
        }
    });

    /**
     * Validate name field
     */
    function validateName() {
        const name = nameField.value.trim();
        
        if (name === '') {
            showError(nameError, 'Name is required.');
            return false;
        }
        
        if (name.length < 2) {
            showError(nameError, 'Name must be at least 2 characters long.');
            return false;
        }
        
        if (!/^[a-zA-Z\s'-]+$/.test(name)) {
            showError(nameError, 'Name can only contain letters, spaces, hyphens, and apostrophes.');
            return false;
        }
        
        clearError(nameError);
        return true;
    }

    /**
     * Validate email field
     */
    function validateEmail() {
        const email = emailField.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '') {
            showError(emailError, 'Email is required.');
            return false;
        }
        
        if (!emailRegex.test(email)) {
            showError(emailError, 'Please enter a valid email address.');
            return false;
        }
        
        clearError(emailError);
        return true;
    }

    /**
     * Validate message field
     */
    function validateMessage() {
        const message = messageField.value.trim();
        
        if (message === '') {
            showError(messageError, 'Message is required.');
            return false;
        }
        
        if (message.length < 10) {
            showError(messageError, 'Message must be at least 10 characters long.');
            return false;
        }
        
        if (message.length > 1000) {
            showError(messageError, 'Message must be less than 1000 characters.');
            return false;
        }
        
        clearError(messageError);
        return true;
    }

    /**
     * Show error message for a field
     */
    function showError(errorElement, message) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    /**
     * Clear error message for a field
     */
    function clearError(errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }

    /**
     * Clear all error messages
     */
    function clearErrorMessages() {
        clearError(nameError);
        clearError(emailError);
        clearError(messageError);
    }

    /**
     * Show form message (success or error)
     */
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    /**
     * Hide form message
     */
    function hideFormMessage() {
        formMessage.style.display = 'none';
        formMessage.className = 'form-message';
    }

    /**
     * Submit the form (simulated submission)
     */
    function submitForm() {
        // Disable submit button to prevent multiple submissions
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        submitButton.disabled = true;
        submitButton.innerHTML = 'Sending...';
        
        // Simulate form submission delay
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            
            // Show success message
            showFormMessage(
                'Thank you for your message! I\'ll get back to you as soon as possible.',
                'success'
            );
            
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                hideFormMessage();
            }, 5000);
            
        }, 1500); // Simulate 1.5 second processing time
    }
}

/**
 * Initialize scroll animations
 */
function initializeAnimations() {
    // Add fade-in class to elements that should animate
    const animatedElements = document.querySelectorAll('.project-card, .about-content, .section-header');
    
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all animated elements
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Utility function to handle resume download
 * This function can be enhanced to track downloads or show confirmation
 */
function handleResumeDownload() {
    // You could add analytics tracking here
    console.log('Resume download initiated');
    
    // Optional: Show a brief confirmation message
    const confirmation = document.createElement('div');
    confirmation.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem;
        border-radius: 6px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    confirmation.textContent = 'Resume opened in new tab';
    
    document.body.appendChild(confirmation);
    
    // Remove confirmation after 3 seconds
    setTimeout(() => {
        confirmation.remove();
    }, 3000);
}

/**
 * Add CSS animation for confirmation message
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

/**
 * Add click handler for resume button
 */
document.addEventListener('DOMContentLoaded', function() {
    const resumeButton = document.querySelector('a[href="resume.pdf"]');
    if (resumeButton) {
        resumeButton.addEventListener('click', handleResumeDownload);
    }
});

/**
 * Add keyboard navigation support
 */
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        const navMenu = document.getElementById('nav-menu');
        
        if (navMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

/**
 * Prevent form submission on Enter key in input fields (except textarea)
 */
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
        e.preventDefault();
        
        // Move to next field or submit if last field
        const formElements = Array.from(e.target.form.elements);
        const currentIndex = formElements.indexOf(e.target);
        const nextElement = formElements[currentIndex + 1];
        
        if (nextElement && nextElement.type !== 'submit') {
            nextElement.focus();
        }
    }
});
