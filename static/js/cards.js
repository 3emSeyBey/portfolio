// Enhanced 3D movement for cards
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