
document.querySelector('.read-more-container').addEventListener('click', event => {
    const target = event.target;

    if (!target.classList.contains('read-more-btn')) return;

    const container = target.closest('.read-more-container');
    const text = container.querySelector('.read-more-text');

    text.classList.toggle('read-more-text--show');

    target.textContent = target.textContent === 'Read more' ? 'Read less' : 'Read more';
});
