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

// Scroll animations
const animateElements = document.querySelectorAll('.animate-fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

animateElements.forEach(element => {
    observer.observe(element);
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