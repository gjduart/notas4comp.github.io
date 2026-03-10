// Mobile nav toggle
const toggle = document.getElementById('nav-toggle');
const nav = document.getElementById('site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

// Highlight active TOC link on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const link = document.querySelector(`.toc a[href="#${id}"]`);
    if (link) {
      if (entry.isIntersecting) {
        document.querySelectorAll('.toc a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}, { rootMargin: '-20% 0px -70% 0px' });

document.querySelectorAll('.post-content h2, .post-content h3').forEach(h => {
  if (h.id) observer.observe(h);
});
