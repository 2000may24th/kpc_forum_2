// AI Network Animation
class AINetwork {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.connections = [];
        this.mouse = { x: 0, y: 0 };
        
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
        canvas.addEventListener('mousemove', (e) => this.updateMouse(e));
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        const particleCount = Math.min(80, Math.floor((this.canvas.width * this.canvas.height) / 10000));
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    updateMouse(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update particles
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Boundary check
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.x -= (dx / distance) * force * 0.5;
                particle.y -= (dy / distance) * force * 0.5;
            }
        });
        
        // Draw connections
        this.particles.forEach((particle, i) => {
            this.particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    const opacity = (120 - distance) / 120 * 0.3;
                    this.ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                }
            });
        });
        
        // Draw particles
        this.particles.forEach(particle => {
            this.ctx.fillStyle = `rgba(212, 175, 55, ${particle.opacity})`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Glow effect
            this.ctx.shadowColor = 'rgba(212, 175, 55, 0.5)';
            this.ctx.shadowBlur = 10;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Statistics Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number, .animated-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        if (!target) return;
        
        const increment = target / 60; // Smoother animation
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16); // ~60fps
    });
}

// Hero Info Animation
function animateHeroInfo() {
    const infoItems = document.querySelectorAll('.info-item');
    const animatedNumbers = document.querySelectorAll('.animated-number');
    const animatedCounters = document.querySelectorAll('.animated-counter');
    
    // Animate info items
    infoItems.forEach((item, index) => {
        const delay = parseInt(item.getAttribute('data-animation-delay')) || index * 200;
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, delay);
    });
    
    // Animate numbers
    setTimeout(() => {
        animatedNumbers.forEach(number => {
            const target = parseInt(number.getAttribute('data-target'));
            if (target) {
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        number.textContent = target;
                        clearInterval(timer);
                    } else {
                        number.textContent = Math.floor(current);
                    }
                }, 30);
            }
        });
    }, 1000);
    
    // Animate text counters (typewriter effect for text)
    animatedCounters.forEach((counter, index) => {
        const text = counter.getAttribute('data-text');
        if (text) {
            setTimeout(() => {
                let i = 0;
                counter.textContent = '';
                const timer = setInterval(() => {
                    counter.textContent += text.charAt(i);
                    i++;
                    if (i >= text.length) {
                        clearInterval(timer);
                    }
                }, 50);
            }, (index * 200) + 800);
        }
    });
}

// Enhanced Hero Animations
function initHeroAnimations() {
    // All animations are now handled by CSS
    // This function can be used for additional dynamic effects if needed
    
    // Add a subtle pulse effect to the CTA button
    const ctaButton = document.querySelector('.btn-primary');
    if (ctaButton) {
        setTimeout(() => {
            ctaButton.style.animation = 'pulse 2s ease-in-out infinite';
        }, 3500);
    }
}

// Add pulse animation to CSS
const pulseAnimation = `
@keyframes pulse {
    0%, 100% {
        transform: scale(1);
        box-shadow: 0 12px 40px rgba(212, 175, 55, 0.3);
    }
    50% {
        transform: scale(1.02);
        box-shadow: 0 15px 50px rgba(212, 175, 55, 0.4);
    }
}
`;

// Inject pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = pulseAnimation;
document.head.appendChild(pulseStyle);

// Chart Animation
function animateCharts() {
    const chartBars = document.querySelectorAll('.chart-bar');
    
    chartBars.forEach((bar, index) => {
        const height = bar.getAttribute('data-height');
        if (height) {
            setTimeout(() => {
                bar.style.height = height;
            }, index * 200 + 500);
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Trigger counter animation for stats
                if (entry.target.classList.contains('statistics')) {
                    animateCounters();
                }
                
                // Trigger chart animation
                if (entry.target.classList.contains('partner')) {
                    animateCharts();
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    const elementsToObserve = document.querySelectorAll('.program-card, .speaker-card, .statistics, .partner');
    elementsToObserve.forEach(el => observer.observe(el));
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

// Navigation Active State
function initNavigationActiveState() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop <= 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
}

// Header Scroll Effect
function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        // Add background when scrolled
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
}

// Mobile Menu
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Form Validation and Submission
function initFormHandling() {
    const form = document.getElementById('registrationForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const requiredFields = form.querySelectorAll('input[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#e53e3e';
                } else {
                    field.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }
            });
            
            // Email validation
            const emailField = form.querySelector('input[type="email"]');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailField && !emailPattern.test(emailField.value)) {
                isValid = false;
                emailField.style.borderColor = '#e53e3e';
            }
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = form.querySelector('.btn-submit');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = '신청 중...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert('참가 신청이 완료되었습니다! 확인 이메일을 발송해드렸습니다.');
                    form.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            } else {
                alert('필수 항목을 모두 입력해주세요.');
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.style.borderColor = '#e53e3e';
                } else {
                    this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }
            });
            
            input.addEventListener('focus', function() {
                this.style.borderColor = '#d4af37';
            });
        });
    }
}

// Parallax Effects
function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-background');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Loading Animation
function initLoadingAnimation() {
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Trigger initial animations
        setTimeout(() => {
            initHeroAnimations();
            setTimeout(() => {
                animateHeroInfo();
            }, 2000);
        }, 500);
    });
}

// Performance Optimizations
function initPerformanceOptimizations() {
    // Lazy loading for images (if any are added later)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Throttle scroll events for better performance
    let ticking = false;
    
    function updateOnScroll() {
        // Update scroll-dependent elements here
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
}

// Accessibility Enhancements
function initAccessibilityEnhancements() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = '메인 콘텐츠로 건너뛰기';
    skipLink.className = 'skip-link';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Keyboard navigation for mobile menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            
            if (hamburger && navMenu && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AI Network Animation
    const aiNetworkCanvas = document.getElementById('aiNetwork');
    if (aiNetworkCanvas) {
        new AINetwork(aiNetworkCanvas);
    }
    
    // Initialize all other features
    initScrollAnimations();
    initSmoothScrolling();
    initNavigationActiveState();
    initHeaderScrollEffect();
    initMobileMenu();
    initFormHandling();
    initParallaxEffects();
    initLoadingAnimation();
    initPerformanceOptimizations();
    initAccessibilityEnhancements();
});

// Add CSS for animations and enhancements
const additionalStyles = `
    /* Loading and Animation Styles */
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .hero-content > * {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    /* Scroll Animations */
    .program-card,
    .speaker-card {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.6s ease;
    }
    
    .program-card.animate-in,
    .speaker-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Header Scroll Effect */
    .header {
        transition: transform 0.3s ease, background-color 0.3s ease;
    }
    
    .header.scrolled {
        background: rgba(26, 54, 93, 0.98);
        backdrop-filter: blur(20px);
    }
    
    /* Mobile Menu Styles */
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(26, 54, 93, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            justify-content: start;
            align-items: center;
            padding-top: 50px;
            transition: left 0.3s ease;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-menu li {
            margin: 20px 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
    
    /* Navigation Active State */
    .nav-menu a.active {
        color: #d4af37;
    }
    
    .nav-menu a.active::after {
        width: 100%;
    }
    
    /* Skip Link for Accessibility */
    .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: #d4af37;
        color: #1a365d;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        font-weight: 600;
        z-index: 1001;
        transition: top 0.3s;
    }
    
    .skip-link:focus {
        top: 6px;
    }
    
    /* Form Validation States */
    .form-group input.error {
        border-color: #e53e3e !important;
        box-shadow: 0 0 0 2px rgba(229, 62, 62, 0.2);
    }
    
    .form-group input.success {
        border-color: #38a169 !important;
        box-shadow: 0 0 0 2px rgba(56, 161, 105, 0.2);
    }
    
    /* Loading States */
    .btn-submit:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none !important;
    }
    
    /* Enhanced Focus States */
    button:focus,
    input:focus,
    a:focus {
        outline: 2px solid #d4af37;
        outline-offset: 2px;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);