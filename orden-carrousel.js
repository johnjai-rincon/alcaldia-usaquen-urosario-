const scrollContainer = document.getElementById('scrollContainer');
const dots = document.querySelectorAll('.dot');

// Actualizar dots según el scroll manual
scrollContainer.addEventListener('scroll', () => {
    const scrollLeft = scrollContainer.scrollLeft;
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    if (maxScroll <= 0) return;

    const index = Math.round((scrollLeft / maxScroll) * (dots.length - 1));

    dots.forEach((dot, i) => {
        if (i === index) dot.classList.add('active');
        else dot.classList.remove('active');
    });
});

// Desplazamiento al hacer clic en los dots
dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
        const i = parseInt(e.target.getAttribute('data-index'));
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        const scrollTarget = (i / (dots.length - 1)) * maxScroll;
        scrollContainer.scrollTo({
            left: scrollTarget,
            behavior: 'smooth'
        });
    });
});