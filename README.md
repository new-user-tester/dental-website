# SmileBright Dental Clinic Website

A modern, responsive website for a dental clinic built with HTML, CSS, and JavaScript.

## Features

- Responsive design that works on all devices
- Information about dental services and treatments
- About page with doctor and staff profiles
- Appointment booking form
- Interactive OpenStreetMap integration for location
- Contact information and hours
- Patient testimonials
- Modern, clean aesthetic with professional appearance

## Pages

1. **Home** - Main landing page with overview of the clinic and services
2. **About** - Information about the dentist, staff, and clinic
3. **Services** - Detailed descriptions of dental services offered
4. **Contact** - Contact information, appointment booking form, and location map

## Setup Instructions

1. Clone or download this repository to your local machine
2. No API keys required - the map is implemented using OpenStreetMap
3. Modify the content as needed (address, services, etc.)
4. Upload all files to your web server or hosting service

## Map Integration

The website uses OpenStreetMap for displaying the clinic location:

1. The map is implemented using an iframe that doesn't require an API key
2. To change the location, update the iframe src URLs in index.html and contact.html
3. The default location is set to New York, but you can replace it with your actual clinic location

## Customization

### Change Colors

The main colors can be changed by modifying the CSS variables in the `:root` selector in `css/styles.css`.

### Update Content

- Replace placeholder text with your actual clinic information
- Replace the placeholder images with your clinic and staff photos
- Update the contact information and address
- Modify services to match what your clinic offers

### Forms

The contact and appointment forms are set up with client-side validation. To make them actually send data:

1. Create a server-side script to process form submissions
2. Update the form `action` attributes to point to your server script
3. Configure email notifications or database storage as needed

## Credits

- Bootstrap 5 - [https://getbootstrap.com/](https://getbootstrap.com/)
- Font Awesome - [https://fontawesome.com/](https://fontawesome.com/)
- Google Fonts - [https://fonts.google.com/](https://fonts.google.com/)
- Unsplash - [https://unsplash.com/](https://unsplash.com/) (for placeholder images)
- OpenStreetMap - [https://www.openstreetmap.org/](https://www.openstreetmap.org/)

## License

Feel free to use and modify this template for your dental clinic website. 
