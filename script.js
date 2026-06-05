// ==================== PARTICLE ANIMATION ====================
function createParticles() {
    const container = document.getElementById('particlesContainer');
    const particleCount = window.innerWidth > 768 ? 30 : 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 20) + 's';
        container.appendChild(particle);
    }
}

// ==================== THEME TOGGLE ====================
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.querySelector('.theme-icon').textContent = '🌙';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLightMode = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    themeToggle.querySelector('.theme-icon').textContent = isLightMode ? '🌙' : '☀️';
});

// ==================== MOBILE MENU TOGGLE ====================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ==================== COUNTER ANIMATION ====================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        
        const increment = target / speed;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                setTimeout(updateCounter, 10);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when hero section is in view
const heroSection = document.querySelector('.hero');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
            animateCounters();
            entry.target.dataset.counted = 'true';
        }
    });
}, { threshold: 0.5 });

counterObserver.observe(heroSection);

// ==================== SKILL BARS ANIMATION ====================
function animateSkillBars() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target.querySelector('.skill-fill');
                const value = skillBar.style.width;
                skillBar.style.animation = `fillWidth 2s ease-out forwards`;
            }
        });
    }, { threshold: 0.5 });
    
    skillCards.forEach(card => skillObserver.observe(card));
}

// ==================== PROJECT MODAL ====================
const projectData = {
    1: {
        title: 'Variable DC Power Supply',
        category: 'Electronics',
        description: 'Designed and built an adjustable DC power supply with precise voltage regulation and protection circuits.',
        details: [
            'Input voltage: 230V AC',
            'Output voltage: 0-30V adjustable',
            'Current rating: 0-5A',
            'Over-current and short-circuit protection',
            'Professional PCB design and layout',
            'Heat sink with thermal protection'
        ]
    },
    2: {
        title: 'Industrial Robotic System',
        category: 'Robotics',
        description: 'Developed KUKA robot automation concepts with advanced programming and control algorithms.',
        details: [
            'KUKA KR 6 R900 robot programming',
            'Trajectory planning and optimization',
            'Collision detection and avoidance',
            'Industrial automation protocols (Profibus)',
            'Safety compliance and certification',
            'Integration with manufacturing systems'
        ]
    },
    3: {
        title: 'Mechanical Design Project',
        category: 'CAD Design',
        description: 'Created comprehensive CAD models and FEA simulations using SolidWorks.',
        details: [
            'Advanced 3D modeling techniques',
            'Finite Element Analysis (FEA)',
            'Stress analysis and optimization',
            'Assembly drawings and documentation',
            'Tolerance analysis',
            'Cost estimation and material selection'
        ]
    }
};

function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const project = projectData[projectId];
    
    if (project) {
        let detailsHTML = '<ul>';
        project.details.forEach(detail => {
            detailsHTML += `<li>${detail}</li>`;
        });
        detailsHTML += '</ul>';
        
        modalBody.innerHTML = `
            <h2>${project.title}</h2>
            <p><strong>Category:</strong> ${project.category}</p>
            <p>${project.description}</p>
            <h3>Key Features:</h3>
            ${detailsHTML}
        `;
        
        modal.classList.add('active');
    }
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) {
        closeProjectModal();
    }
});

// ==================== SCROLL REVEAL ANIMATIONS ====================
function setupScrollReveal() {
    const revealElements = document.querySelectorAll('.section, .project-card, .skill-card, .cert-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        revealObserver.observe(element);
    });
}

// ==================== SMOOTH SCROLLING FOR NAVIGATION ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const element = document.querySelector(href);
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// ==================== ACTIVE NAV LINK ====================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = '#00d4ff';
        } else {
            link.style.color = '#e2e8f0';
        }
    });
});

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    setupScrollReveal();
    animateSkillBars();
    
    // Stagger animation delay for elements
    const cards = document.querySelectorAll('.skill-card, .project-card, .cert-card, .timeline-item');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Recreate particles on window resize
window.addEventListener('resize', () => {
    const container = document.getElementById('particlesContainer');
    container.innerHTML = '';
    createParticles();
});

// ==================== PERFORMANCE OPTIMIZATION ====================
// Lazy load images if they exist
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Disable animations on low-end devices
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
    document.body.style.animationDuration = '0.01s';
    document.querySelectorAll('*').forEach(el => {
        el.style.animationDuration = '0.01s';
    });
}