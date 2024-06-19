const ogColor = document.querySelector('meta[name="theme-color"]')?.getAttribute('content');

const observer2 = new IntersectionObserver(entries => {
    const topmostEntry = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
    
    const color = topmostEntry 
        ? window.getComputedStyle(topmostEntry.target).getPropertyValue('background-color') 
        : ogColor;
    
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color);
});

document.querySelectorAll('[data-scroll-theme]').forEach(target => observer2.observe(target));


// Introduction read more button
document.querySelector('.read-more-container').addEventListener('click', event => {
    const target = event.target;

    if (!target.classList.contains('read-more-btn')) return;

    const container = target.closest('.read-more-container');
    const text = container.querySelector('.read-more-text');

    text.classList.toggle('read-more-text--show');

    target.textContent = target.textContent === 'Read more' ? 'Read less' : 'Read more';
});


// Scroll animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } 
    });
});

const hiddenElements = document.querySelectorAll(".hidden")
hiddenElements.forEach((el) => observer.observe(el))









