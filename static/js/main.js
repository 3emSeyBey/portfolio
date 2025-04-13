document.addEventListener('DOMContentLoaded', function() {
    // Initialize Vanta.js background
    VANTA.NET({
        el: "#interactive-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: '#3b82f6',
        backgroundColor: '#f8fafc',
        points: 12.00,
        maxDistance: 20.00,
        spacing: 15.00
    });

    // Mobile menu toggle
    document.getElementById('menu-toggle').addEventListener('click', function() {
        const menu = document.getElementById('mobile-menu');
        menu.classList.toggle('hidden');
    });

    // Terminal typing effect
    const terminalTexts = [
        "python3 -c \"print('Building robust backend systems')\"",
        "django-admin startproject awesome_project",
        "flask run --host=0.0.0.0",
        "pip install -r requirements.txt"
    ];
    
    let currentTerminalText = 0;
    const terminalLine = document.querySelector('.typewriter');
    
    function changeTerminalText() {
        terminalLine.classList.remove('typewriter');
        void terminalLine.offsetWidth; // Trigger reflow
        terminalLine.textContent = terminalTexts[currentTerminalText];
        terminalLine.classList.add('typewriter');
        
        currentTerminalText = (currentTerminalText + 1) % terminalTexts.length;
        setTimeout(changeTerminalText, 4000);
    }
    
    setTimeout(changeTerminalText, 4000);

    // Card 3D effect
    const cards3d = document.querySelectorAll('.card-3d');
    
    cards3d.forEach(card => {
        let bounds;
        
        function rotateToMouse(e) {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const leftX = mouseX - bounds.x;
            const topY = mouseY - bounds.y;
            const center = {
                x: leftX - bounds.width / 2,
                y: topY - bounds.height / 2
            }
            const distance = Math.sqrt(center.x**2 + center.y**2);
            
            card.style.transform = `
                scale3d(1.07, 1.07, 1.07)
                rotate3d(
                    ${center.y / 100},
                    ${-center.x / 100},
                    0,
                    ${Math.log(distance)* 2}deg
                )
                translateZ(10px)
            `;
            
            card.style.transition = 'none';
        }
        
        card.addEventListener('mouseenter', () => {
            bounds = card.getBoundingClientRect();
            document.addEventListener('mousemove', rotateToMouse);
        });
        
        card.addEventListener('mouseleave', () => {
            document.removeEventListener('mousemove', rotateToMouse);
            card.style.transform = 'rotate3d(0,0,0,0deg) scale3d(1,1,1)';
            card.style.transition = 'transform 0.3s ease';
        });
    });

    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('opacity-0', 'invisible');
            backToTopButton.classList.add('opacity-100', 'visible');
        } else {
            backToTopButton.classList.remove('opacity-100', 'visible');
            backToTopButton.classList.add('opacity-0', 'invisible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Reveal sections on scroll
    function reveal() {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', reveal);
    reveal(); // Initial check on page load

    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', { name, email, subject, message });
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}); 