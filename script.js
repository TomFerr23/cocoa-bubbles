document.addEventListener('DOMContentLoaded', () => {
    const bubbles = document.querySelectorAll('.bubble');

    bubbles.forEach(bubble => {
        bubble.style.top = `${Math.random() * (window.innerHeight - bubble.offsetHeight)}px`;
        bubble.style.left = `${Math.random() * (window.innerWidth - bubble.offsetWidth)}px`;
        bubble.velocity = { x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2 };
    });

    function detectCollisions() {
        for (let i = 0; i < bubbles.length; i++) {
            for (let j = i + 1; j < bubbles.length; j++) {
                let bubbleA = bubbles[i];
                let bubbleB = bubbles[j];

                let rectA = bubbleA.getBoundingClientRect();
                let rectB = bubbleB.getBoundingClientRect();

                let dx = (rectA.left + rectA.width / 2) - (rectB.left + rectB.width / 2);
                let dy = (rectA.top + rectA.height / 2) - (rectB.top + rectB.height / 2);
                let distance = Math.sqrt(dx * dx + dy * dy);
                let minDistance = rectA.width / 2 + rectB.width / 2;

                if (distance < minDistance) {
                    // Calculate overlap
                    let overlap = minDistance - distance;
                    
                    // Adjust positions to prevent sticking
                    let angle = Math.atan2(dy, dx);
                    let moveX = overlap * Math.cos(angle) / 2;
                    let moveY = overlap * Math.sin(angle) / 2;

                    bubbleA.style.left = `${parseFloat(bubbleA.style.left) + moveX}px`;
                    bubbleA.style.top = `${parseFloat(bubbleA.style.top) + moveY}px`;
                    bubbleB.style.left = `${parseFloat(bubbleB.style.left) - moveX}px`;
                    bubbleB.style.top = `${parseFloat(bubbleB.style.top) - moveY}px`;

                    // Swap velocities
                    let tempVelocity = { x: bubbleA.velocity.x, y: bubbleA.velocity.y };
                    bubbleA.velocity.x = bubbleB.velocity.x;
                    bubbleA.velocity.y = bubbleB.velocity.y;
                    bubbleB.velocity.x = tempVelocity.x;
                    bubbleB.velocity.y = tempVelocity.y;
                }
            }
        }
    }

    function animate() {
        bubbles.forEach(bubble => {
            let rect = bubble.getBoundingClientRect();
            let nextX = rect.left + bubble.velocity.x;
            let nextY = rect.top + bubble.velocity.y;

            if (nextX <= 0 || nextX >= window.innerWidth - bubble.offsetWidth) {
                bubble.velocity.x *= -1;
            }
            if (nextY <= 0 || nextY >= window.innerHeight - bubble.offsetHeight) {
                bubble.velocity.y *= -1;
            }

            bubble.style.left = `${rect.left + bubble.velocity.x}px`;
            bubble.style.top = `${rect.top + bubble.velocity.y}px`;
        });

        detectCollisions();
        requestAnimationFrame(animate);
    }

    animate();
});
