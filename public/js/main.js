// Meta tag
function throttle(func, timeFrame) {
    var lastTime = 0;
    return function (...args) {
        var now = new Date().getTime();
        if (now - lastTime >= timeFrame) {
            func(...args);
            lastTime = now;
        }
    };
}

const ogColor = document.querySelector('meta[name="theme-color"]')?.getAttribute('content');

const handleScroll = throttle(() => {
    const targets = document.querySelectorAll('[data-scroll-theme]')
    const isTop = Array.from(targets).map((target) => {
        const rect = target.getBoundingClientRect();
        if (rect.y > 1) {
            return null;
        }
        return {
            target,
            rect
        }
    }).filter(Boolean).sort((a, b) => b.rect.y - a.rect.y)[0]
    if (isTop) {

        const color = window.getComputedStyle(isTop.target).getPropertyValue('background-color')
        
        if (color) {
            document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color);
        }
    } else if (ogColor) {
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', ogColor);
    }
}, 100)

document.addEventListener('scroll', handleScroll, {
    passive: true
})

// Scroll animation
document.body.classList.remove('no-js');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

// Read more button
const hiddenElements = document.querySelectorAll(".hidden")
hiddenElements.forEach((el) => observer.observe(el))

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.read-more-btn.hide');
    buttons.forEach(button => button.classList.remove('hide'));

    document.querySelector('.read-more-container').addEventListener('click', event => {
        const target = event.target;

        if (!target.classList.contains('read-more-btn')) return;

        const container = target.closest('.read-more-container');
        const text = container.querySelector('.read-more-text');

        text.classList.toggle('read-more-text--show');

        target.textContent = target.textContent === 'Read more' ? 'Read less' : 'Read more';
    });
});