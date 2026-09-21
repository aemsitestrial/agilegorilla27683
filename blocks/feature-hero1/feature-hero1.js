export default function decorate(block) {
  block.classList.add('feature-hero1');

  const rows = [...block.children];
  if (rows.length === 0) return;

  const fields = rows.map((row) => row.firstElementChild || row);

  const extractText = (el) => el?.querySelector('p, div, a')?.textContent?.trim() || el?.textContent?.trim() || '';
  const extractHref = (el) => el?.querySelector('a')?.getAttribute('href') || extractText(el) || '#';

  const extractImgTag = (container) => {
    if (!container) return '';
    const imgOrPicture = container.querySelector('picture, img');
    if (imgOrPicture) return imgOrPicture.outerHTML;
    const url = extractText(container);
    if (url && (url.startsWith('http') || url.startsWith('/') || url.startsWith('.'))) {
      return `<img src="${url}" alt="" />`;
    }
    return '';
  };

  // Map input fields matching exact authoring schema
  const categoryTitle = extractText(fields[0]);
  const categoryIcon = extractImgTag(fields[1]);
  const heroHeading = extractText(fields[2]);
  const heroDescription = extractText(fields[3]);
  const ctaText = extractText(fields[4]);
  const ctaHref = extractHref(fields[5]);
  const secondaryText = extractText(fields[6]);
  const secondaryHref = extractHref(fields[7]);
  const heroImage = extractImgTag(fields[8]);
  const searchPlaceholder = extractText(fields[9]) || 'Ask about AI Transformation';

  // Crisp Vector SVGs for Search Actions
  const micSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
      <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
    </svg>
  `;

  const arrowUpSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="19" x2="12" y2="5"></line>
      <polyline points="5 12 12 5 19 12"></polyline>
    </svg>
  `;

  // Construct transformed layout
  block.innerHTML = `
    <div class="hero-container">
      <div class="hero-content">
        <div class="column-left">
          <div class="category-wrapper">
            ${categoryTitle ? `<span class="category-title">${categoryTitle}</span>` : ''}
            ${categoryIcon ? `<div class="category-icon">${categoryIcon}</div>` : ''}
          </div>
          ${heroHeading ? `<h2 class="hero-heading">${heroHeading}</h2>` : ''}
        </div>
        <div class="column-right">
          ${heroDescription ? `<p class="hero-description">${heroDescription}</p>` : ''}
          <div class="cta-wrapper">
            ${ctaText ? `<a href="${ctaHref}" class="hero-cta"><span>${ctaText}</span><span class="cta-arrow">&rarr;</span></a>` : ''}
            ${secondaryText ? `<a href="${secondaryHref}" class="hero-secondary-link"><span>${secondaryText}</span><span class="cta-arrow">&rarr;</span></a>` : ''}
          </div>
        </div>
      </div>
      ${heroImage ? `<div class="hero-image">${heroImage}</div>` : ''}
    </div>

    <div class="hero-search-pill">
      <input
        type="text"
        class="search-input"
        placeholder="${searchPlaceholder}"
        aria-label="Search prompt input"
      />
      <div class="search-actions">
        <button type="button" class="btn-mic" aria-label="Voice input">
          ${micSvg}
        </button>
        <button type="submit" class="btn-submit-circle" aria-label="Submit search">
          ${arrowUpSvg}
        </button>
      </div>
    </div>
  `;

  // Search action handlers
  const inputField = block.querySelector('.search-input');
  const submitBtn = block.querySelector('.btn-submit-circle');
  const micBtn = block.querySelector('.btn-mic');

  const handleSearchSubmit = () => {
    const query = inputField.value.trim() || inputField.placeholder;
    if (!query) return;

    block.dispatchEvent(new CustomEvent('hero1-search-submit', {
      bubbles: true,
      detail: { query },
    }));
    inputField.value = '';
  };

  submitBtn?.addEventListener('click', handleSearchSubmit);
  micBtn?.addEventListener('click', () => {
    block.dispatchEvent(new CustomEvent('hero1-mic-click', { bubbles: true }));
  });

  inputField?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') handleSearchSubmit();
  });
}
