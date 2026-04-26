/**
 * Portfolio Website JavaScript
 * Author: Sabikun Enam Tazina
 * Features: Theme toggle, typing animation, scroll effects, mobile navigation
 */

// ============================================
// Theme Management
// ============================================
const themeManager = {
    init() {
        const themeToggle = document.getElementById('themeToggle');
        const savedTheme = localStorage.getItem('theme') || 'light';
        
        // Apply saved theme
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // Theme toggle event
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                
                // Add click animation
                themeToggle.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    themeToggle.style.transform = '';
                }, 150);
            });
        }
    }
};

// ============================================
// Typing Animation
// ============================================
const typingAnimation = {
    words: ['Student', 'Frontend Developer', 'React Developer'],
    currentIndex: 0,
    currentChar: 0,
    isDeleting: false,
    typingSpeed: 100,
    deletingSpeed: 50,
    pauseTime: 2000,
    
    init() {
        this.element = document.getElementById('typingText');
        if (this.element) {
            this.type();
        }
    },
    
    type() {
        const currentWord = this.words[this.currentIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentWord.substring(0, this.currentChar - 1);
            this.currentChar--;
        } else {
            this.element.textContent = currentWord.substring(0, this.currentChar + 1);
            this.currentChar++;
        }
        
        let typeSpeed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;
        
        if (!this.isDeleting && this.currentChar === currentWord.length) {
            typeSpeed = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentChar === 0) {
            this.isDeleting = false;
            this.currentIndex = (this.currentIndex + 1) % this.words.length;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
};

// ============================================
// Mobile Navigation
// ============================================
const mobileNav = {
    init() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (hamburger && navMenu) {
            // Toggle menu
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            });
            
            // Close menu on link click
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
            
            // Close menu on outside click
            document.addEventListener('click', (e) => {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    }
};

// ============================================
// Navbar Scroll Effect
// ============================================
const navbarScroll = {
    init() {
        const navbar = document.getElementById('navbar');
        let lastScroll = 0;
        
        window.addEventListener('scroll', { passive: true }, () => {
            const currentScroll = window.pageYOffset;
            
            // Add/remove scrolled class
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar on scroll
            if (currentScroll > lastScroll && currentScroll > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
    }
};

// ============================================
// Active Navigation Link
// ============================================
const activeNavLink = {
    init() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        window.addEventListener('scroll', { passive: true }, () => {
            const scrollY = window.pageYOffset;
            
            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }
};

// ============================================
// Scroll Reveal Animation
// ============================================
const scrollReveal = {
    init() {
        // Only animate section headers, exclude skill, project, service, resume, contact cards
        const reveals = document.querySelectorAll('.section-header');
        
        const revealOnScroll = () => {
            const windowHeight = window.innerHeight;
            const elementVisible = 100;
            
            reveals.forEach((reveal) => {
                const elementTop = reveal.getBoundingClientRect().top;
                
                if (elementTop < windowHeight - elementVisible) {
                    reveal.style.opacity = '1';
                    reveal.style.transform = 'translateY(0)';
                }
            });
        };
        
        // Initial styles for headers only
        reveals.forEach(reveal => {
            reveal.style.opacity = '0';
            reveal.style.transform = 'translateY(30px)';
            reveal.style.transition = 'all 0.8s ease';
        });
        
        window.addEventListener('scroll', { passive: true }, revealOnScroll);
        revealOnScroll(); // Trigger on load
    }
};

// ============================================
// Skill Progress Animation (Disabled)
// ============================================
const skillProgress = {
    init() {
        // Animations removed - progress bars now static
    }
};

// ============================================
// Back to Top Button
// ============================================
const backToTop = {
    init() {
        const backToTopBtn = document.getElementById('backToTop');
        
        if (backToTopBtn) {
            window.addEventListener('scroll', { passive: true }, () => {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            });
            
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
};

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
const smoothScroll = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
};

// ============================================
// Contact Form
// ============================================
const contactForm = {
    init() {
        const form = document.getElementById('contactForm');
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                
                // Show success message (since this is a static site)
                this.showMessage('Thank you for your message! I will get back to you soon.', 'success');
                form.reset();
                
                // In a real implementation, you would send the data to a server
                console.log('Form submitted:', data);
            });
        }
    },
    
    showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `form-message form-message-${type}`;
        messageEl.textContent = message;
        
        // Styles
        messageEl.style.cssText = `
            background: ${type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
            color: ${type === 'success' ? '#16a34a' : '#dc2626'};
            padding: 15px 20px;
            border-radius: 10px;
            margin-top: 20px;
            font-size: 14px;
            text-align: center;
            animation: fadeInUp 0.3s ease;
        `;
        
        const form = document.getElementById('contactForm');
        form.appendChild(messageEl);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageEl.style.opacity = '0';
            messageEl.style.transform = 'translateY(-10px)';
            messageEl.style.transition = 'all 0.3s ease';
            setTimeout(() => messageEl.remove(), 300);
        }, 5000);
    }
};

// ============================================
// Parallax Effect
// ============================================
const parallaxEffect = {
    init() {
        const shapes = document.querySelectorAll('.shape');
        
        // Skip on mobile devices
        if (window.matchMedia('(pointer: coarse)').matches) return;
        
        let ticking = false;
        
        window.addEventListener('scroll', { passive: true }, () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    
                    shapes.forEach((shape, index) => {
                        const speed = 0.5 + (index * 0.1);
                        shape.style.transform = `translateY(${scrolled * speed}px)`;
                    });
                    
                    ticking = false;
                });
                
                ticking = true;
            }
        });
    }
};

// ============================================
// Counter Animation for Stats
// ============================================
const counterAnimation = {
    init() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const animateCounter = (element) => {
            const target = parseInt(element.textContent);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    element.textContent = Math.floor(current) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target + '+';
                }
            };
            
            updateCounter();
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => observer.observe(stat));
    }
};

// ============================================
// Mouse Move Effect for Cards (3D Tilt on Hover)
// ============================================
const mouseMoveEffect = {
    init() {
        const cards = document.querySelectorAll('.project-card, .service-card');
        
        // Skip on mobile devices
        if (window.matchMedia('(pointer: coarse)').matches) return;
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }
};

// ============================================
// Initialize All Modules
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    themeManager.init();
    typingAnimation.init();
    mobileNav.init();
    navbarScroll.init();
    activeNavLink.init();
    scrollReveal.init();
    skillProgress.init();
    backToTop.init();
    smoothScroll.init();
    contactForm.init();
    parallaxEffect.init();
    counterAnimation.init();
    mouseMoveEffect.init();
});

// ============================================
// Preloader (Optional Enhancement)
// ============================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
