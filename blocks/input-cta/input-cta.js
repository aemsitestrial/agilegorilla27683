export default function decorate(block) {
  block.classList.add('input-cta');

  const rows = [...block.children];

  // Extract initial placeholder text or action endpoint if authored
  const fields = rows.map((row) => row.firstElementChild || row);
  const extractText = (el) => el?.querySelector('p, div, a')?.textContent?.trim() || el?.textContent?.trim() || '';

  const placeholderText = extractText(fields[0]) || 'How can we adopt Agentic AI in our retail banking operations without increasing regulatory risk?';

  // SVG Icons
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

  // Render Component Structure
  block.innerHTML = `
    <div class="input-cta-container">
      <input
        type="text"
        class="input-field"
        placeholder="${placeholderText}"
        aria-label="Ask a question"
      />
      <div class="input-actions">
        <button type="button" class="btn-mic" aria-label="Voice input">
          ${micSvg}
        </button>
        <button type="submit" class="btn-submit" aria-label="Submit question">
          ${arrowUpSvg}
        </button>
      </div>
    </div>
  `;

  // Attach submit handle
  const submitBtn = block.querySelector('.btn-submit');
  const inputField = block.querySelector('.input-field');

  const handleSubmit = () => {
    const query = inputField.value.trim() || inputField.placeholder;

    if (!query) {
      return;
    }

    block.dispatchEvent(new CustomEvent('input-cta-submit', {
      bubbles: true,
      detail: { query },
    }));
    inputField.value = '';
  };

  submitBtn?.addEventListener('click', handleSubmit);
  inputField?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  });
}
