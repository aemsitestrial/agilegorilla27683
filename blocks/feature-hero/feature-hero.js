export default function decorate(block) {
  block.classList.add('feature-hero');

  const rows = [...block.children];
  if (rows.length === 0) return;

  // Extract authoring fields from row DOM structure
  const fields = rows.map((row) => row.firstElementChild || row);

  const extractText = (el) => el?.querySelector('p, div, a')?.textContent?.trim() || el?.textContent?.trim() || '';
  const extractHref = (el) => el?.querySelector('a')?.getAttribute('href') || extractText(el) || '#';

  const renderImg = (container, alt) => {
    if (!container) return '';
    const imgOrPicture = container.querySelector('picture, img');
    if (imgOrPicture) return imgOrPicture.outerHTML;
    const url = extractText(container);
    if (!url) return '';
    return `<img src="${url}" alt="${alt}" />`;
  };

  // Map input fields matching JSON Schema (8 fields total)
  const categoryTitle = extractText(fields[0]);
  const categoryIcon = renderImg(fields[1], 'Category Icon');
  const heroHeading = extractText(fields[2]);
  const heroDescription = extractText(fields[3]);
  const ctaText = extractText(fields[4]);
  const ctaHref = extractHref(fields[5]);
  const secondaryText = extractText(fields[6]);
  const secondaryHref = extractHref(fields[7]);
  const heroImage = renderImg(fields[8], 'Hero Illustration');

  // Re-render transformed semantic block DOM
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
            ${ctaText ? `<a href="${ctaHref}" class="hero-cta">${ctaText} &rarr;</a>` : ''}
            ${secondaryText ? `<a href="${secondaryHref}" class="hero-secondary-link">${secondaryText} &rarr;</a>` : ''}
          </div>
        </div>
      </div>
      ${heroImage ? `<div class="hero-image">${heroImage}</div>` : ''}
    </div>
  `;
}
