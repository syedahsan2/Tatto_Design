document.addEventListener("DOMContentLoaded", function() {
    
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
    // 2. CUSTOM CURSOR + INK CANVAS EFFECT
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
            let targetWidth = Math.min(Math.max(speed * 5, 3), 16);
            currentWidth += (targetWidth - currentWidth) * 0.15;
        }

        if (points.length === 0 || Math.abs(currentX - lastX) > 2 || Math.abs(currentY - lastY) > 2) {
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
    });

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (points.length > 2) {
            for (let i = 1; i < points.length - 1; i++) {
                const xc = (points[i].x + points[i + 1].x) / 2;
                const yc = (points[i].y + points[i + 1].y) / 2;

                ctx.beginPath();
                ctx.moveTo(points[i - 1].x, points[i - 1].y);
                ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);

                ctx.strokeStyle = `rgba(212, 150, 60, ${points[i].alpha})`;
                ctx.lineWidth = points[i].width;
                ctx.lineCap = "butt";
                ctx.lineJoin = "miter";
                ctx.shadowBlur = 4;
                ctx.shadowColor = "#d4963c";
                ctx.stroke();

                points[i - 1].alpha -= 0.03;
            }

            points = points.filter(p => p.alpha > 0);
        }

        requestAnimationFrame(render);
    }
    
    requestAnimationFrame(render);

    // Hover effect for interactive elements
    const UIInteractive = document.querySelectorAll("a, button, .btn-solid, .btn-outline, .carousel-btn");
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

        // Initially close all except the active one
        if (!item.classList.contains('active')) {
            content.style.maxHeight = '0';
        } else {
            content.style.maxHeight = content.scrollHeight + 'px';
            if (icon) icon.textContent = '−';
        }

        header.addEventListener('click', function() {
            const isActive = item.classList.contains('active');

            // Close all accordion items
            accordionItems.forEach((otherItem) => {
                const otherContent = otherItem.querySelector('.accordion-content');
                const otherIcon = otherItem.querySelector('.accordion-header .icon');
                otherItem.classList.remove('active');
                otherContent.style.maxHeight = '0';
                if (otherIcon) otherIcon.textContent = '+';
            });

            // If this item was not active, open it
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
                // Remove active class from all filter buttons
                filterBtns.forEach(b => {
                    b.style.background = 'transparent';
                    b.style.color = '#888';
                    b.style.border = '1px solid #333';
                });
                // Add active class to clicked button
                this.style.background = '#d4963c';
                this.style.color = '#000';
                this.style.border = 'none';

                const filter = this.textContent.trim().toLowerCase();

                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
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