const h = document.querySelectorAll('.hotline');

h.forEach(b => {
b.addEventListener('click', () => {
const n = b.getAttribute('data-number');
if (confirm(`Call ${n}?`)) {
window.location.href = `tel:${n}`;
}
});
});

gsap.from('.hotline', {
opacity: 0,
y: 50,
duration: 1,
stagger: 0.2,
ease: 'power3.out',
scrollTrigger: {
trigger: '.hotlines-container',
start: 'top 80%',
}
});
