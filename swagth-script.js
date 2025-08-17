// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update active navigation link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Enhanced scroll-based navigation highlighting
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.scrollY + 100; // Offset for navbar
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Update navigation on scroll
window.addEventListener('scroll', updateActiveNavOnScroll);

// Add scroll indicator
function addScrollIndicator() {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.innerHTML = `
        <div class="scroll-text">Scroll Down</div>
        <div class="scroll-arrow">↓</div>
    `;
    
    // Add styles for scroll indicator
    const style = document.createElement('style');
    style.textContent = `
        .scroll-indicator {
            position: absolute;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            text-align: center;
            color: white;
            z-index: 10;
            animation: bounce 2s infinite;
        }
        
        .scroll-text {
            font-size: 14px;
            margin-bottom: 8px;
            opacity: 0.8;
        }
        
        .scroll-arrow {
            font-size: 24px;
            opacity: 0.6;
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateX(-50%) translateY(0);
            }
            40% {
                transform: translateX(-50%) translateY(-10px);
            }
            60% {
                transform: translateX(-50%) translateY(-5px);
            }
        }
    `;
    
    document.head.appendChild(style);
    
    // Add to hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.appendChild(scrollIndicator);
    }
}

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Navbar background change on scroll
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

// Project Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const projectCards = document.querySelectorAll('.project-card');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        tabBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const category = btn.getAttribute('data-tab');
        
        // Show all projects by default, or filter by category if needed
        projectCards.forEach(card => {
            card.style.display = 'block';
        });
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add fade-in animation to elements
const animateElements = document.querySelectorAll('.service-card, .project-card, .info-card, .feature-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const phone = contactForm.querySelector('input[type="tel"]').value;
        const service = contactForm.querySelector('select').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !phone || !service || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        if (!isValidPhone(phone)) {
            showNotification('Please enter a valid phone number', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Thank you! Your message has been sent successfully. We will contact you soon.', 'success');
        contactForm.reset();
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation function
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Notification function
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        ${type === 'success' ? 'background: #10b981;' : 'background: #ef4444;'}
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Add active class to current navigation item
function setActiveNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    window.addEventListener('scroll', () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize active nav functionality
setActiveNavItem();

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Initialize page with fade-in
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add hover effects to service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add hover effects to project cards
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click effects to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize all animations and interactions
document.addEventListener('DOMContentLoaded', () => {
    // Add stagger animation to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add stagger animation to info cards
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add stagger animation to feature items
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
});

// Add smooth reveal animation for sections
const revealElements = document.querySelectorAll('.section-header, .about-header, .contact-header');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    revealObserver.observe(el);
});

// Add counter animation for company stats
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target.querySelector('p');
            const target = parseInt(counter.textContent);
            let current = 0;
            const increment = target / 50;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '');
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
                }
            };
            
            updateCounter();
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe info cards for counter animation
const infoCards = document.querySelectorAll('.info-card');
infoCards.forEach(card => {
    counterObserver.observe(card);
});

// Add floating animation to WhatsApp button
const whatsappButton = document.querySelector('.whatsapp-float');
if (whatsappButton) {
    setInterval(() => {
        whatsappButton.style.transform = 'translateY(-5px)';
        setTimeout(() => {
            whatsappButton.style.transform = 'translateY(0)';
        }, 200);
    }, 3000);
}

// Why Choose Us background rotation
function initWhyChooseBackgroundRotation() {
    const whyChooseBackground = document.getElementById('why-choose-background');
    if (!whyChooseBackground) return;

    const backgrounds = ['bg-1', 'bg-2', 'bg-3', 'bg-4'];
    let currentIndex = 0;

    // Set initial background
    whyChooseBackground.className = 'why-choose-background ' + backgrounds[currentIndex];

    // Rotate backgrounds every 4 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % backgrounds.length;
        whyChooseBackground.className = 'why-choose-background ' + backgrounds[currentIndex];
        console.log('Why Choose Us background changed to:', backgrounds[currentIndex]);
    }, 4000); // 4 seconds
}

// Dynamic Background Effects - Plumbing & Electrical Themed + Real Project Images
function initDynamicBackgrounds() {
    // Mouse movement effect for hero section - creates water flow effect
    const heroBackground = document.getElementById('hero-background');
    if (heroBackground) {
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const x = (clientX / innerWidth) * 100;
            const y = (clientY / innerHeight) * 100;
            
            // Create water flow effect based on mouse position
            heroBackground.style.background = `
                linear-gradient(${x}deg, 
                    #1e40af 0%, 
                    #3b82f6 ${y}%, 
                    #0ea5e9 100%)
            `;
        });
    }

    // Real Project Image Background Rotation
    const projectBackgrounds = [
        'project-bg-1', // Resort with swimming pool - ani1.jpg
        'project-bg-2', // Hotel room interior - ani2.jpg
        'project-bg-3', // Aerial view of buildings - ani3.jpg
        'project-bg-4'  // LAXMI KRIPA building - ani4.jpg
    ];
    
    let currentBgIndex = 0;
    
    const rotateProjectBackgrounds = () => {
        if (heroBackground) {
            console.log('Rotating to background:', projectBackgrounds[currentBgIndex]);
            
            // Remove all project background classes
            projectBackgrounds.forEach(bgClass => {
                heroBackground.classList.remove(bgClass);
            });
            
            // Add current background class
            heroBackground.classList.add(projectBackgrounds[currentBgIndex]);
            
            // Move to next background
            currentBgIndex = (currentBgIndex + 1) % projectBackgrounds.length;
        } else {
            console.log('Hero background element not found!');
        }
    };
    
    // Start background rotation every 20 seconds
    setInterval(rotateProjectBackgrounds, 20000);
    
    // Initial background
    if (heroBackground) {
        console.log('Setting initial background:', projectBackgrounds[0]);
        heroBackground.classList.add(projectBackgrounds[0]);
    } else {
        console.log('Hero background element not found for initial setup!');
    }

    // Test button functionality
    const testButton = document.getElementById('test-backgrounds');
    if (testButton) {
        testButton.addEventListener('click', () => {
            console.log('Test button clicked!');
            rotateProjectBackgrounds();
        });
    }

    // Parallax effect for background elements - construction blueprint effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.services::before, .why-choose::before, .projects::before, .about::before, .contact::before');
        
        parallaxElements.forEach((element, index) => {
            if (element) {
                const speed = 0.5 + (index * 0.1);
                element.style.transform = `translateY(${scrolled * speed}px)`;
            }
        });
    });

    // Plumbing-themed color transitions
    const sections = document.querySelectorAll('.services, .why-choose, .projects, .about, .contact');
    sections.forEach((section, index) => {
        if (section) {
            setInterval(() => {
                // Plumbing colors: blues, water tones
                const plumbingColors = ['#f8fafc', '#e2e8f0', '#f1f5f9', '#ffffff'];
                // Electrical colors: warm tones, energy colors
                const electricalColors = ['#1f2937', '#111827', '#0f172a', '#020617'];
                
                if (section.classList.contains('why-choose') || section.classList.contains('contact')) {
                    section.style.background = electricalColors[index % electricalColors.length];
                } else {
                    section.style.background = plumbingColors[index % plumbingColors.length];
                }
            }, 10000 + (index * 2000)); // Different timing for each section
        }
    });

    // Create water drop effect
    const createWaterDrop = (x, y) => {
        const drop = document.createElement('div');
        drop.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 8px;
            height: 8px;
            background: radial-gradient(circle at center, rgba(59, 130, 246, 0.8) 0%, rgba(59, 130, 246, 0.4) 70%, transparent 100%);
            border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
            pointer-events: none;
            z-index: 9999;
            animation: waterDrop 3s ease-out forwards;
        `;
        
        document.body.appendChild(drop);
        
        setTimeout(() => {
            if (drop.parentNode) {
                drop.parentNode.removeChild(drop);
            }
        }, 3000);
    };

    // Create electrical spark effect
    const createElectricalSpark = (x, y) => {
        const spark = document.createElement('div');
        spark.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 2px;
            height: 20px;
            background: linear-gradient(to bottom, #fbbf24, #f59e0b, #d97706);
            pointer-events: none;
            z-index: 9999;
            animation: electricalSpark 1s ease-out forwards;
            transform: rotate(${Math.random() * 360}deg);
        `;
        
        document.body.appendChild(spark);
        
        setTimeout(() => {
            if (spark.parentNode) {
                spark.parentNode.removeChild(spark);
            }
        }, 1000);
    };

    // Add water drop and electrical spark animations CSS
    const themedStyle = document.createElement('style');
    themedStyle.textContent = `
        @keyframes waterDrop {
            0% {
                transform: translateY(0) scale(1);
                opacity: 1;
            }
            50% {
                transform: translateY(50px) scale(1.2);
                opacity: 0.8;
            }
            100% {
                transform: translateY(100px) scale(0);
                opacity: 0;
            }
        }
        
        @keyframes electricalSpark {
            0% {
                transform: scale(1) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: scale(1.5) rotate(180deg);
                opacity: 0.8;
            }
            100% {
                transform: scale(0) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(themedStyle);

    // Click effects - water drops for left click, electrical sparks for right click
    document.addEventListener('click', (e) => {
        createWaterDrop(e.clientX, e.clientY);
    });

    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        createElectricalSpark(e.clientX, e.clientY);
    });

    // Create floating plumbing and electrical elements
    const createFloatingElement = () => {
        const elements = [
            { type: 'pipe', symbol: '|', color: 'rgba(59, 130, 246, 0.05)' },
            { type: 'circuit', symbol: '⚡', color: 'rgba(245, 158, 11, 0.05)' },
            { type: 'water', symbol: '💧', color: 'rgba(59, 130, 246, 0.05)' },
            { type: 'bolt', symbol: '⚡', color: 'rgba(245, 158, 11, 0.05)' }
        ];
        
        const randomElement = elements[Math.floor(Math.random() * elements.length)];
        const element = document.createElement('div');
        
        element.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: ${randomElement.color};
            border: 1px solid ${randomElement.color.replace('0.05', '0.1')};
            pointer-events: none;
            z-index: 1;
            animation: floatingElement 20s linear infinite;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            color: ${randomElement.color.replace('0.05', '0.2')};
            opacity: 0.3;
        `;
        
        element.textContent = randomElement.symbol;
        element.style.left = Math.random() * window.innerWidth + 'px';
        element.style.top = Math.random() * window.innerHeight + 'px';
        
        document.body.appendChild(element);
        
        setTimeout(() => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }, 20000);
    };

    // Add floating element animation CSS
    const elementStyle = document.createElement('style');
    elementStyle.textContent = `
        @keyframes floatingElement {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0.1;
            }
            10% {
                opacity: 0.3;
            }
            90% {
                opacity: 0.3;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0.1;
            }
        }
    `;
    document.head.appendChild(elementStyle);

    // Create floating elements less frequently
    setInterval(createFloatingElement, 8000);

    // Pipe flow animation effect - much more subtle
    const createPipeFlow = () => {
        const pipe = document.createElement('div');
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        
        pipe.style.cssText = `
            position: fixed;
            left: ${startX}px;
            top: ${startY}px;
            width: 2px;
            height: 2px;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            animation: pipeFlow 4s linear infinite;
            opacity: 0.4;
        `;
        
        document.body.appendChild(pipe);
        
        setTimeout(() => {
            if (pipe.parentNode) {
                pipe.parentNode.removeChild(pipe);
            }
        }, 4000);
    };

    // Add pipe flow animation CSS
    const pipeStyle = document.createElement('style');
    pipeStyle.textContent = `
        @keyframes pipeFlow {
            0% { transform: translateX(-100px) scale(0.8); opacity: 0; }
            50% { transform: translateX(0) scale(1); opacity: 0.4; }
            100% { transform: translateX(100px) scale(0.8); opacity: 0; }
        }
    `;
    document.head.appendChild(pipeStyle);

    // Create pipe flow effects less frequently
    setInterval(createPipeFlow, 12000);
}

// Initialize dynamic backgrounds when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initDynamicBackgrounds();
    initWhyChooseBackgroundRotation(); // Initialize Why Choose Us background rotation
    addScrollIndicator(); // Add scroll indicator
}); 