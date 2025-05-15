// DOM Elements
const navbar = document.querySelector('.navbar');
const themeToggle = document.querySelector('.theme-toggle');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const scrollToTop = document.querySelector('.scroll-to-top');
const skillBars = document.querySelectorAll('.skill-progress');

// Theme Toggle
let darkMode = localStorage.getItem('darkMode') === 'true';

function toggleTheme() {
    darkMode = !darkMode;
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('darkMode', darkMode);
    themeToggle.innerHTML = darkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

themeToggle.addEventListener('click', toggleTheme);

// Initialize theme
document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
themeToggle.innerHTML = darkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking a link
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Scroll to Top button visibility
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTop.classList.add('visible');
    } else {
        scrollToTop.classList.remove('visible');
    }
});

// Scroll to top functionality
scrollToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Active link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: contactForm.querySelector('input[type="text"]').value,
        email: contactForm.querySelector('input[type="email"]').value,
        message: contactForm.querySelector('textarea').value
    };

    try {
        const response = await fetch('http://localhost:3000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            alert('Xabaringiz muvaffaqiyatli yuborildi!');
            contactForm.reset();
        } else {
            throw new Error(data.error || 'Xatolik yuz berdi');
        }
    } catch (error) {
        console.error('Xato:', error);
        alert('Xabar yuborishda xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.');
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .blog-card, .skill, .stat').forEach(element => {
    observer.observe(element);
});

// Initialize skill bars animation
skillBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => {
        bar.style.width = width;
    }, 500);
});

// Blog post read more functionality
document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', function() {
        const content = this.parentElement.querySelector('.blog-full-content');
        const excerpt = this.parentElement.querySelector('.blog-excerpt');
        
        if (content.classList.contains('active')) {
            // Hide full content
            content.classList.remove('active');
            excerpt.style.display = 'block';
            this.textContent = "Ko'proq o'qish";
            this.classList.remove('active');
            
            // Scroll to card top
            this.parentElement.parentElement.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Show full content
            content.classList.add('active');
            excerpt.style.display = 'none';
            this.textContent = 'Yopish';
            this.classList.add('active');
        }
    });
}); 