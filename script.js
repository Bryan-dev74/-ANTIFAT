// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: false,
        mirror: true
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Parallax effect for header and roadmap sections
    window.addEventListener('scroll', function() {
        const parallaxElements = document.querySelectorAll('.parallax-header, .parallax-roadmap');
        parallaxElements.forEach(element => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            element.style.backgroundPosition = `center ${rate}px`;
        });
    });

    // Numbers animation for stats
    const statsNumbers = document.querySelectorAll('.stats-counter .number');
    const animateNumber = (element) => {
        const target = element.innerText;
        const prefix = target.startsWith('$') ? '$' : '';
        const suffix = target.endsWith('+') ? '+' : '';
        const number = parseFloat(target.replace(/[^0-9.]/g, ''));
        
        let start = 0;
        const duration = 2000;
        const startTimestamp = performance.now();
        
        const updateNumber = (currentTimestamp) => {
            const elapsed = currentTimestamp - startTimestamp;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = progress * number;
            element.innerText = `${prefix}${current.toFixed(1).replace(/\.0$/, '')}${suffix}`;
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        };
        
        requestAnimationFrame(updateNumber);
    };

    // Intersection Observer for stats animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsNumbers.forEach(number => observer.observe(number));
});
