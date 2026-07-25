async function loadPartial(url, placeholderId) {
    const el = document.getElementById(placeholderId);
    if (!el) return;
    try {
        const res = await fetch(url);
        el.innerHTML = await res.text();
    } catch (err) {
        console.error(`Could not load ${url} — run this via a local server (not file://)`, err);
    }
}

function setActiveNavLink() {
    const current = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === current);
    });
}

document.addEventListener("DOMContentLoaded", async function() {

    await Promise.all([
        loadPartial('header.html', 'header-placeholder'),
        loadPartial('footer.html', 'footer-placeholder')
    ]);
    setActiveNavLink();

    // ============================================
    // 1. CAROUSEL / SLIDER FUNCTIONALITY
    // ============================================
    function setupCarousel(trackId, nextId, prevId) {
        const track = document.getElementById(trackId);
        const nextBtn = document.getElementById(nextId);
        const prevBtn = document.getElementById(prevId);
        
        if (!track || !nextBtn || !prevBtn) return;

        let scrollAmount = 0;
        const getCardWidth = () => track.firstElementChild.getBoundingClientRect().width + 25; 

        nextBtn.addEventListener("click", () => {
            const maxScroll = track.scrollWidth - track.parentElement.clientWidth;
            if (scrollAmount < maxScroll) {
                scrollAmount += getCardWidth();
                if (scrollAmount > maxScroll) scrollAmount = maxScroll;
                track.style.transform = `translateX(-${scrollAmount}px)`;
            } else {
                scrollAmount = 0;
                track.style.transform = `translateX(0px)`;
            }
        });

        prevBtn.addEventListener("click", () => {
            if (scrollAmount > 0) {
                scrollAmount -= getCardWidth();
                if (scrollAmount < 0) scrollAmount = 0;
                track.style.transform = `translateX(-${scrollAmount}px)`;
            } else {
                const maxScroll = track.scrollWidth - track.parentElement.clientWidth;
                scrollAmount = maxScroll;
                track.style.transform = `translateX(-${scrollAmount}px)`;
            }
        });

        window.addEventListener('resize', () => {
            scrollAmount = 0;
            track.style.transform = `translateX(0px)`;
        });
    }

    setupCarousel("works-track", "works-next", "works-prev");
    setupCarousel("review-track", "review-next", "review-prev");

    // ============================================
    // 2. CUSTOM CURSOR + SMOOTH INK CANVAS EFFECT
    // ============================================
    const pointer = document.getElementById("inkPointer");
    const canvas = document.getElementById("inkCanvas");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let points = [];
    let lastX = 0;
    let lastY = 0;
    let lastTime = Date.now();
    let currentWidth = 3;
    let targetWidth = 3;

    // Throttle mousemove for better performance
    let isMoving = false;
    let moveTimeout;

    document.addEventListener("mousemove", (e) => {
        const currentX = e.clientX;
        const currentY = e.clientY;
        const currentTime = Date.now();

        pointer.style.left = `${currentX}px`;
        pointer.style.top = `${currentY}px`;

        let timeDiff = currentTime - lastTime;
        if (timeDiff > 0) {
            let distance = Math.sqrt(Math.pow(currentX - lastX, 2) + Math.pow(currentY - lastY, 2));
            let speed = distance / timeDiff;
            targetWidth = Math.min(Math.max(speed * 4, 2), 14);
        }

        // Smooth interpolation
        currentWidth += (targetWidth - currentWidth) * 0.12;

        if (points.length === 0 || Math.abs(currentX - lastX) > 1.5 || Math.abs(currentY - lastY) > 1.5) {
            points.push({
                x: currentX,
                y: currentY,
                width: currentWidth,
                alpha: 1.0
            });
        }

        lastX = currentX;
        lastY = currentY;
        lastTime = currentTime;

        // Throttle rendering
        if (!isMoving) {
            isMoving = true;
            requestAnimationFrame(() => {
                isMoving = false;
            });
        }
    });

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (points.length > 2) {
            // Use a more efficient drawing approach
            const drawPoints = points.slice(0, 300); // Limit points for performance
            
            for (let i = 1; i < drawPoints.length - 1; i++) {
                const xc = (drawPoints[i].x + drawPoints[i + 1].x) / 2;
                const yc = (drawPoints[i].y + drawPoints[i + 1].y) / 2;

                ctx.beginPath();
                ctx.moveTo(drawPoints[i - 1].x, drawPoints[i - 1].y);
                ctx.quadraticCurveTo(drawPoints[i].x, drawPoints[i].y, xc, yc);

                // Smoother fading with better color
                const alpha = drawPoints[i].alpha * 0.6;
                ctx.strokeStyle = `rgba(212, 150, 60, ${alpha})`;
                ctx.lineWidth = drawPoints[i].width;
                ctx.lineCap = "round";
                ctx.lineJoin = "round";
                ctx.shadowBlur = 6;
                ctx.shadowColor = `rgba(212, 150, 60, ${alpha * 0.5})`;
                ctx.stroke();

                // Fade out points more gradually
                drawPoints[i - 1].alpha -= 0.015;
            }

            // Keep points with alpha > 0.05
            points = points.filter(p => p.alpha > 0.05);
            
            // Limit points to prevent memory issues
            if (points.length > 500) {
                points = points.slice(-300);
            }
        }

        requestAnimationFrame(render);
    }
    
    render();

    // Hover effect for interactive elements
    const UIInteractive = document.querySelectorAll("a, button, .btn-solid, .btn-outline, .carousel-btn, .filter-btn");
    UIInteractive.forEach(item => {
        item.addEventListener("mouseenter", () => pointer.classList.add("hover"));
        item.addEventListener("mouseleave", () => pointer.classList.remove("hover"));
    });

    // ============================================
    // 3. ACCORDION / FAQ FUNCTIONALITY
    // ============================================
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach((item) => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        const icon = header.querySelector('.icon');

        if (!item.classList.contains('active')) {
            content.style.maxHeight = '0';
        } else {
            content.style.maxHeight = content.scrollHeight + 'px';
            if (icon) icon.textContent = '−';
        }

        header.addEventListener('click', function() {
            const isActive = item.classList.contains('active');

            accordionItems.forEach((otherItem) => {
                const otherContent = otherItem.querySelector('.accordion-content');
                const otherIcon = otherItem.querySelector('.accordion-header .icon');
                otherItem.classList.remove('active');
                otherContent.style.maxHeight = '0';
                if (otherIcon) otherIcon.textContent = '+';
            });

            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
                if (icon) icon.textContent = '−';
            }
        });
    });

    // ============================================
    // 4. PORTFOLIO FILTER BUTTONS (Portfolio Page)
    // ============================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-card');

    if (filterBtns.length > 0 && portfolioItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => {
                    b.style.background = 'transparent';
                    b.style.color = '#888';
                    b.style.border = '1px solid #333';
                });
                this.style.background = '#d4963c';
                this.style.color = '#000';
                this.style.border = 'none';

                const filter = this.textContent.trim().toLowerCase();

                portfolioItems.forEach(item => {
                    const category = (item.getAttribute('data-category') || '').toLowerCase();
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
});