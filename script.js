/**
 * SmileBright Dental Clinic - Main JavaScript File
 * This file contains all the custom JavaScript code for the website functionality
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initNavbar();
    initForms();
    
    // Add active class to current page in navigation
    setActiveNavItem();
});

/**
 * Google Maps has been replaced with OpenStreetMap iframe
 * This function is kept for reference but is no longer used
 * 
// Initialize Google Map
function initMap() {
    // Dental clinic location - replace with actual coordinates
    const dentalClinicLocation = {
        lat: 40.712776, 
        lng: -74.005974
    }; // Default coordinates for New York
    
    // Create map
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: dentalClinicLocation,
        styles: [
            {
                "featureType": "administrative",
                "elementType": "all",
                "stylers": [{"saturation": "-100"}]
            },
            {
                "featureType": "administrative.province",
                "elementType": "all",
                "stylers": [{"visibility": "off"}]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [{"saturation": -100}, {"lightness": 65}, {"visibility": "on"}]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [{"saturation": -100}, {"lightness": "50"}, {"visibility": "simplified"}]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [{"saturation": "-100"}]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [{"visibility": "simplified"}]
            },
            {
                "featureType": "road.arterial",
                "elementType": "all",
                "stylers": [{"lightness": "30"}]
            },
            {
                "featureType": "road.local",
                "elementType": "all",
                "stylers": [{"lightness": "40"}]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [{"saturation": -100}, {"visibility": "simplified"}]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{"hue": "#ffff00"}, {"lightness": -25}, {"saturation": -97}]
            },
            {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [{"lightness": -25}, {"saturation": -100}]
            }
        ]
    });
    
    // Add marker for dental clinic
    const marker = new google.maps.Marker({
        position: dentalClinicLocation,
        map: map,
        title: 'SmileBright Dental Clinic',
        animation: google.maps.Animation.DROP
    });
    
    // Add info window
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div class="info-window">
                <h5>SmileBright Dental Clinic</h5>
                <p>123 Smile Avenue, New York, NY 10001</p>
                <p><strong>Phone:</strong> (555) 123-4567</p>
                <a href="https://maps.google.com/maps?daddr=40.712776,-74.005974" target="_blank">Get Directions</a>
            </div>
        `
    });
    
    // Open info window when marker is clicked
    marker.addListener('click', function() {
        infoWindow.open(map, marker);
    });
    
    // Open info window by default
    infoWindow.open(map, marker);
}
*/

/**
 * Initialize Navbar functionality
 */
function initNavbar() {
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const navbar = document.querySelector('.navbar-collapse');
        if (navbar && navbar.classList.contains('show')) {
            const isClickInsideNavbar = navbar.contains(event.target);
            const isNavbarToggler = event.target.classList.contains('navbar-toggler') || 
                                   event.target.closest('.navbar-toggler');
            
            if (!isClickInsideNavbar && !isNavbarToggler) {
                // Find the Bootstrap navbar toggler and trigger click to close menu
                const navbarToggler = document.querySelector('.navbar-toggler');
                if (navbarToggler) {
                    navbarToggler.click();
                }
            }
        }
    });
}

/**
 * Set active class on current navigation item
 */
function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop();
    
    // Add active class to navigation items
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') || 
            (currentPage === '/' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/**
 * Initialize form validation and submission
 */
function initForms() {
    // Appointment form
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Validate form
            if (validateForm(appointmentForm)) {
                // Show success message
                showFormSuccessMessage(appointmentForm, 'Thank you for booking an appointment! We will contact you shortly to confirm.');
                
                // Reset form
                appointmentForm.reset();
            }
        });
    }
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Validate form
            if (validateForm(contactForm)) {
                // Show success message
                showFormSuccessMessage(contactForm, 'Thank you for your message! We will get back to you as soon as possible.');
                
                // Reset form
                contactForm.reset();
            }
        });
    }
}

/**
 * Validate form fields
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} - Whether the form is valid
 */
function validateForm(form) {
    let isValid = true;
    
    // Get all required fields
    const requiredFields = form.querySelectorAll('[required]');
    
    // Remove existing error messages
    const existingErrorMessages = form.querySelectorAll('.error-message');
    existingErrorMessages.forEach(msg => msg.remove());
    
    // Check each required field
    requiredFields.forEach(field => {
        // Remove error styling
        field.classList.remove('is-invalid');
        
        // Check if field is empty or invalid
        if (!field.value.trim()) {
            // Add error styling
            field.classList.add('is-invalid');
            
            // Add error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'invalid-feedback error-message';
            errorMessage.textContent = 'This field is required';
            field.parentNode.appendChild(errorMessage);
            
            isValid = false;
        } else if (field.type === 'email' && !validateEmail(field.value)) {
            // Add error styling
            field.classList.add('is-invalid');
            
            // Add error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'invalid-feedback error-message';
            errorMessage.textContent = 'Please enter a valid email address';
            field.parentNode.appendChild(errorMessage);
            
            isValid = false;
        } else if (field.type === 'tel' && !validatePhone(field.value)) {
            // Add error styling
            field.classList.add('is-invalid');
            
            // Add error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'invalid-feedback error-message';
            errorMessage.textContent = 'Please enter a valid phone number';
            field.parentNode.appendChild(errorMessage);
            
            isValid = false;
        }
    });
    
    return isValid;
}

/**
 * Validate email format
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Validate phone number format
 * @param {string} phone - The phone number to validate
 * @returns {boolean} - Whether the phone number is valid
 */
function validatePhone(phone) {
    const re = /^[0-9\s\-\+\(\)]{10,20}$/;
    return re.test(String(phone));
}

/**
 * Show success message after form submission
 * @param {HTMLFormElement} form - The form that was submitted
 * @param {string} message - The success message to display
 */
function showFormSuccessMessage(form, message) {
    // Create success alert
    const successAlert = document.createElement('div');
    successAlert.className = 'alert alert-success mt-4';
    successAlert.role = 'alert';
    successAlert.textContent = message;
    
    // Add close button
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'btn-close';
    closeButton.setAttribute('data-bs-dismiss', 'alert');
    closeButton.setAttribute('aria-label', 'Close');
    successAlert.appendChild(closeButton);
    
    // Add to form
    form.parentNode.insertBefore(successAlert, form.nextSibling);
    
    // Automatically dismiss after 5 seconds
    setTimeout(() => {
        successAlert.classList.add('fade');
        setTimeout(() => {
            successAlert.remove();
        }, 500);
    }, 5000);
} 