export default function decorate(block) {
  block.classList.add('input-cta');

  const rows = [...block.children];
  if (rows.length === 0) return;

  // Flatten rows to extract individual field data safely
  const fields = rows.map((row) => row.firstElementChild || row);
  const extractText = (el) => el?.querySelector('p, div, a')?.textContent?.trim() || el?.textContent?.trim() || '';

  const prefixText = extractText(fields[0]) || 'Ask TCS';
  const placeholderText = extractText(fields[1]) || 'About Banking Modernisation';

  // Crisp Microphone Icon SVG
  const micSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
      <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
    </svg>
  `;

  // Clear raw authoring DOM rows and build the Pill UI
  block.innerHTML = `
    <div class="input-cta-container">
      ${prefixText ? `<span class="input-prefix">${prefixText}</span>` : ''}
      <input
        type="text"
        class="input-field"
        placeholder="${placeholderText}"
        aria-label="${prefixText} ${placeholderText}"
      />
      <div class="input-actions">
        <button type="button" class="btn-mic" aria-label="Voice input">
          ${micSvg}
        </button>
      </div>
    </div>
  `;

  const inputField = block.querySelector('.input-field');
  const micBtn = block.querySelector('.btn-mic');

  const handleSubmit = () => {
    const rawQuery = inputField.value.trim() || inputField.placeholder;

    if (!rawQuery) return;

    const query = `${prefixText} ${rawQuery}`.trim();

    block.dispatchEvent(new CustomEvent('input-cta-submit', {
      bubbles: true,
      detail: { query },
    }));
    inputField.value = '';
  };

  micBtn?.addEventListener('click', () => {
    block.dispatchEvent(new CustomEvent('input-cta-mic-click', {
      bubbles: true,
    }));
  });

  inputField?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  });
}
