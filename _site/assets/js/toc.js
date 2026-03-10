// Auto-generate Table of Contents from post headings
(function() {
  const toc = document.getElementById('toc');
  if (!toc) return;

  const content = document.querySelector('.post-content');
  if (!content) return;

  const headings = content.querySelectorAll('h2, h3');
  if (headings.length < 2) {
    const container = document.querySelector('.toc-container');
    if (container) container.style.display = 'none';
    return;
  }

  const fragment = document.createDocumentFragment();

  headings.forEach((heading, i) => {
    // Ensure each heading has an id
    if (!heading.id) {
      heading.id = heading.textContent
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
    }

    const a = document.createElement('a');
    a.href = `#${heading.id}`;
    a.textContent = heading.textContent;
    a.className = heading.tagName === 'H3' ? 'toc-h3' : '';

    a.addEventListener('click', (e) => {
      e.preventDefault();
      heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    fragment.appendChild(a);
  });

  toc.appendChild(fragment);
})();
